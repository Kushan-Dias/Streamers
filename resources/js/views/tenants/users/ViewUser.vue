<template>
  <EditUser
    v-if="canEditUser"
    :showUpdateModal="showUpdateModal"
  />
  <CRow>
    <CCol :md="3">
      <CRow>
        <CCol>
          <CCard class="mb-3">
            <CCardBody>
              <Loading v-model:active="isLoadingUser" :is-full-page="false"/>
              <div class="profile-img mb-4 mx-auto">
                <img
                  class="profile-img rounded-circle"
                  :src="user.avatar_url ? user.avatar_url : defaultAvatarURL"
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
      </CRow>
      <CRow>
        <CCol v-if="user.login_code">
          <CCard>
            <CCardBody>
              <Loading v-model:active="isLoadingUser" :is-full-page="false"/>
              <qrcode-vue v-if="!isLoadingUser && user.login_code"
                          :value="'http://unilivin.fclcloud.com/mobileapps/' + user.tenant_id + '-' + user.login_code"
                          class="w-100" size="300" level="H"/>
              <span v-else>{{ $t('labels.loginCOdeExpired') }}</span>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
    <CCol :md="9">
      <CCard class="mb-4">
        <CCardBody class="tenant-card-body">
          <Loading v-model:active="isLoadingUser" :is-full-page="false"/>
          <CRow class="mb-3">
            <CCol>
              <h5 class="card-title mb-0">{{ $t('labels.personalDetails') }}</h5>
              <div class="small text-medium-emphasis">
              </div>
            </CCol>
            <CCol>
              <CButton
                v-if="canEditUser"
                color="primary"
                class="float-end"
                size="sm"
                @click="openModal"
              >
                <CIcon icon="cilPencil"/>
                <span> {{ $t('actions.edit') }}</span>
              </CButton>
            </CCol>
          </CRow>
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
import QrcodeVue from 'qrcode.vue';
import { REQUEST_METHOD } from "../../../utils/enums";
import { PERMISSIONS } from "../../../utils/app.permissions";

import defaultAvatar from "../../../assets/images/avatar-default.png";
import EditUser from "./EditUser";
import { EMITTERS } from "../../../utils/constants";

export default {
  name: "ViewUser",
  components: {
    EditUser,
    Loading,
    QrcodeVue,
  },
  data() {
    return {
      isLoadingUser: false,
      defaultAvatarURL: defaultAvatar,
      user: {},
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error',
      },
      notFoundToast: {
        message: this.$t('messages.noUserFound'),
        type: 'error',
      },
      showUpdateModal: false,
    };
  },
  created() {
    if (this.canViewUser) {
      this.getUser();
    } else {
      this.showToast(this.noPermissionsToast);
      this.$router.push('/users');
    }

    this.emitter.on(EMITTERS.CLOSE_MODAL, (reload) => {
      this.onClose();
      if (reload) {
        this.getUser();
      }
    });
  },
  computed: {
    canViewUser() {
      return this.hasValidAccess(PERMISSIONS.VIEW_USER);
    },
    canEditUser() {
      return this.hasValidAccess(PERMISSIONS.EDIT_USER);
    },
    userCreatedAt() {
      return moment(this.user.created_at).format("MMMM Do YYYY");
    },
    jwtPayload() {
      return this.$store.state.auth.jwtPayload;
    }
  },
  inject: ['fetcher', 'catcher', 'showToast', 'hasValidAccess'],
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

          if (error.response.status === 404) {
            this.showToast(this.notFoundToast);
            this.$router.push('/users');
            return;
          }

          this.catcher(error);
        });
    },
    openModal() {
      this.showUpdateModal = true;
    },
    onClose() {
      this.showUpdateModal = false;
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
