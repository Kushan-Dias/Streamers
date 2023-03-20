<template>
  <CModal
    backdrop="static"
    :visible="showAssignModal"
    @close="closeModal"
    size="md"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.assignToMaintainer') }}</CCardTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel for="assignedTo">{{ $t('labels.selectMaintainer') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="assignedTo" v-model="assign.maintainer">
                <option value="">{{ $t('labels.selectMaintainer') }}</option>
                <option v-for="(maintainer, index) in maintainers" :value="maintainer.id" :key="index">
                  {{ maintainer.first_name }} {{ maintainer.last_name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.assign.maintainer.$dirty">
                <small class="validation-error" v-if="v$.assign.maintainer.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="event_date">{{ $t('labels.eventDate') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="event_date" class="w-100" v-model:value="assign.event_date"
                           format="YYYY-MM-DD" value-type="YYYY-MM-DD" @change="setEventDate"
                           :disabled-date="disabledDateBeforeTodayAndAfterEnd" editable="false">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.assign.event_date.$dirty">
                <small class="validation-error" v-if="v$.assign.event_date.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
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
          <CCol>
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
          <CCol :md="6">
            <CFormLabel for="recurring_type">{{ $t('labels.selectRecurringType') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="recurring_type" v-model="assign.recurring_type" @change="resetRecurring">
                <option
                  v-for="recurring_type in selectEventRecurringType"
                  :value="recurring_type.value"
                  :key="recurring_type.id"
                  :selected="assign.recurring_type === recurring_type.value"
                >
                  {{ recurring_type.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.assign.recurring_type.$dirty">
                <small class="validation-error" v-if="v$.assign.recurring_type.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="6" v-if="assign.recurring_type === eventRecurringTypes.REPEAT">
            <CFormLabel for="occurrence">{{ $t('labels.repeatEvery') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="occurrence" v-model="assign.occurrence" @change="resetOccurrence">
                <option
                  v-for="occurrence in selectEventOccurrences"
                  :value="occurrence.value"
                  :key="occurrence.id"
                >
                  {{ occurrence.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.assign.occurrence.$dirty">
                <small class="validation-error" v-if="v$.assign.occurrence.requiredIfRepeat.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="12" v-if="assign.recurring_type === eventRecurringTypes.REPEAT">
            <CFormLabel for="end_date">{{ $t('labels.endDate') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="end_date" class="w-100" v-model:value="assign.end_date" format="YYYY-MM-DD"
                           value-type="YYYY-MM-DD" :disabled-date="disabledDateBeforeStart">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.assign.end_date.$dirty">
                <small class="validation-error" v-if="v$.assign.end_date.requiredIfRepeat.$invalid">
                  {{ $t('labels.validations.date') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="6" v-if="assign.recurring_type === eventRecurringTypes.CUSTOM" class="mb-2"
                v-for="(custom_date, index) in custom_dates">
            <CFormLabel>{{ $t('labels.selectedDate') }}</CFormLabel>
            <div class="form-control d-flex justify-content-between align-items-center">
              <span class="">{{ formatCustomDate(custom_date) }}</span>
              <span class="btn px-0" @click="removeCustomDate(index)">
                <CIcon icon="cil-x-circle"/>
              </span>
            </div>
          </CCol>
          <CCol :md="6" v-if="assign.recurring_type === eventRecurringTypes.CUSTOM" class="mb-2">
            <CFormLabel for="end_date">{{ $t('labels.addCustomDates') }}</CFormLabel>
            <date-picker id="custom_dates" class="w-100"
                         v-model:value="custom_date" @change="addCustomDate"
                         format="YYYY-MM-DD" value-type="YYYY-MM-DD"
                         :disabled-date="disabledDateBeforeTodayAndAfterEnd">
            </date-picker>
            <div class="d-flex flex-column" v-if="v$.custom_dates.$dirty">
              <small class="validation-error" v-if="v$.custom_dates.requiredIfCustom.$invalid">
                {{ $t('labels.validations.required') }}
              </small>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ assign }}</textarea>
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
      <CButton class="float-right" type="submit" color="primary" @click="assignMaintainer">
        {{ $t('actions.assign') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import DatePicker from 'vue-datepicker-next';
import { required, requiredIf } from "@vuelidate/validators";

import Loading from "vue-loading-overlay";

import {
  EMITTERS,
  EVENT_OCCURRENCES,
  EVENT_RECURRING_TYPES,
  SELECT_EVENT_OCCURRENCES,
  SELECT_EVENT_RECURRING_TYPES
} from "../../../../utils/constants";
import { REQUEST_METHOD } from "../../../../utils/enums";
import moment from "moment";

export default {
  name: "AssignMaintainer",
  components: {
    Loading,
    DatePicker,
  },
  props: {
    maintenanceId: {
      required: true,
      type: Number,
      default: null,
    },
    showAssignModal: {
      required: true,
      type: Boolean,
      default: false
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      assign: {
        maintainer: { required },
        event_date: { required },
        recurring_type: { required },
        occurrence: {
          requiredIfRepeat: requiredIf(this.assign.recurring_type === EVENT_RECURRING_TYPES.REPEAT),
        },
        end_date: {
          requiredIfRepeat: requiredIf(this.assign.recurring_type === EVENT_RECURRING_TYPES.REPEAT),
        },
      },
      start_time: { required },
      end_time: { required },
      custom_dates: {
        requiredIfCustom: requiredIf(this.assign.recurring_type === EVENT_RECURRING_TYPES.CUSTOM),
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
      maintainers: [],
      eventRecurringTypes: EVENT_RECURRING_TYPES,
      selectEventRecurringType: SELECT_EVENT_RECURRING_TYPES,
      eventOccurrences: EVENT_OCCURRENCES,
      selectEventOccurrences: SELECT_EVENT_OCCURRENCES,
      assign: {
        recurring_type: EVENT_RECURRING_TYPES.NO_REPEAT,
      },
      start_time: null,
      end_time: null,
      custom_date: null,
      custom_dates: [],
      assignSuccessToast: {
        message: 'Maintainer assigned',
        type: 'success',
      },
      noMaintainersToast: {
        message: 'No maintainers available',
        type: 'error',
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

      if (this.assign.end_date !== null) {
        return date <= today || date > Date.parse(this.assign.end_date);
      }

      return date < today;
    },
    disabledDateBeforeStart(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (this.assign.event_date !== null) {
        return date < Date.parse(this.assign.event_date);
      }

      return date < today;
    },
    setEventDate() {
      this.setStartTime();
      this.setEndTime();
    },
    setStartTime() {
      this.assign.start_time = `${this.assign.event_date}T${this.start_time}`;
    },
    setEndTime() {
      this.assign.end_time = `${this.assign.event_date}T${this.end_time}`;
    },
    addCustomDate() {
      this.custom_dates.push(this.custom_date);
      this.custom_date = null;
      this.assign.custom_dates = this.custom_dates.join(', ');
    },
    removeCustomDate(index) {
      this.custom_dates.splice(index, 1);
      this.assign.custom_dates = this.custom_dates.join(', ');
    },
    resetRecurring(e) {
      if (e.target.value === EVENT_RECURRING_TYPES.NO_REPEAT) {
        delete this.assign.occurrence;
        delete this.assign.end_date;
        delete this.assign.custom_dates;
      }

      if (e.target.value === EVENT_RECURRING_TYPES.REPEAT) {
        this.assign.occurrence = EVENT_OCCURRENCES.DAILY;
        delete this.assign.custom_dates;
      }

      if (e.target.value === EVENT_RECURRING_TYPES.CUSTOM) {
        this.custom_dates = [];
        delete this.assign.end_date;
        delete this.assign.occurrence;
      }
    },
    resetOccurrence() {
      delete this.assign.end_date;
      delete this.assign.custom_dates;
      this.custom_dates = [];
    },
    resetForm() {
      this.assign = {
        maintenance_id: this.maintenanceId,
        recurring_type: EVENT_RECURRING_TYPES.NO_REPEAT,
      };
      this.start_time = null;
      this.end_time = null;
      this.custom_date = null;
      this.custom_dates = [];
      this.v$.$reset();
    },
    getMaintainers() {
      this.isLoading = true;

      this.fetcher('/api/users/role/maintainer', REQUEST_METHOD.GET)
        .then((response) => {
          this.isLoading = false;
          this.maintainers = response.data.data.maintainers;
          if (this.maintainers.length === 0) {
            this.showToast(this.noMaintainersToast);
          }
        }).catch((error) => {
        this.isLoading = false;
        this.catcher(error);
      });
    },
    async assignMaintainer() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/maintenances/assign`, REQUEST_METHOD.POST, this.assign)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.showToast(this.assignSuccessToast);
            this.emitter.emit(EMITTERS.RELOAD_MAINTENANCE);
            this.resetForm();
            this.closeModal();
          }
        }).catch((error) => {
          this.isLoading = false;
          console.log(error.response);
          this.catcher(error);
        });
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    showAssignModal(val) {
      if (val) {
        this.getMaintainers();
      }
    },
    maintenanceId(val) {
      this.assign.maintenance_id = val;
    },
  },
};
</script>

<style scoped>

</style>
