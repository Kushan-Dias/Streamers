<template>
  <CCard>
    <CCardHeader>
      <CCardTitle>{{ $t('labels.createTenant') }}</CCardTitle>
    </CCardHeader>
    <CCardBody>
      <Loading v-model:active="isLoading" is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="domain">{{ $t('labels.subDomainName') }}</CFormLabel>
            <div class="mb-3">
              <CInputGroup>
                <CFormInput id="domain" v-model="currentTenant.domain" placeholder="subdomain"/>
                <CInputGroupText>.{{ windowLocationHost }}</CInputGroupText>
              </CInputGroup>
              <div class="d-flex flex-column" v-if="v$.currentTenant.domain.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.domain.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="name">{{ $t('labels.tenantName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="currentTenant.name" placeholder="Yugo"/>
              <div class="d-flex flex-column" v-if="v$.currentTenant.name.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.name.required.$invalid">
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
              <CFormSelect
                id="plan"
                v-model="currentTenant.plan"
                :options="[
                  { label: 'Basic', value: 'BASIC', selected: true },
                  { label: 'Standard', value: 'STANDARD' },
                  { label: 'Premium', value: 'PREMIUM' }
                ]"
              >
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.currentTenant.plan.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.plan.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectStatus') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect
                id="status"
                v-model="currentTenant.status"
                :options="[
                  { label: 'Active', value: 'ACTIVE', selected: true },
                  { label: 'Inactive', value: 'INACTIVE' },
                  { label: 'Restricted', value: 'RESTRICTED' }
                ]"
              >
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.currentTenant.status.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.status.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <div class="my-3 d-flex flex-row">
          <h5>{{ $t('labels.createTenantPrimaryAccount') }}</h5>
        </div>
        <CRow>
          <CCol xs>
            <CFormLabel for="first-name">{{ $t('labels.firstName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="first-name" v-model="currentTenant.first_name" placeholder="John"/>
              <div class="d-flex flex-column" v-if="v$.currentTenant.first_name.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.first_name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="last-name">{{ $t('labels.lastName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="last-name" v-model="currentTenant.last_name" placeholder="Doe"/>
              <div class="d-flex flex-column" v-if="v$.currentTenant.last_name.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.last_name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormLabel for="email">{{ $t('labels.email') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="email" v-model="currentTenant.email" placeholder="johndoe@mail.com"/>
              <div class="d-flex flex-column" v-if="v$.currentTenant.email.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.email.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.currentTenant.email.email.$invalid">
                  {{ $t('labels.validations.email') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="username">{{ $t('labels.username') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="username" v-model="currentTenant.username" placeholder="johndoe"/>
              <div class="d-flex flex-column" v-if="v$.currentTenant.username.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.username.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormLabel for="password">{{ $t('labels.password') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="password" v-model="currentTenant.password" type="password" placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentTenant.password.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.password.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.currentTenant.password.minLength.$invalid">
                  {{ $t('labels.validations.minLength', { num: 8 }) }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="confirm-password">{{ $t('labels.confirmPassword') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="confirm-password" v-model="currentTenant.confirm_password" type="password"
                          placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentTenant.confirm_password.$dirty">
                <small class="text-danger" v-if="v$.currentTenant.confirm_password.sameAs.$invalid">
                  {{ $t('labels.validations.sameAsPassword') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
    <CCardFooter>
      <CButton size="sm" class="float-right" type="submit" color="primary" @click="createTenant">
        {{ $t('labels.createTenant') }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: "CreateTenant",
  components: {
    Loading,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      currentTenant: {
        domain: '',
        name: '',
        plan: 'BASIC',
        status: 'ACTIVE',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      createSuccessToast: {
        message: 'New tenant created',
        type: 'success',
        duration: 10000,
        dismissible: true,
        queue: false,
        position: 'top-right',
      },
      showCreateModal: false,
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
        domain: { required },
        name: { required },
        plan: { required },
        status: { required },
        first_name: { required },
        last_name: { required },
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        confirm_password: {
          required,
          sameAs: sameAs(this.currentTenant.password, 'confirmation'),
          minLength: minLength(8),
        },
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async createTenant() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher('/api/tenants', REQUEST_METHOD.POST, this.currentTenant)
        .then((response) => {
          this.isLoading = false;
          this.showCreateModal = false;
          this.showToast(this.createSuccessToast);
          this.$router.push('/tenants');
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
  },
};
</script>
