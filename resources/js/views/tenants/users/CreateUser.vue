<template>
  <CModal
    backdrop="static"
    :visible="showCreateModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.createNewUser') }}</CCardTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="firstName">{{ $t('labels.firstName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="firstName" v-model="user.first_name" placeholder="John"/>
              <div class="d-flex flex-column" v-if="v$.user.first_name.$dirty">
                <small class="text-danger" v-if="v$.user.first_name.required.$invalid">
                  {{ $t('labels.validations.required') }}
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
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="email">{{ $t('labels.email') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="email" type="email" v-model="user.email" placeholder="johndoe@mail.com"
              />
              <div class="d-flex flex-column" v-if="v$.user.email.$dirty">
                <small class="text-danger" v-if="v$.user.email.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.user.email.email.$invalid">
                  {{ $t('labels.validations.email') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="username">{{ $t('labels.username') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="username" v-model="user.username" placeholder="johndoe"/>
              <div class="d-flex flex-column" v-if="v$.user.username.$dirty">
                <small class="text-danger" v-if="v$.user.username.required.$invalid">
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
              <CFormInput id="password" v-model="user.password" type="password" placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.user.password.$dirty">
                <small class="text-danger" v-if="v$.user.password.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.user.password.minLength.$invalid">
                  {{ $tc('labels.validations.minLength', 8) }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="confirm-password">{{ $t('labels.confirmPassword') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="confirm-password" v-model="user.confirm_password" type="password"
                          placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.user.confirm_password.$dirty">
                <small class="text-danger" v-if="v$.user.confirm_password.sameAs.$invalid">
                  {{ $t('labels.validations.sameAsPassword') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectGender') }}</CFormLabel>
            <div class="mb-4 ml-3">
              <div class="d-flex flex-row">
                <span>
                <input class="form-check-input" type="radio" id="genderMale" value="Male" v-model="user.gender">
                <label for="genderMale">{{ $t('labels.male') }}</label>
              </span>
                <span class="ml-5">
                <input class="form-check-input" type="radio" id="genderFemale" value="Female"
                       v-model="user.gender">
                <label for="genderFemale">{{ $t('labels.female') }}</label>
              </span>
              </div>
              <div class="d-flex flex-column" v-if="v$.user.gender.$dirty">
                <small class="text-danger" v-if="v$.user.gender.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
            <CFormLabel for="role">{{ $t('labels.role') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="role" v-model="user.role">
                <option value="">{{ $t('labels.selectRole') }}</option>
                <option v-for="(role, index) in roles" :value="role.id" :key="index">
                  {{ role.title }}
                </option>
              </CFormSelect>
              <div class="d-flex flex-column" v-if="v$.user.role.$dirty">
                <small class="validation-error" v-if="v$.user.role.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="addressOne">{{ $t('labels.addressOne') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressOne" v-model="user.address_one" placeholder="Line 1"
              />
              <div class="d-flex flex-column" v-if="v$.user.address_one.$dirty">
                <small class="text-danger" v-if="v$.user.address_one.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
            <CFormLabel for="addressTwo">{{ $t('labels.addressTwo') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressTwo" v-model="user.address_two" placeholder="Line 2"
              />
              <div class="d-flex flex-column" v-if="v$.user.address_two.$dirty">
                <small class="text-danger" v-if="v$.user.address_two.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
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
      <CButton
        color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton color="primary" @click="createUser">
        {{ $t('actions.create') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../../utils/enums";
import { EMITTERS } from "../../../utils/constants";

export default {
  name: "CreateUser",
  components: {
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
      windowLocationProtocol: window.location.protocol,
      windowLocationHost: window.location.host,
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
      user: {
        country_id: 1, // Todo: Get countries from DB [LK]
      },
      roles: null,
      createSuccessToast: {
        message: this.$tc('messages.userCreated'),
        type: 'success',
      },
    };
  },
  validations() {
    return {
      user: {
        first_name: { required },
        last_name: { required },
        email: { required, email },
        username: { required },
        password: { required, minLength: minLength(8) },
        confirm_password: {
          required,
          sameAs: sameAs(this.user.password, 'confirmation'),
          minLength: minLength(8),
        },
        gender: { required },
        role: { required },
        address_one: { required },
        address_two: { required },
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getRoles() {
      this.isLoading = true;
      await this.fetcher(`/api/roles`, REQUEST_METHOD.GET)
        .then((response) => {
          this.roles = response.data.data.roles;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async createUser() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/users`, REQUEST_METHOD.POST, this.user)
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.createSuccessToast);
          this.emitter.emit(EMITTERS.RELOAD_DATATABLE);
          this.resetForm();
          this.closeModal();
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    resetForm() {
      this.user = {
        country_id: 1,
      };
      this.v$.$reset();
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    showCreateModal(value) {
      if (value) {
        this.getRoles();
      }
    },
  },
};
</script>
