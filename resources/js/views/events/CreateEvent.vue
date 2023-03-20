<template>
  <CModal
    scrollable
    backdrop="static"
    :visible="showCreateModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.createNewEvent') }}</CCardTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel for="name">{{ $t('labels.name') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="currentEvent.name" placeholder="An Awesome Event"/>
              <div class="d-flex flex-column" v-if="v$.currentEvent.name.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="description">{{ $t('labels.description') }}</CFormLabel>
            <div class="mb-3">
              <CFormTextarea id="description" rows="6" v-model="currentEvent.description"
                             placeholder="Awesome event description">
              </CFormTextarea>
              <div class="d-flex flex-column" v-if="v$.currentEvent.description.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.description.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="12">
            <CFormLabel for="image_url">{{ $t('labels.imageURL') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="image_url" type="image_url" v-model="currentEvent.image_url"
                          placeholder="https://images.app.au/sites/public/event-image.png"
              />
              <div class="d-flex flex-column" v-if="v$.currentEvent.image_url.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.image_url.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="validation-error" v-if="v$.currentEvent.image_url.url.$invalid">
                  {{ $t('labels.validations.url') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="12" v-if="currentEvent.image_url">
            <div class="mb-3 text-center">
              <img :src="currentEvent.image_url" class="img-fluid" height="250" alt="event_image">
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="organizer">{{ $t('labels.organizerName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="organizer" v-model="currentEvent.organizer" placeholder="RofiLabs"/>
              <div class="d-flex flex-column" v-if="v$.currentEvent.organizer.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.organizer.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4">
            <CFormLabel for="event_date">{{ $t('labels.eventDate') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="event_date" class="w-100" v-model:value="currentEvent.event_date"
                           format="YYYY-MM-DD" value-type="YYYY-MM-DD" @change="setEventDate"
                           :disabled-date="disabledDateBeforeTodayAndAfterEnd" editable="false">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentEvent.event_date.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.event_date.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="start_time">{{ $t('labels.eventStartTime') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="start_time" class="w-100" v-model:value="start_time"
                           type="time" format="HH:mm:ssZZ" value-type="HH:mm:ssZZ" @change="setStartTime"
                           editable="false" :disabled-date="startTimeValidation">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.start_time.$dirty">
                <small class="validation-error" v-if="v$.start_time.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="end_time">{{ $t('labels.eventEndTime') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="end_time" class="w-100" v-model:value="end_time"
                           type="time" format="HH:mm:ssZZ" value-type="HH:mm:ssZZ" @change="setEndTime"
                           editable="false" :disabled-date="endTimeValidation">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.end_time.$dirty">
                <small class="validation-error" v-if="v$.end_time.$invalid">
                  {{ $t('labels.validations.timeAfterStart') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4">
            <CFormLabel for="recurring_type">{{ $t('labels.selectRecurringType') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="recurring_type" v-model="currentEvent.recurring_type" @change="resetRecurring">
                <option
                  v-for="recurring_type in selectEventRecurringType"
                  :value="recurring_type.value"
                  :key="recurring_type.id"
                  :selected="currentEvent.recurring_type === recurring_type.value"
                >
                  {{ recurring_type.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.currentEvent.recurring_type.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.recurring_type.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4" v-if="currentEvent.recurring_type === eventRecurringTypes.REPEAT">
            <CFormLabel for="occurrence">{{ $t('labels.repeatEvery') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="occurrence" v-model="currentEvent.occurrence" @change="resetOccurrence">
                <option
                  v-for="occurrence in selectEventOccurrences"
                  :value="occurrence.value"
                  :key="occurrence.id"
                >
                  {{ occurrence.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.currentEvent.occurrence.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.occurrence.requiredIfRepeat.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4" v-if="currentEvent.recurring_type === eventRecurringTypes.REPEAT">
            <CFormLabel for="end_date">{{ $t('labels.endDate') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="end_date" class="w-100" v-model:value="currentEvent.end_date" format="YYYY-MM-DD"
                           value-type="YYYY-MM-DD" :disabled-date="disabledDateBeforeStart">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentEvent.end_date.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.end_date.requiredIfRepeat.$invalid">
                  {{ $t('labels.validations.date') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4" v-if="currentEvent.recurring_type === eventRecurringTypes.CUSTOM" class="mb-2"
                v-for="(custom_date, index) in custom_dates">
            <CFormLabel>{{ $t('labels.selectedDate') }}</CFormLabel>
            <div class="form-control d-flex justify-content-between align-items-center">
              <span class="">{{ formatCustomDate(custom_date) }}</span>
              <span class="btn px-0" @click="removeCustomDate(index)">
                <CIcon icon="cil-x-circle"/>
              </span>
            </div>
          </CCol>
          <CCol :md="4" v-if="currentEvent.recurring_type === eventRecurringTypes.CUSTOM" class="mb-2">
            <CFormLabel for="end_date">{{ $t('labels.addCustomDates') }}</CFormLabel>
            <date-picker id="custom_dates" class="w-100"
                         v-model:value="custom_date" @change="addCustomDate"
                         format="YYYY-MM-DD" value-type="YYYY-MM-DD">
            </date-picker>
            <div class="d-flex flex-column" v-if="v$.custom_dates.$dirty">
              <small class="validation-error" v-if="v$.custom_dates.requiredIfCustom.$invalid">
                {{ $t('labels.validations.required') }}
              </small>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4">
            <CFormLabel for="location_name">{{ $t('labels.locationName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="location_name" v-model="currentEvent.location_name" placeholder="Melbourne"/>
              <div class="d-flex flex-column" v-if="v$.currentEvent.location_name.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.location_name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="5">
            <CFormLabel for="addressOne">{{ $t('labels.locationURL') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressOne" v-model="currentEvent.location_url"
                          placeholder="https://goo.gl/maps/neCZB3TXqUDuFxX88"/>
              <div class="d-flex flex-column" v-if="v$.currentEvent.location_url.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.location_url.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="limit">{{ $t('labels.limit') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput type="number" id="limit" v-model="currentEvent.limit" placeholder="Line 2"/>
              <div class="d-flex flex-column" v-if="v$.currentEvent.limit.$dirty">
                <small class="validation-error" v-if="v$.currentEvent.limit.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ currentEvent }}</textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton class="float-right" type="submit" color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton class="float-right" type="submit" color="primary" @click="createEvent">
        {{ $t('labels.createEvent') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import moment from "moment";
import DatePicker from 'vue-datepicker-next';
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, url } from "@vuelidate/validators";

import Loading from "vue-loading-overlay";
import {
  EMITTERS,
  EVENT_OCCURRENCES,
  EVENT_RECURRING_TYPES,
  SELECT_EVENT_OCCURRENCES,
  SELECT_EVENT_RECURRING_TYPES
} from "../../utils/constants";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: "CreateEvent",
  components: {
    DatePicker,
    Loading,
  },
  props: {
    showCreateModal: {
      required: true,
      type: Boolean,
      default: false
    },
    eventDate: {
      required: false,
      type: String,
      default: null,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      currentEvent: {
        name: { required },
        description: { required },
        image_url: { required, url },
        organizer: { required },
        event_date: { required },
        recurring_type: { required },
        occurrence: {
          requiredIfRepeat: requiredIf(this.currentEvent.recurring_type === EVENT_RECURRING_TYPES.REPEAT),
        },
        end_date: {
          requiredIfRepeat: requiredIf(this.currentEvent.recurring_type === EVENT_RECURRING_TYPES.REPEAT),
        },
        location_name: { required },
        location_url: { required },
        limit: { required },
      },
      start_time: { required },
      end_time: { required },
      custom_dates: {
        requiredIfCustom: requiredIf(this.currentEvent.recurring_type === EVENT_RECURRING_TYPES.CUSTOM),
      },
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      eventRecurringTypes: EVENT_RECURRING_TYPES,
      selectEventRecurringType: SELECT_EVENT_RECURRING_TYPES,
      eventOccurrences: EVENT_OCCURRENCES,
      selectEventOccurrences: SELECT_EVENT_OCCURRENCES,
      currentEvent: {
        limit: 100,
        recurring_type: EVENT_RECURRING_TYPES.NO_REPEAT,
      },
      start_time: null,
      end_time: null,
      custom_date: null,
      custom_dates: [],
      createSuccessToast: {
        message: this.$t('messages.newEventCreated'),
        type: 'success',
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    startTimeValidation(date) {
      // if (this.end_time !== null) {
      //   const endTime = Date.parse(this.end_time)
      //   const hours = endTime.getHours();
      //   const minutes = endTime.getMinutes();
      //   return date < new Date(date.getTime()).setHours(hours, minutes, 0, 0);
      // }
      //
      return date < new Date(date.getTime()).setHours(0, 0, 0, 0);
    },
    endTimeValidation(date) {
      // if (this.start_time !== null) {
      //   const endTime = Date.parse(this.start_time)
      //   const hours = endTime.getHours();
      //   const minutes = endTime.getMinutes();
      //   return date < new Date(date.getTime()).setHours(hours, minutes, 0, 0);
      // }
      //
      return date < new Date(date.getTime()).setHours(0, 0, 0, 0);
    },
    formatCustomDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    disabledDateBeforeTodayAndAfterEnd(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (this.currentEvent.end_date !== null) {
        return date < today || date > Date.parse(this.currentEvent.end_date);
      }

      return date < today;
    },
    disabledDateBeforeStart(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (this.currentEvent.event_date !== null) {
        return date < Date.parse(this.currentEvent.event_date);
      }

      return date < today;
    },
    setEventDate() {
      this.setStartTime();
      this.setEndTime();
    },
    setStartTime() {
      this.currentEvent.start_time = `${this.currentEvent.event_date}T${this.start_time}`;
    },
    setEndTime() {
      this.currentEvent.end_time = `${this.currentEvent.event_date}T${this.end_time}`;
    },
    addCustomDate() {
      this.custom_dates.push(this.custom_date);
      this.custom_date = null;
      this.currentEvent.custom_dates = this.custom_dates.join(', ');
    },
    removeCustomDate(index) {
      this.custom_dates.splice(index, 1);
      this.currentEvent.custom_dates = this.custom_dates.join(', ');
    },
    resetRecurring(e) {
      if (e.target.value === EVENT_RECURRING_TYPES.NO_REPEAT) {
        delete this.currentEvent.occurrence;
        delete this.currentEvent.end_date;
        delete this.currentEvent.custom_dates;
      }

      if (e.target.value === EVENT_RECURRING_TYPES.REPEAT) {
        this.currentEvent.occurrence = EVENT_OCCURRENCES.DAILY;
        delete this.currentEvent.custom_dates;
      }

      if (e.target.value === EVENT_RECURRING_TYPES.CUSTOM) {
        this.custom_dates = [];
        delete this.currentEvent.end_date;
        delete this.currentEvent.occurrence;
      }
    },
    resetOccurrence() {
      delete this.currentEvent.end_date;
      delete this.currentEvent.custom_dates;
      this.custom_dates = [];
    },
    async createEvent() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      this.currentEvent = Object.fromEntries(Object.entries(this.currentEvent).filter(([_, v]) => v != null));

      await this.fetcher(`/api/events`, REQUEST_METHOD.POST, this.currentEvent)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.showToast(this.createSuccessToast);
            this.emitter.emit(EMITTERS.GET_DATA);
            this.resetForm();
            this.closeModal();
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    resetForm() {
      this.currentEvent = {
        limit: 100,
        recurring_type: EVENT_RECURRING_TYPES.NO_REPEAT,
      };
      this.start_time = null;
      this.end_time = null;
      this.custom_date = null;
      this.custom_dates = [];
      this.v$.$reset();
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    eventDate(newVal) {
      this.currentEvent.event_date = newVal;
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>
