<template>
  <ViewMaintenanceEvent v-if="canViewEvent" :showMaintenanceEventViewModal="showMaintenanceEventViewModal" :eventInfo="eventInfo"/>
  <CRow>
    <CCol>
      <CCard>
        <CCardBody class="calendar-card-body">
          <Loading v-model:active="isLoading" :is-full-page="false"/>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $t('labels.maintenanceEventsCalendar') }}</h4>
            </CCol>
          </CRow>
          <CalendarWrapper
            :events="events"
            @onEventClick="onEventClick"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import CalendarWrapper from "../../../../../components/CalendarWrapper";
import ViewMaintenanceEvent from "./ViewMaintenanceEvent";

import { EMITTERS } from "../../../../../utils/constants";
import { REQUEST_METHOD } from "../../../../../utils/enums";
import { PERMISSIONS } from "../../../utils/app.permissions";

export default {
  name: "MaintenanceEvents",
  components: {
    Loading,
    CalendarWrapper,
    ViewMaintenanceEvent,
  },
  computed: {
    canViewEvent() {
      return this.hasValidAccess(PERMISSIONS.VIEW_MAINTENANCE_EVENT);
    },
    canListEvents() {
      return this.hasValidAccess(PERMISSIONS.LIST_MAINTENANCE_EVENTS);
    },
    canEditEvent() {
      return this.hasValidAccess(PERMISSIONS.EDIT_MAINTENANCE_EVENT);
    },
    canDeleteEvent() {
      return this.hasValidAccess(PERMISSIONS.DELETE_MAINTENANCE_EVENT);
    },
  },
  data() {
    return {
      isLoading: false,
      showMaintenanceEventViewModal: false,
      events: null,
      eventInfo: null,
      removeRepeatSuccessToast: {
        message: this.$t('messages.repeatingEventRemoved'),
        type: 'success',
      },
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error',
      },
      showCreateModal: false,
    };
  },
  created() {
    this.getCalendarEvents();

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.onClose();
    });

    this.emitter.on(EMITTERS.GET_DATA, () => {
      this.getCalendarEvents();
    });

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.showMaintenanceEventViewModal = false;
    });

    this.emitter.on(EMITTERS.ADD_EVENT_EXCLUSION, (data) => {
      this.handleAddExclusion(data, true);
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert', 'hasValidAccess'],
  methods: {
    openCreateModal() {
      if (this.canCreateEvent) {
        this.showCreateModal = !this.showCreateModal;
      } else {
        this.showToast(this.noPermissionsToast);
      }
    },
    onEventClick(info) {
      const element = info.jsEvent.target;

      if (element.classList.contains('view-event') || element.classList.contains('fc-event-main')) {
        if (this.canViewEvent) {
          this.eventInfo = info;
          this.showMaintenanceEventViewModal = true;
        } else {
          this.showToast(this.noPermissionsToast);
        }
      }

      if (element.classList.contains('edit-event')) {
        console.log('EDIT');
      }

      if (element.classList.contains('delete-event')) {
        if (info.event.extendedProps.isRepeating) {
          let data = { eventId: info.event.extendedProps.eventId, date: info.event.start };
          this.handleAddExclusion(data);
        }
      }
    },
    handleAddExclusion(data, getEvent = false) {
      const vm = this;
      if (this.canEditEvent) {
        this.showAlert({
          title: vm.$t('messages.areYouSure'),
          text: vm.$tc('messages.removeRepeatingEvent'),
          showCancelButton: true,
          confirmButtonText: vm.$t('actions.yesRemove'),
          cancelButtonText: vm.$t('actions.no')
        }).then(async (result) => {
          if (result.isConfirmed) {
            vm.eventExclusion = {
              event_id: data.eventId,
              date: moment(data.date).format('YYYY-MM-DD')
            };
            await vm.addEventExclusion(vm.eventExclusion).then(() => {
              if (getEvent) {
                vm.emitter.emit(EMITTERS.GET_DATA);
              }
            });
          }
        });
      } else {
        this.showToast(this.noPermissionsToast);
      }
    },
    async addEventExclusion(eventExclusion) {
      this.isLoading = true;
      await this.fetcher('/api/maintenances/events/exclusions', REQUEST_METHOD.POST, eventExclusion)
        .then((response) => {
          this.isLoading = false;
          if (response.data.success) {
            this.showToast(this.removeRepeatSuccessToast);
            this.emitter.emit(EMITTERS.GET_DATA);
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async getCalendarEvents() {
      if (!this.canListEvents) {
        this.showToast(this.noPermissionsToast);
        return;
      }

      this.isLoading = true;

      await this.fetcher(`/api/maintenances/events/calendar`, REQUEST_METHOD.GET)
        .then((response) => {
          this.isLoading = false;
          this.events = response.data.data.events;
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    onClose() {
      this.showCreateModal = false;
    },
  },
};
</script>

<style scoped>
.calendar-card-body {
  min-height: 400px;
}
</style>
