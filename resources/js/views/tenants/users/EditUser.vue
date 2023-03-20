<template>
  <CModal
    size="lg"
    backdrop="static"
    :visible="showUpdateModal"
    @close="closeModal"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('labels.editUser') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="firstName">{{ $t('labels.firstName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="firstName" v-model="user.first_name" placeholder="John"/>
              <div class="d-flex flex-column" v-if="v$.user.first_name.$dirty">
                <small class="text-danger" v-if="v$.user.first_name.required.$invalid">
                  First name field is required
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="lastName">{{ $t('labels.lastName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="lastName" v-model="user.last_name" placeholder="Doe"
              />
              <div class="d-flex flex-column" v-if="v$.user.last_name.$dirty">
                <small class="text-danger" v-if="v$.user.last_name.required.$invalid">
                  Last name field is required
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="email">{{ $t('labels.email') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="email" type="email" v-model="user.email" placeholder="johndoe@mail.com" disabled/>
              <div class="d-flex flex-column" v-if="v$.user.email.$dirty">
                <small class="text-danger" v-if="v$.user.email.required.$invalid">
                  Email field is required
                </small>
                <small class="text-danger" v-if="v$.user.email.email.$invalid">
                  Must be a valid email
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectGender') }}</CFormLabel>
            <div class="mb-3 ml-3 d-flex flex-row">
              <span>
                <input class="form-check-input" type="radio" id="genderMale" value="Male" v-model="user.gender">
                <label for="genderMale">Male</label>
              </span>
              <span class="ml-5">
                <input class="form-check-input" type="radio" id="genderFemale" value="Female"
                       v-model="user.gender">
                <label for="genderFemale">Female</label>
              </span>
              <div class="d-flex flex-column" v-if="v$.user.gender.$dirty">
                <small class="text-danger" v-if="v$.user.gender.required.$invalid">
                  Gender field is required
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="6">
            <CFormLabel for="addressOne">{{ $t('labels.addressOne') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressOne" v-model="user.address_one" placeholder="Line 1"
              />
              <div class="d-flex flex-column" v-if="v$.user.address_one.$dirty">
                <small class="text-danger" v-if="v$.user.address_one.required.$invalid">
                  Address Line 1 field is required
                </small>
              </div>
            </div>
            <CFormLabel for="addressTwo">{{ $t('labels.addressTwo') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressTwo" v-model="user.address_two" placeholder="Line 2"
              />
              <div class="d-flex flex-column" v-if="v$.user.address_two.$dirty">
                <small class="text-danger" v-if="v$.user.address_two.required.$invalid">
                  Address Line 2 field is required
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="avatar">{{ $t('labels.avatar') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="avatar"
                          type="file"
                          @change="onFileChange"
                          accept="image/*"
                          placeholder="Choose a file"/>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ user }}</textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton size="sm" color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton size="sm" class="float-right" type="submit" color="primary" @click="updateUser">
        {{ $t('actions.update') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

import Loading from "vue-loading-overlay";

import { REQUEST_METHOD } from "../../../utils/enums";
import { EMITTERS } from "../../../utils/constants";

export default {
  name: "EditUser",
  components: {
    Loading,
  },
  props: {
    showUpdateModal: {
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
      user: {
        first_name: { required },
        last_name: { required },
        email: { required, email },
        gender: { required },
        address_one: { required },
        address_two: { required },
        // country: { required },
        // state: { required },
        // city: { required },
        // zip: { required },
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
      countries: [],
      state: [],
      user: {},
      userDefaults: {},
      updateSuccessToast: {
        message: this.$t('messages.userUpdated'),
        type: "success",
        duration: 10000,
        dismissible: true,
        queue: false,
        position: "top-right",
      },
    };
  },
  created() {
    this.getUser();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getUser() {
      this.isLoading = true;
      await this.fetcher(`/api/users/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.user = response.data.data.user;
          this.userDefaults = Object.assign({}, this.user);
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async updateUser() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/users/${this.$route.params.id}`, REQUEST_METHOD.PUT, this.user)
        .then((response) => {
          this.isLoading = false;
          this.showCreateCard = false;
          this.showToast(this.updateSuccessToast);
          this.closeModal(true);
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.user.avatar = file;
      console.log(file);
    },
    resetForm() {
      this.user = this.userDefaults;
      this.v$.$reset();
    },
    closeModal(e, reload = false) {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, reload);
    },
  },
};
</script>
