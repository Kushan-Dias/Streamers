<template>
  <CModal
    scrollable
    backdrop="static"
    :visible="showEventViewModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.viewEvent') }}</CCardTitle>
    </CModalHeader>
    <Loading v-model:active="isLoading"/>
    <CRow>
      <CCol>
        <div class="event-banner">
          <div class="calendar-thumb">
            <div class="date">
              <div class="day-month">{{ moment(eventInfo.event.start).format('DD') }}</div>
              <div class="day-week">{{ moment(eventInfo.event.start).format('ddd').toUpperCase() }}</div>
            </div>
            <div class="month">
              {{ moment(eventInfo.event.start).format('MMM').toUpperCase() }}
            </div>
          </div>
          <img :src="event.image_url" class="img-fluid" alt="banner">
        </div>
      </CCol>
    </CRow>
    <CRow class="event-main">
      <CCol>
        <h5 class="title">{{ event.name }}</h5>
        <CRow class="location-info">
          <CCol :md="6">
            <CIcon icon="cil-location-pin"/>
            <small class="location-name ms-1">
              <a :href="event.location_url" target="_blank">{{ event.location_name }}</a>
            </small>
          </CCol>
          <CCol>
            <!-- <span class="count">10</span> -->
            <CIcon icon="cil-heart" class="icon mx-1"/>
            <span class="stat">Interested</span>
          </CCol>
          <CCol>
            <!-- <span class="count">3</span> -->
            <CIcon icon="cil-comment-bubble" class="icon mx-1"/>
            <span class="stat">Comments</span>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
    <CModalBody>
      <CRow>
        <CCol>
          <div class="event-date">
            <span>{{ moment(eventInfo.event.start).format('LL') }}</span>
          </div>
          <div class="event-time">
            {{ moment(eventInfo.event.start).format('LT') }} - {{ moment(eventInfo.event.end).format('LT') }}
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <p class="description">
            {{ event.description }}
          </p>
        </CCol>
      </CRow>
      <CRow>
        <CCol v-if="recurringData">
          <CAccordion>
            <CAccordionItem :item-key="1">
              <CAccordionHeader>
                <h6 class="mb-0">{{ $tc('labels.otherRepeatingDates') }} ({{ recurringData.length }})</h6>
              </CAccordionHeader>
              <CAccordionBody>
                <div v-for="recurringEvent in recurringData">
                  <div :class="hasExclusion(recurringEvent.start) ? 'card mb-2 bg-light' : 'card mb-2' ">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <h5>{{ moment(recurringEvent.start).format('LL') }}</h5>
                        <div class="actions view-event" v-if="canEditEvent">
                          <small v-if="hasExclusion(recurringEvent.start)" class="exclusion-label">
                            {{ $t('labels.dateExcluded') }}
                          </small>
                          <CButtonGroup role="group">
                            <CTooltip v-if="hasExclusion(recurringEvent.start)"
                                      :content="$t('actions.removeExclusion')" placement="top">
                              <template #toggler="{ on }">
                                <button v-on="on"
                                        class="btn btn-secondary text-white delete-event"
                                        @click="handleRemoveExclusion(recurringEvent.start)">
                                  <i class="cil-action-undo delete-event"></i>
                                </button>
                              </template>
                            </CTooltip>
                            <CTooltip v-else-if="eventInfo.event.extendedProps.isRepeating"
                                      :content="$t('actions.addExclusion')" placement="top">
                              <template #toggler="{ on }">
                                <button v-on="on"
                                        class="btn btn-danger text-white delete-event"
                                        @click="addEventExclusion(recurringEvent.start)">
                                  <i class="cil-delete delete-event"></i>
                                </button>
                              </template>
                            </CTooltip>
                            <CTooltip v-else-if="eventInfo.event.extendedProps.isCustom"
                                      :content="$t('actions.addExclusion')" placement="top">
                              <template #toggler="{ on }">
                                <button v-on="on"
                                        class="btn btn-danger text-white delete-event"
                                        @click="deleteCustomDate(recurringEvent.start)">
                                  <i class="cil-delete delete-event"></i>
                                </button>
                              </template>
                            </CTooltip>
                          </CButtonGroup>
                        </div>
                      </div>
                      <div class="event-time">
                        {{ moment(recurringEvent.start).format('LT') }} - {{ moment(recurringEvent.end).format('LT') }}
                      </div>
                    </div>
                  </div>
                </div>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton class="float-right" color="light" @click="closeModal">
        {{ $t('actions.close') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import Loading from "vue-loading-overlay";
import { EMITTERS } from "../../utils/constants";
import { REQUEST_METHOD } from "../../utils/enums";
import { PERMISSIONS } from "../../utils/app.permissions";

export default {
  name: "ViewEvent",
  components: {
    Loading,
  },
  props: {
    showEventViewModal: {
      type: Boolean,
      required: true,
      default: true
    },
    eventInfo: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup() {
    return {
      moment: moment,
    };
  },
  computed: {
    canEditEvent() {
      return this.hasValidAccess(PERMISSIONS.EDIT_EVENT);
    },
    eventOccurrence() {
      return _.capitalize(this.eventInfo.event.extendedProps.occurrence);
    },
  },
  data() {
    return {
      isLoading: false,
      eventId: null,
      event: {},
      recurringData: null,
      eventExclusions: null,
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error',
      },
      removeEventExclusionSuccessToast: {
        message: this.$tc('messages.eventExclusionRemoved'),
        type: 'success',
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert'],
  created() {
    this.emitter.on(EMITTERS.GET_DATA, () => {
      this.getEvent();
    });
  },
  methods: {
    async getEvent() {
      await this.fetcher(`/api/events/${this.eventId}`, REQUEST_METHOD.GET)
        .then((response) => {
          if (response.data.success) {
            this.event = response.data.data.event;
            if (response.data.data.recurring_data !== null) {
              this.recurringData = response.data.data.recurring_data
                .filter(r => moment(r.start).format('YYYY-MM-DDTHH:mm:ssZZ') !== moment(this.eventInfo.event.start).format('YYYY-MM-DDTHH:mm:ssZZ'));
            } else {
              this.recurringData = null;
            }

            if (response.data.data.event.event_exclusions !== null) {
              this.eventExclusions = response.data.data.event.event_exclusions;
            } else {
              this.eventExclusions = null;
            }

            this.isLoading = false;
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    hasExclusion(repeatingDate) {
      let exMap = this.eventExclusions.map(ex => ex.date);
      return exMap.includes(moment(repeatingDate).format('YYYY-MM-DD'));
    },
    addEventExclusion(repeatingDate) {
      let data = {
        eventId: this.eventInfo.event.extendedProps.eventId,
        date: moment(repeatingDate).format('YYYY-MM-DD')
      };
      this.emitter.emit(EMITTERS.ADD_EVENT_EXCLUSION, data);
    },
    handleRemoveExclusion(repeatingDate) {
      const vm = this;

      if (!this.canEditEvent) {
        this.showToast(this.noPermissionsToast);
        return;
      }

      let ex = this.eventExclusions.find(ex => moment(repeatingDate).format('YYYY-MM-DD') === moment(ex.date).format('YYYY-MM-DD'));

      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$tc('messages.removeEventExclusion'),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yesAdd'),
        cancelButtonText: vm.$t('actions.no')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await vm.removeExclusion(ex.id).then(() => {
            vm.getEvent();
          });
        }
      });
    },
    async removeExclusion(exclusionId) {
      await this.fetcher(`/api/events/exclusions/${exclusionId}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          if (response.data.success) {
            this.showToast(this.removeEventExclusionSuccessToast);
            this.emitter.emit(EMITTERS.GET_DATA);
            this.isLoading = false;
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    deleteCustomDate(repeatingDate) {
      console.log(repeatingDate);
    },
    closeModal() {
      this.emitter.emit(EMITTERS.CLOSE_MODAL);
    },
  },
  watch: {
    eventInfo(info) {
      this.eventId = info.event.extendedProps.eventId;
      this.getEvent();
    }
  }
};
</script>

<style scoped lang="scss">
.event-banner {
  position: relative;
  min-height: 300px;

  .calendar-thumb {
    position: absolute;
    top: 20px;
    right: 20px;
    line-height: 1;
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 5px 0px var(--cui-gray-dark);
    transition: all 0.3s ease;

    .day-month {
      width: 100%;
      padding: 0.1rem 0.5rem;
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: -1px;
      text-align: center;
    }

    .day-week {
      width: 100%;
      padding: 0 0.2rem 0.25rem 0.2rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-align: center;
    }

    .month {
      width: 100%;
      padding: 0.2rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-align: center;
      color: #FFF;
      background-color: red;
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
}

.event-main {
  padding: 1rem;
  background-color: #FFF;
  border-bottom: 1px solid var(--cui-gray-100);

  .title {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .location-info {
    .location-name a {
      color: #000;
      text-decoration: none;
    }

    .icon {
      font-size: 2rem;
    }
  }
}

.event-date {
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.event-time {
  font-weight: 600;
}

.description {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.exclusion-label {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  color: #FFF;
  text-transform: capitalize;
  background-color: var(--cui-danger);
  border-radius: 0.25rem;
}

.actions {
  display: flex;
  justify-content: flex-end;

  button {
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    text-decoration: none;

    i {
      font-size: 0.8rem;
      font-weight: 900;
    }
  }
}

</style>
