<template>
  <Loading v-model:active="isLoading" :is-full-page="false"/>
  <FullCalendar :options="calendarOptions"/>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import store from '../store';
import moment from "moment";
import _ from "lodash";
import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import Loading from "vue-loading-overlay";
import zhCN from '@fullcalendar/core/locales/zh-cn';

import CreateEvent from "../views/events/CreateEvent";

import { EMITTERS } from "../utils/constants";
import { REQUEST_METHOD } from "../utils/enums";

export default {
  name: "CalendarWrapper",
  components: {
    FullCalendar,
    CreateEvent,
    Loading,
  },
  props: {
    events: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const store = useStore();
    return {
      lang: computed(() => store.state.localization.lang)
    };
  },
  data() {
    return {
      isLoading: false,
      calendarOptions: {
        locales: [zhCN],
        locale: store.state.localization.lang,
        timeZone: 'local',
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        events: this.events,
        nowIndicator: true,
        selectable: true,
        handleWindowResize: true,
        weekends: true,
        eventContent: function (info) {
          let html = `<div class="fc-event-content view-event">
                        <div class="actions view-event">
                          <button class="btn btn-primary edit-event me-1">
                            <i class="cil-pencil edit-event"></i>
                          </button>
                          <button class="btn btn-danger delete-event text-white">
                            <i class="cil-delete delete-event"></i>
                          </button>`;

          html += `</div>
                <div class="title view-event">${info.event.title}</div>
                <div class="time view-event">
                  ${moment(info.event.start).format('LT')} - ${moment(info.event.end).format('LT')}
                </div>
                <small class="occurrence view-event">`;

          if (info.event.extendedProps.isRepeating) {
            html += `${_.capitalize(info.event.extendedProps.occurrence.toLowerCase())} event`;
          }

          if (info.event.extendedProps.isCustom) {
            html += `Day ${info.event.extendedProps.customIndex}`;
          }

          html += `</small>
              </div>`;

          return {
            html: html,
          };
        },
        dateClick: this.onDateClick,
        eventClick: this.onEventClick,
      },
    };
  },
  computed: {
    canDeleteEvent() {
      return this.hasValidAccess(['manager', 'delete-event']);
    },
  },
  created() {
    this.emitter.on(EMITTERS.SET_CALENDAR_LOCALE, () => {
      this.calendarOptions.locale = store.state.localization.lang;
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert', 'hasValidAccess'],
  methods: {
    onDateClick(date) {
      this.$emit('onDateClick', date);
    },
    onEventClick(info) {
      this.$emit('onEventClick', info);
    },
  },
  watch: {
    events(value) {
      this.calendarOptions.events = value;
    },
  },
};
</script>

<style lang="scss">
.fc-event-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  color: #000;
  background-color: #e4f1ff;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .actions {
      display: flex;
    }
  }

  .title {
    font-weight: bold;
    margin-top: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .time {
    //text-align: center;
  }

  .occurrence {
    //text-align: center;
  }

  .actions {
    position: absolute;
    right: 0;
    display: none;
    justify-content: flex-end;

    button {
      padding: 0.25rem;
      display: flex;
      align-items: center;

      i {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
