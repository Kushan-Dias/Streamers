<template>
  <CCard>
    <CCardHeader>
      <CCardTitle>{{ $t('labels.editTenant') }}</CCardTitle>
    </CCardHeader>
    <CCardBody>
      <Loading v-model:active="isLoading" is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="domain">{{ $t('labels.subDomainName') }}</CFormLabel>
            <div class="mb-3">
              <CInputGroup>
                <CInputGroupText class="w-100"
                >{{ currentTenant.domain }}.{{ windowLocationHost }}
                </CInputGroupText
                >
              </CInputGroup>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="name">{{ $t('labels.tenantName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput
                id="name"
                v-model="currentTenant.name"
                placeholder="Yugo"
              />
              <div
                class="d-flex flex-column"
                v-if="v$.currentTenant.name.$dirty"
              >
                <small
                  class="text-danger"
                  v-if="v$.currentTenant.name.required.$invalid"
                >
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="plan">{{ $t('labels.selectPlan') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="plan" v-model="currentTenant.plan">
                <option
                  v-for="plan in ['BASIC', 'STANDARD', 'PREMIUM']"
                  :value="plan"
                  :key="plan"
                >
                  {{ plan }}
                </option>
              </CFormSelect>
              <div
                class="d-flex flex-column"
                v-if="v$.currentTenant.plan.$dirty"
              >
                <small
                  class="text-danger"
                  v-if="v$.currentTenant.plan.required.$invalid"
                >
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectStatus') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="status" v-model="currentTenant.status">
                <option
                  v-for="status in ['ACTIVE', 'INACTIVE', 'RESTRICTED']"
                  :value="status"
                  :key="status"
                >
                  {{ status }}
                </option>
              </CFormSelect>
              <div
                class="d-flex flex-column"
                v-if="v$.currentTenant.status.$dirty"
              >
                <small
                  class="text-danger"
                  v-if="v$.currentTenant.status.required.$invalid"
                >
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
    <CCardFooter>
      <CButton
        size="sm"
        class="float-right"
        type="submit"
        color="primary"
        @click="updateTenant"
      >
        {{ $t('labels.updateTenant') }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: "EditTenant",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      currentTenant: {},
      updateSuccessToast: {
        message: "Tenant updated",
        type: "success",
      },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
      windowLocationProtocol: window.location.protocol,
      windowLocationHost: window.location.host,
    };
  },
  validations() {
    return {
      currentTenant: {
        name: { required },
        plan: { required },
        status: { required },
      },
    };
  },
  created() {
    this.getTenant();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getTenant() {
      this.isLoading = true;

      await this.fetcher(`/api/tenants/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.currentTenant = response.data.data.tenant;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async updateTenant() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/tenants/${this.$route.params.id}`, REQUEST_METHOD.PUT, this.currentTenant)
        .then((response) => {
          this.isLoading = false;
          this.showCreateCard = false;
          this.showToast(this.updateSuccessToast);
          this.$router.push(`/tenants/${this.currentTenant.id}`);
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
  },
};
</script>
