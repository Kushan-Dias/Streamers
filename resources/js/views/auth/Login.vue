<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <Loading v-model:active="isLoading"/>
            <CCard class="p-4">
              <CAlert v-if="errorMessage" color="danger">
                {{ errorMessage }}
                <CAlertLink v-if="errorAction" :href="errorAction">Click here</CAlertLink>
              </CAlert>
              <div class="form-group">
              </div>
              <CCardBody>
                <CForm @submit="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user"/>
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      placeholder="Email"
                      name="email"
                      autocomplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked"/>
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" id="btn12"> Login</CButton>
                    </CCol>
                    <!--                    <CCol :xs="6" class="text-right">-->
                    <!--                      <CButton color="link" class="px-0">-->
                    <!--                        Forgot password?-->
                    <!--                      </CButton>-->
                    <!--                    </CCol>-->
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
import { email, minLength, required } from '@vuelidate/validators';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Login',
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
      errorAction: "",
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();

      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;
      const user = { "email": this.email, "password": this.password };

      this.$store.dispatch("auth/login", user).then(
        (response) => {
          this.isLoading = false;
          this.$toast.clear();
          this.$router.push('/dashboard');//changed by kushan 
        },
        (error) => {
          this.isLoading = false;
          this.successMessage = "";
          this.errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if (error.response.data.data.reason === 'must-change-password') {
            this.errorAction = '/user/change-password';
          } else if (error.response.data.data.reason === 'email-not-verified') {
            this.errorAction = '/user/verify-email';
          } else {
            this.errorAction = "";
          }
        },
      );
    },
  },
};
</script>
