<template>
  <CRow>
    <!--Profile Card-->
    <CCol :md="3">
      <CCard class="mb-4">
        <CCardBody>
          <Loading v-model:active="isLoadingUser" :is-full-page="false"/>
          <div class="profile-img mb-4 mx-auto">
            <img
              class="profile-img rounded-circle"
              :src="user.avatar_url != null ? user.avatar_url : defaultAvatarURL"
              :alt="user.first_name"
            />
          </div>
          <h5 class="text-center">{{ user.first_name }} {{ user.last_name }}</h5>
          <div class="text-center text-medium-emphasis mb-2">{{ user.email }}</div>
          <div class="text-center">
            <CBadge color="primary" v-for="role in user.roles">{{ role.title }}</CBadge>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <!--Details Card-->
    <CCol :md="9">
      <CCard class="mb-4">
        <CCardHeader>
          <!-- Details Placeholder -->
          <CRow v-if="isLoadingUser">
            <CCol :sm="5">
              <h4>
                <CPlaceholder :xs="4" size="sm"/>
              </h4>
              <CPlaceholder :xs="6" size="xs"/>
            </CCol>
          </CRow>
          <CRow v-if="user && !isLoadingUser">
            <CCol>
              <h5 class="card-title mb-0">{{ $t('labels.personalDetails') }}</h5>
              <div class="small text-medium-emphasis">

              </div>
            </CCol>
            <CCol>
              <CButton
                color="primary"
                class="float-end"
                size="sm"
                @click="() => {this.$router.push(`/users/${user.id}/edit`)}"
              >
                <CIcon icon="cilPencil"/>
                <span> {{ $t('actions.edit') }}</span>
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody class="tenant-card-body">
          <Loading v-model:active="isLoadingUser" :is-full-page="false"/>
          <div class="card">
            <div class="card-body">
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.fullName') }}</h6>
                </CCol>
                <CCol :sm="9">
                  {{ user.first_name }} {{ user.last_name }}
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.email') }}</h6>
                </CCol>
                <CCol :sm="9">
                  {{ user.email }}
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.gender') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.gender">{{ user.gender }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.mobile') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.mobile">{{ user.mobile }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.address') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.address_one || user.address_two">{{ user.address_one }} {{ user.address_two }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.country') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.country">{{ user.country }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.state') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.state">{{ user.state }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.city') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.city">{{ user.city }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
              <hr>
              <CRow>
                <CCol :sm="3">
                  <h6 class="mb-0">{{ $t('labels.zip') }}</h6>
                </CCol>
                <CCol :sm="9">
                  <span v-if="user.zip">{{ user.zip }}</span>
                  <span v-else class="text-secondary">{{ $t('labels.notSpecified') }}</span>
                </CCol>
              </CRow>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../../utils/enums";

export default {
  name: "ViewUser",
  components: {
    Loading,
  },
  data() {
    return {
      isLoadingUser: false,
      fullPage: true,
      defaultAvatarURL:
        "https://st4.depositphotos.com/1156795/20814/v/380/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg?forcejpeg=true",
      user: {},
    };
  },
  inject: ['fetcher', 'catcher'],
  created() {
    this.getUser();
  },
  computed: {
    userCreatedAt() {
      return moment(this.user.created_at).format("MMMM Do YYYY");
    },
  },
  methods: {
    async getUser() {
      this.isLoadingUser = true;

      await this.fetcher(`/api/users/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.user = response.data.data.user;
          this.isLoadingUser = false;
        })
        .catch((error) => {
          this.isLoadingUser = false;
          this.catcher(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-img {
  width: 150px;
  height: 150px;

  img {
    object-fit: cover;
  }
}
</style>
