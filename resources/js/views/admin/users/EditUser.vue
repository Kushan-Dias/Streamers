<template>
  <CCard>
    <CCardHeader>
      <CCardTitle>{{ $t('labels.editUser') }}</CCardTitle>
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
                  First name field is required
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
              <CFormInput id="email" type="email" v-model="currentUser.email" placeholder="johndoe@mail.com"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.email.$dirty">
                <small class="text-danger" v-if="v$.currentUser.email.required.$invalid">
                  Email field is required
                </small>
                <small class="text-danger" v-if="v$.currentUser.email.email.$invalid">
                  Must be a valid email
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="status">{{ $t('labels.selectGender') }}</CFormLabel>
            <div class="mb-3 ml-3 d-flex flex-row">
              <span>
                <input class="form-check-input" type="radio" id="genderMale" value="Male" v-model="currentUser.gender">
                <label for="genderMale">Male</label>
              </span>
              <span class="ml-5">
                <input class="form-check-input" type="radio" id="genderFemale" value="Female"
                       v-model="currentUser.gender">
                <label for="genderFemale">Female</label>
              </span>
              <div class="d-flex flex-column" v-if="v$.currentUser.gender.$dirty">
                <small class="text-danger" v-if="v$.currentUser.gender.required.$invalid">
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
              <CFormInput id="addressOne" v-model="currentUser.address_one" placeholder="Line 1"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.address_one.$dirty">
                <small class="text-danger" v-if="v$.currentUser.address_one.required.$invalid">
                  Address Line 1 field is required
                </small>
              </div>
            </div>
            <CFormLabel for="addressTwo">{{ $t('labels.addressTwo') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="addressTwo" v-model="currentUser.address_two" placeholder="Line 2"
              />
              <div class="d-flex flex-column" v-if="v$.currentUser.address_two.$dirty">
                <small class="text-danger" v-if="v$.currentUser.address_two.required.$invalid">
                  Address Line 2 field is required
                </small>
              </div>
            </div>
          </CCol>
          <!--          <CCol :md="6">-->
          <!--            <CRow>-->
          <!--              <CCol :md="6">-->
          <!--                <CFormLabel for="country">Country</CFormLabel>-->
          <!--                <div class="mb-3">-->
          <!--                  <CFormInput id="country" type="country" v-model="currentUser.country" placeholder=""-->
          <!--                  />-->
          <!--                  <div class="d-flex flex-column" v-if="v$.currentUser.country.$dirty">-->
          <!--                    <small class="text-danger" v-if="v$.currentUser.country.required.$invalid">-->
          <!--                      Country field is required-->
          <!--                    </small>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </CCol>-->
          <!--              <CCol :md="6">-->
          <!--                <CFormLabel for="state">State</CFormLabel>-->
          <!--                <div class="mb-3">-->
          <!--                  <CFormInput id="state" type="state" v-model="currentUser.state" placeholder=""-->
          <!--                  />-->
          <!--                  <div class="d-flex flex-column" v-if="v$.currentUser.state.$dirty">-->
          <!--                    <small class="text-danger" v-if="v$.currentUser.state.required.$invalid">-->
          <!--                      State field is required-->
          <!--                    </small>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </CCol>-->
          <!--            </CRow>-->
          <!--            <CRow>-->
          <!--              <CCol :md="6">-->
          <!--                <CFormLabel for="city">City</CFormLabel>-->
          <!--                <div class="mb-3">-->
          <!--                  <CFormInput id="city" type="city" v-model="currentUser.city" placeholder=""-->
          <!--                  />-->
          <!--                  <div class="d-flex flex-column" v-if="v$.currentUser.city.$dirty">-->
          <!--                    <small class="text-danger" v-if="v$.currentUser.city.required.$invalid">-->
          <!--                      City field is required-->
          <!--                    </small>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </CCol>-->
          <!--              <CCol :md="6">-->
          <!--                <CFormLabel for="zip">ZIP</CFormLabel>-->
          <!--                <div class="mb-3">-->
          <!--                  <CFormInput id="zip" type="zip" v-model="currentUser.zip" placeholder=""-->
          <!--                  />-->
          <!--                  <div class="d-flex flex-column" v-if="v$.currentUser.zip.$dirty">-->
          <!--                    <small class="text-danger" v-if="v$.currentUser.zip.required.$invalid">-->
          <!--                      ZIP field is required-->
          <!--                    </small>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </CCol>-->
          <!--            </CRow>-->
          <!--          </CCol>-->
        </CRow>
      </CForm>
    </CCardBody>
    <CCardFooter>
      <CButton size="sm" class="float-right" type="submit" color="primary" @click="updateUser">
        {{ $t('actions.update') }}
      </CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../../utils/enums";

export default {
  name: "EditUser",
  components: {
    Loading,
  },
  data() {
    return {
      picked: null,
      isLoading: false,
      errorMessage: "",
      countries: [],
      state: [],
      currentUser: {},
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
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      currentUser: {
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
  created() {
    this.getUser();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getUser() {
      this.isLoading = true;
      await this.fetcher(`/api/users/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.currentUser = response.data.data.user;
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

      await this.fetcher(`/api/users/${this.$route.params.id}`, REQUEST_METHOD.PUT, this.currentUser)
        .then((response) => {
          this.isLoading = false;
          this.showCreateCard = false;
          this.showToast(this.updateSuccessToast);
          this.$router.push(`/users/${this.currentUser.id}`);
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
  },
};
</script>
