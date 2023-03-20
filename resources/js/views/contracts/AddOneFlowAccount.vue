<template>
  <CModal
    backdrop="static"
    :visible="showCreateUpdateAccountModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('labels.addOneFlowAccount') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <div v-if="!isUpdating">
              <CFormLabel for="plan">{{ $t('labels.selectTenant') }}</CFormLabel>
              <div class="mb-3">
                <CFormSelect id="plan" v-model="account.tenant_id">
                  <option>{{ $t('labels.select') }}</option>
                  <option v-for="tenant in tenants" :value=tenant.id :selected="account.tenant_id === tenant.id"
                          :disabled="isUpdating">{{ tenant.name }}
                  </option>
                </CFormSelect>
                <div class="d-flex flex-column" v-if="v$.account.tenant_id.$dirty">
                  <small class="text-danger" v-if="v$.account.tenant_id.required.$invalid">
                    {{ $t('labels.validations.required') }}
                  </small>
                </div>
              </div>
            </div>
            <div v-else>
              <CFormLabel for="tenant">{{ $t('labels.tenant') }}</CFormLabel>
              <CFormInput id="tenant" :value="account.tenant_id" disabled/>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="name">{{ $t('labels.accountFirstNameLastName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="account.name" placeholder="John Doe"/>
              <div class="d-flex flex-column" v-if="v$.account.name.$dirty">
                <small class="text-danger" v-if="v$.account.name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="plan">{{ $t('labels.organizerTitle') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="account.title" placeholder="Legal Department"/>
              <div class="d-flex flex-column" v-if="v$.account.title.$dirty">
                <small class="text-danger" v-if="v$.account.title.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="plan">{{ $t('labels.oneFlowAccountEmail') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="account.email" placeholder="legal@yugo.com"/>
              <div class="d-flex flex-column" v-if="v$.account.email.$dirty">
                <small class="text-danger" v-if="v$.account.email.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.account.email.email.$invalid">
                  {{ $t('labels.validations.email') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormLabel for="email">{{ $t('labels.token') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="email" v-model="account.token"
                          placeholder="dcbf45a7a7r457gv12522c4e2c8e0a987828e414"/>
              <div class="d-flex flex-column" v-if="v$.account.token.$dirty">
                <small class="text-danger" v-if="v$.account.token.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="plan">{{ $t('labels.mobile') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="account.mobile"/>
              <div class="d-flex flex-column" v-if="v$.account.mobile.$dirty">
                <small class="text-danger" v-if="v$.account.mobile.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="plan">{{ $t('labels.selectCountryCode') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="plan" v-model="account.country_code">
                <option>{{ $t('labels.select') }}</option>
                <option value="LK">LK</option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.account.country_code.$dirty">
                <small class="text-danger" v-if="v$.account.country_code.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ isUpdating }} {{ account }}</textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton v-if="isUpdating" color="primary" @click="updateOneFlowAccount()">
        {{ $t('actions.update') }}
      </CButton>
      <CButton v-else color="primary" @click="addOneFlowAccount()">
        {{ $t('actions.add') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../utils/enums";
import { EMITTERS } from "../../utils/constants";

export default {
  name: "AddOneFlowAccount",
  components: {
    Loading,
  },
  props: {
    showCreateUpdateAccountModal: {
      required: true,
      type: Boolean,
      default: false
    },
    isUpdating: {
      type: Boolean,
      default: false
    },
    ofAccount: {
      type: Object,
      default: {},
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      account: {
        tenant_id: { required },
        name: { required },
        title: { required },
        email: { required, email },
        token: { required },
        mobile: { required },
        country_code: { required },
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
      account: {},
      tenants: [],
      accountCreateSuccessToast: {
        message: 'Account created',
        type: 'success',
      },
      accountUpdateSuccessToast: {
        message: 'Account updated',
        type: 'success',
      },
    };
  },
  created() {
    if (!this.isUpdating) {
      this.getAllTenants();
    }
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getAllTenants() {
      this.isLoading = true;
      await this.fetcher(`/api/tenants`, REQUEST_METHOD.GET)
        .then((response) => {
          this.tenants = response.data.data.tenants;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async addOneFlowAccount() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/contracts/oneflow`, REQUEST_METHOD.POST, this.account)
        .then((response) => {
          this.showToast(this.accountCreateSuccessToast);
          this.emitter.emit(EMITTERS.GET_DATA);
          this.isLoading = false;
          this.closeModal();
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async updateOneFlowAccount() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/contracts/oneflow/${this.account.id}`, REQUEST_METHOD.PUT, this.account)
        .then((response) => {
          this.closeModal();
          this.showToast(this.accountUpdateSuccessToast);
          this.isLoading = false;
          this.getAllOneFlowAccounts();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    resetForm() {
      this.account = {};
      this.v$.$reset();
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    ofAccount(value) {
      if (value) {
        this.account = value;
      }
    }
  },
};
</script>

<style scoped>

</style>
