<template>
  <CCard>
    <CCardHeader>
      <CCardTitle>{{ $t('labels.createNewUser') }}</CCardTitle>
    </CCardHeader>
    <CCardBody>
      <Loading v-model:active="isLoading" is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="firstName">{{ $t('labels.firstName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="firstName" v-model="currentUser.first_name" placeholder="John"/>
              <div class="d-flex flex-column" v-if="v$.currentUser.first_name.$dirty">
                <small class="text-danger" v-if="v$.currentUser.first_name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="lastName">{{ $t('labels.lastName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="lastName" v-model="currentUser.last_name" placeholder="Doe"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.last_name.$dirty">
                <small class="text-danger" v-if="v$.currentUser.last_name.required.$invalid">
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
              <CFormInput id="email" type="email" v-model="currentUser.email" placeholder="johndoe@mail.com"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.email.$dirty">
                <small class="text-danger" v-if="v$.currentUser.email.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.currentUser.email.email.$invalid">
                  {{ $t('labels.validations.email') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="username">{{ $t('labels.username') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="username" v-model="currentUser.username" placeholder="johndoe"/>
              <div class="d-flex flex-column" v-if="v$.currentUser.username.$dirty">
                <small class="text-danger" v-if="v$.currentUser.username.required.$invalid">
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
              <CFormInput id="password" v-model="currentUser.password" type="password" placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentUser.password.$dirty">
                <small class="text-danger" v-if="v$.currentUser.password.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="text-danger" v-if="v$.currentUser.password.minLength.$invalid">
                  {{ $tc('labels.validations.minLength', 8) }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="confirm-password">{{ $t('labels.confirmPassword') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="confirm-password" v-model="currentUser.confirm_password" type="password"
                          placeholder=""/>
              <div class="mb-2 d-flex flex-column" v-if="v$.currentUser.confirm_password.$dirty">
                <small class="text-danger" v-if="v$.currentUser.confirm_password.sameAs.$invalid">
                  {{ $t('labels.validations.sameAsPassword') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectGender') }}</CFormLabel>
            <div class="mb-3 ml-3">
              <div class="d-flex flex-row">
                <span>
                <input class="form-check-input" type="radio" id="genderMale" value="Male" v-model="currentUser.gender">
                <label for="genderMale">{{ $t('labels.male') }}</label>
              </span>
                <span class="ml-5">
                <input class="form-check-input" type="radio" id="genderFemale" value="Female"
                       v-model="currentUser.gender">
                <label for="genderFemale">{{ $t('labels.female') }}</label>
              </span>
              </div>
              <div class="d-flex flex-column" v-if="v$.currentUser.gender.$dirty">
                <small class="text-danger" v-if="v$.currentUser.gender.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="addressOne">{{ $t('labels.addressOne') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressOne" v-model="currentUser.address_one" placeholder="Line 1"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.address_one.$dirty">
                <small class="text-danger" v-if="v$.currentUser.address_one.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
            <CFormLabel for="addressTwo">{{ $t('labels.addressTwo') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressTwo" v-model="currentUser.address_two" placeholder="Line 2"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.address_two.$dirty">
                <small class="text-danger" v-if="v$.currentUser.address_two.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
    <CCardFooter>
      <CButton class="float-right" type="submit" color="primary" @click="createUser">
        {{ $t('actions.create') }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import AdminUserService from "../../../services/admin/admin.user.service";
import { REQUEST_METHOD } from "../../../utils/enums";

export default {
  name: "CreateUser",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      currentUser: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: '',
        address_one: '',
        address_two: '',
        role: 'super-admin', // Todo: Get Roles from DB
        country_id: 1, // Todo: Get countries from DB [LK]
      },
      createSuccessToast: {
        message: this.$tc('messages.userCreated'),
        type: 'success',
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
      currentUser: {
        first_name: { required },
        last_name: { required },
        email: { required, email },
        username: { required },
        password: { required, minLength: minLength(8) },
        confirm_password: {
          required,
          sameAs: sameAs(this.currentUser.password, 'confirmation'),
          minLength: minLength(8),
        },
        gender: { required },
        address_one: { required },
        address_two: { required },
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async createUser() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher(`/api/users`, REQUEST_METHOD.POST, this.currentUser)
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.createSuccessToast);
          this.$router.push('/users');
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
  },
};
</script>
