<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <Loading v-model:active="isLoading"/>
            <CCard class="p-4">
              <CAlert v-if="successMessage" color="success">
                {{ successMessage }}
                <CAlertLink v-if="successAction" :href="successAction">{{ successActionText }}</CAlertLink>
              </CAlert>
              <CAlert v-if="errorMessage" color="danger">
                {{ errorMessage }}
                <CAlertLink :href="errorAction">{{ errorActionText }}</CAlertLink>
              </CAlert>
              <div class="form-group">
              </div>
              <CCardBody v-if="!userId && !hash">
                <CForm @submit="handleEmailVerificationRequest">
                  <h1>Verify Email</h1>
                  <p class="text-medium-emphasis">Verify your email address</p>
                  <CFormLabel for="email">Email</CFormLabel>
                  <CInputGroup class="mb-1">
                    <CInputGroupText>
                      <CIcon icon="cil-user"/>
                    </CInputGroupText>
                    <CFormInput
                      id="email"
                      v-model="email"
                      name="email"
                      placeholder="Email"
                      autocomplete="email"
                    />
                  </CInputGroup>
                  <div class="mb-2 d-flex flex-column" v-if="v$.email.$dirty">
                    <small class="text-danger" v-if="v$.email.required.$invalid">Email field is required</small>
                    <small class="text-danger" v-if="v$.email.email.$invalid">Must be a valid email</small>
                  </div>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4 mt-4">Submit</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardBody v-else class="text-center">
                <h3>Verifying your email</h3>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { useRoute } from 'vue-router';
import { email, required } from '@vuelidate/validators';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: 'EmailVerification',
  components: {
    Loading,
  },
  setup() {
    return {
      v$: useVuelidate(),
      route: useRoute(),
    };
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      successMessage: "",
      errorAction: "",
      errorActionText: "",
      successAction: "",
      successActionText: "",
      email: "",
      userId: 0,
      hash: "",
      expires: 0,
      signature: "",
    };
  },
  validations() {
    return {
      email: { required, email },
    };
  },
  created() {
    this.handleEmailVerification();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async handleEmailVerificationRequest(e) {
      e.preventDefault();

      this.isLoading = true;

      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      const userDetails = {
        "email": this.email,
      };

      await this.fetcher('/email/verify/resend', REQUEST_METHOD.POST, userDetails)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.errorMessage = "";
            this.successMessage = response.data.message;
          }
        }).catch((error) => {
          this.isLoading = false;
          this.successMessage = "";
          this.errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.catcher(error);
        });
    },
    async handleEmailVerification() {
      if (this.route.params.id && this.route.params.hash && this.route.query.expires && this.route.query.signature) {
        this.isLoading = true;
        this.userId = parseInt(this.route.params.id);
        this.hash = this.route.params.hash;
        this.expires = this.route.query.expires;
        this.signature = this.route.query.signature;

        const userDetails = {
          "id": this.userId,
          "hash": this.hash,
          "expires": this.expires,
          "signature": this.signature,
        };

        await this.fetcher('/api/auth/email/verify/' + userDetails['id'] + '/' + userDetails['hash'] + '?expires=' + userDetails['expires'] + '&signature=' + userDetails['signature'], REQUEST_METHOD.GET, null, {}, false)
          .then((response) => {
            if (response.data.success) {
              this.isLoading = false;
              this.errorMessage = "";
              this.successMessage = response.data.message;
              this.successAction = '/login';
              this.successActionText = 'Login';
            }
          }).catch((error) => {
            this.isLoading = false;
            this.successMessage = "";
            this.errorMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            if (error.response.data.reason === 'email-already-verified') {
              this.errorAction = '/login';
              this.errorActionText = 'Login';
            } else {
              this.errorAction = '';
              this.errorActionText = '';
              this.catcher(error);
            }
          });
      }
    },
  },
};
</script>
