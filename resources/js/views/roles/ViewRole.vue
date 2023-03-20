<template>
  <CRow>
    <!--Details Card-->
    <CCol>
      <CCard class="mb-4">
        <CCardBody class="tenant-card-body">
          <Loading v-model:active="isLoadingRole" :is-full-page="false"/>
          <!-- Details Placeholder -->
          <CRow v-if="isLoadingRole" class="mb-3">
            <CCol :sm="5">
              <h4>
                <CPlaceholder :xs="4" size="sm"/>
              </h4>
              <CPlaceholder :xs="6" size="xs"/>
            </CCol>
          </CRow>
          <CRow v-if="role && !isLoadingRole" class="mb-3">
            <CCol>
              <h5 class="card-title mb-0">{{ role.title }}</h5>
              <div class="small text-medium-emphasis">
                {{ $tc('labels.permission', 2) }}: {{ permissions.length }}
              </div>
            </CCol>
          </CRow>
          <CCard v-if="permissions.length !==0">
            <CCardBody class="card-body">
              <div v-for="(permission, index) in permissions">
                <CRow>
                  <CCol>
                    <h6 class="mb-0">{{ permission.title }}</h6>
                  </CCol>
                </CRow>
                <hr v-if="index !== permissions.length - 1">
              </div>
            </CCardBody>
          </CCard>
          <CAlert v-else color="danger">
            {{ $tc('labels.noPermissionsFor', { role: role.title }) }}
          </CAlert>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: "ViewRole",
  components: {
    Loading,
  },
  data() {
    return {
      isLoadingRole: false,
      fullPage: true,
      role: {},
      permissions: [],
    };
  },
  created() {
    this.getRole();
  },
  computed: {
    roleCreatedAt() {
      return moment(this.role.created_at).format("MMMM Do YYYY");
    },
  },
  inject: ['fetcher', 'catcher'],
  methods: {
    async getRole() {
      this.isLoadingRole = true;

      await this.fetcher(`/api/roles/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.role = response.data.data.role[0];
          this.permissions = this.role.permissions;
          this.isLoadingRole = false;
        })
        .catch((error) => {
          this.isLoadingRole = false;
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
