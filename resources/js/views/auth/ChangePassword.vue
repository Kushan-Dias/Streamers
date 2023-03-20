<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <Loading v-model:active="isLoading"/>
              <CAlert v-if="successMessage" color="success">
                {{ successMessage }}
                <CAlertLink v-if="successAction" :href="successAction">{{ successActionText }}</CAlertLink>
              </CAlert>
              <CAlert v-if="errorMessage" color="danger">
                {{ errorMessage }}
                <CAlertLink v-if="errorAction" :href="errorAction">{{ errorActionText }}</CAlertLink>
              </CAlert>
              <div class="form-group">
              </div>
              <CCardBody>
                <CForm @submit="changePassword">
                  <h1>Change Password</h1>
                  <p class="text-medium-emphasis">Change your password</p>
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
                  <CFormLabel for="password">Current password</CFormLabel>
                  <CInputGroup class="mb-1">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked"/>
                    </CInputGroupText>
                    <CFormInput
                      id="password"
                      v-model="password"
                      name="currentpassword"
                      type="password"
                      placeholder="Current password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <div class="mb-2 d-flex flex-column" v-if="v$.password.$dirty">
                    <small class="text-danger" v-if="v$.password.required.$invalid">Current password field is
                      required</small>
                    <small class="text-danger" v-if="v$.password.minLength.$invalid">Must greater than 8
                      characters</small>
                  </div>
                  <CFormLabel for="newPassword">New password</CFormLabel>
                  <CInputGroup class="mb-1">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked"/>
                    </CInputGroupText>
                    <CFormInput
                      id="newPassword"
                      v-model="newPassword"
                      type="password"
                      name="newpassword"
                      placeholder="New Password"
                      autocomplete="new-password"
                    />
                  </CInputGroup>
                  <div class="mb-2 d-flex flex-column" v-if="v$.newPassword.$dirty">
                    <small class="text-danger" v-if="v$.newPassword.required.$invalid">New password field is
                      required</small>
                    <small class="text-danger" v-if="v$.newPassword.minLength.$invalid">Must greater than 8
                      characters</small>
                  </div>
                  <CFormLabel for="newPassword">Confirm new password</CFormLabel>
                  <CInputGroup class="mb-1">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked"/>
                    </CInputGroupText>
                    <CFormInput
                      id="confirmNewPassword"
                      v-model="confirmNewPassword"
                      type="password"
                      name="re-newpassword"
                      placeholder="Confirm New Password"
                      autocomplete="confirm-new-password"
                    />
                  </CInputGroup>
                  <div class="mb-2 d-flex flex-column" v-if="v$.confirmNewPassword.$dirty">
                    <!--                    <small class="text-danger" v-if="v$.confirmNewPassword.required.$invalid">Confirm password field is required</small>-->
                    <small class="text-danger" v-if="v$.confirmNewPassword.sameAs.$invalid">Must match with new
                      password</small>
                  </div>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4 mt-4">Submit</CButton>
                    </CCol>
                  </CRow>
                </CForm>
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
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: 'ChangePassword',
  components: {
    Loading,
  },
  setup() {
    return {
      v$: useVuelidate(),
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
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
      newPassword: { required, minLength: minLength(8) },
      confirmNewPassword: { required, sameAs: sameAs(this.newPassword, 'New password'), minLength: minLength(8) },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async changePassword(e) {
      e.preventDefault();

      this.isLoading = true;

      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      const userDetails = {
        "email": this.email,
        "password": this.password,
        "new_password": this.newPassword,
        "confirm_password": this.confirmNewPassword,
      };

      await this.fetcher('/api/auth/password/change', REQUEST_METHOD.POST, userDetails)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.errorMessage = "";
            this.successMessage = response.data.message;
            this.login();
          }
        }).catch((error) => {
          this.isLoading = false;
          this.successMessage = "";
          this.errorMessage =
            (error.response &&
              error.response &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.catcher(error);
        });
    },
    async login() {
      this.isLoading = true;

      const user = { "email": this.email, "password": this.newPassword };

      this.$store.dispatch("auth/login", user).then(
        (response) => {
          const vm = this;
          setTimeout(() => {
            vm.$router.replace("/login");
          }, 1000);
        },
        (error) => {
          this.isLoading = false;
        },
      );
    },
  },
};
</script>
