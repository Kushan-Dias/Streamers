<template>
  <CModal
    scrollable
    backdrop="static"
    :visible="showCreateModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.addNewMaintenanceRequest') }}</CCardTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel for="name">{{ $t('labels.title') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="maintenance.title" placeholder="Request title"/>
              <div class="d-flex flex-column" v-if="v$.maintenance.title.$dirty">
                <small class="validation-error" v-if="v$.maintenance.title.required.$invalid">
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
              <CFormTextarea id="description" rows="6" v-model="maintenance.description"
                             placeholder="Request description">
              </CFormTextarea>
              <div class="d-flex flex-column" v-if="v$.maintenance.description.$dirty">
                <small class="validation-error" v-if="v$.maintenance.description.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="9">
            <CFormLabel for="attachments">{{ $tc('labels.attachment', 2) }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="attachments" type="url" v-model="maintenance.attachments"
                          placeholder="https://images.app.au/sites/public/event-image.png"
              />
              <div class="d-flex flex-column" v-if="v$.maintenance.attachments.$dirty">
                <small class="validation-error" v-if="v$.maintenance.attachments.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="validation-error" v-if="v$.maintenance.attachments.url.$invalid">
                  {{ $t('labels.validations.url') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="priority">{{ $t('labels.selectPriority') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="priority" v-model="maintenance.priority">
                <option
                  v-for="priority in selectMaintenancePriorities"
                  :value="priority.value"
                  :key="priority.id"
                  :selected="maintenance.priority === priority.value"
                >
                  {{ priority.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.maintenance.priority.$dirty">
                <small class="validation-error" v-if="v$.maintenance.priority.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="12" v-if="maintenance.attachments">
            <div class="mb-3 text-center">
              <img :src="maintenance.attachments" class="img-fluid" height="250" alt="event_image">
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4" class="mb-2" v-for="(selectedAsset, index) in selectedAssets">
            <CFormLabel v-if="index === selectedAssets.length - 1">{{ $t('labels.selectedAsset') }}</CFormLabel>
            <CFormLabel v-else>&nbsp;</CFormLabel>
            <div class="form-control d-flex justify-content-between align-items-center">
              <span class="">{{ selectedAsset.name }}</span>
              <span class="btn px-0" @click="removeSelectedAsset(index)">
                <CIcon icon="cil-x-circle"/>
              </span>
            </div>
          </CCol>
          <CCol :md="4" v-if="assets.length > 0 && selectedAssets.length >= 0">
            <CFormLabel for="asset_id">{{ $tc('labels.selectAsset', 1) }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="asset_id" v-model="maintenance.asset_id" @change="setAsset">
                <option value="">{{ $tc('labels.selectAsset', 1) }}</option>
                <option
                  v-for="asset in assets"
                  :value="asset.id"
                  :key="asset.id"
                  :selected="maintenance.asset_id === asset.id"
                >
                  {{ asset.name }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.maintenance.asset_id.$dirty">
                <small class="validation-error" v-if="v$.maintenance.asset_id.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="location">{{ $t('labels.location') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="location" class="bg-transparent" type="text" v-model="maintenance.location"
                          placeholder="Building > Room" :disabled="true"
              />
              <div class="d-flex flex-column" v-if="v$.maintenance.location.$dirty">
                <small class="validation-error" v-if="v$.maintenance.location.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="problemNature">{{ $t('labels.problemNature') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="problemNature" v-model="maintenance.problem_nature" placeholder="No power"/>
              <div class="d-flex flex-column" v-if="v$.maintenance.problem_nature.$dirty">
                <small class="validation-error" v-if="v$.maintenance.problem_nature.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4">
            <CFormLabel for="convenientDate">{{ $t('labels.convenientDate') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="convenientDate" class="w-100" v-model:value="maintenance.convenient_date"
                           format="YYYY-MM-DD" value-type="YYYY-MM-DD" @change="setConvenientDate"
                           :disabled-date="disabledDateBeforeToday" editable="false">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.maintenance.convenient_date.$dirty">
                <small class="validation-error" v-if="v$.maintenance.convenient_date.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="convenientTimeFrom">{{ $t('labels.convenientTimeFrom') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="convenientTimeFrom" class="w-100" v-model:value="convenientTimeFrom"
                           type="time" format="HH:mm:ssZZ" value-type="HH:mm:ssZZ" @change="setConvenientFrom"
                           editable="false" :disabled-date="convenientTimeFromValidation">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.convenientTimeFrom.$dirty">
                <small class="validation-error" v-if="v$.convenientTimeFrom.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="convenientTimeTo">{{ $t('labels.convenientTimeTo') }}</CFormLabel>
            <div class="mb-3">
              <date-picker id="convenientTimeTo" class="w-100" v-model:value="convenientTimeTo"
                           type="time" format="HH:mm:ssZZ" value-type="HH:mm:ssZZ" @change="setConvenientTo"
                           editable="false" :disabled-date="convenientTimeToValidation">
              </date-picker>
              <div class="mb-2 d-flex flex-column" v-if="v$.convenientTimeTo.$dirty">
                <small class="validation-error" v-if="v$.convenientTimeTo.$invalid">
                  {{ $t('labels.validations.timeAfterFrom') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ maintenance }}</textarea>
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
      <CButton class="float-right" type="submit" color="primary" @click="addMaintenance">
        {{ $t('actions.addMaintenance') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import Loading from "vue-loading-overlay";
import useVuelidate from "@vuelidate/core";
import { required, url } from "@vuelidate/validators";
import { EMITTERS, MAINTENANCE_PRIORITIES, SELECT_MAINTENANCE_PRIORITIES } from "../../../../utils/constants";
import { REQUEST_METHOD } from "../../../../utils/enums";

export default {
  name: "AddMaintenance",
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
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      maintenance: {
        title: { required },
        description: { required },
        attachments: { required, url },
        asset_id: { required },
        location: { required },
        priority: { required },
        problem_nature: { required },
        convenient_date: { required },
      },
      convenientTimeFrom: { required },
      convenientTimeTo: { required },
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
      maintenancePriorities: MAINTENANCE_PRIORITIES,
      selectMaintenancePriorities: SELECT_MAINTENANCE_PRIORITIES,
      assets: [],
      selectedAsset: {},
      selectedAssets: [],
      maintenance: {
        priority: MAINTENANCE_PRIORITIES.LOW,
      },
      convenientTimeFrom: null,
      convenientTimeTo: null,
      createSuccessToast: {
        message: this.$t('messages.newMaintenanceAdded'),
        type: 'success',
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    convenientTimeFromValidation(date) {
      return date < new Date(date.getTime()).setHours(0, 0, 0, 0);
    },
    convenientTimeToValidation(date) {
      return date < new Date(date.getTime()).setHours(0, 0, 0, 0);
    },
    disabledDateBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date <= today;
    },
    setConvenientDate() {
      this.setConvenientFrom();
      this.setConvenientTo();
    },
    setConvenientFrom() {
      this.maintenance.convenient_from = `${this.maintenance.convenient_date}T${this.convenientTimeFrom}`;
    },
    setConvenientTo() {
      this.maintenance.convenient_to = `${this.maintenance.convenient_date}T${this.convenientTimeTo}`;
    },
    setAsset(e) {
      this.selectedAsset = this.assets[e.target.selectedIndex - 1];
      this.selectedAssets.push(this.selectedAsset);
      this.setLocation();
      this.getAssets(e.target.value);
    },
    setLocation() {
      if (this.selectedAssets !== {}) {
        this.maintenance.location = this.selectedAssets.map(a => a.name).join(' > ');
      } else {
        this.maintenance.location = null;
      }
    },
    removeSelectedAsset(index) {
      this.selectedAssets.length = index;
      if (this.selectedAssets.length > 0) {
        this.maintenance.asset_id = this.selectedAssets[this.selectedAssets.length - 1].id;
      } else {
        this.maintenance.asset_id = null;
      }
      this.setLocation();
      this.getAssets(this.maintenance.asset_id ? this.maintenance.asset_id : 0);
    },
    resetForm() {
      this.maintenance = {
        priority: MAINTENANCE_PRIORITIES.LOW,
      };
      this.convenientTimeFrom = null;
      this.convenientTimeTo = null;
      this.selectedAssets = [];
      this.selectedAsset = {};
      this.v$.$reset();
    },
    async getAssets(parentId = 0) {
      this.isLoading = true;
      await this.fetcher(`/api/assets/parent/${parentId}`, REQUEST_METHOD.GET)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.assets = response.data.data.assets;
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async addMaintenance() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher('/api/maintenances', REQUEST_METHOD.POST, this.maintenance)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.showToast(this.createSuccessToast);
            this.emitter.emit(EMITTERS.RELOAD_DATATABLE);
            this.resetForm();
            this.closeModal();
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    showCreateModal(value) {
      if (value) {
        this.getAssets();
      }
    },
  },
};
</script>

<style scoped>

</style>
