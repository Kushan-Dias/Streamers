<template>
  <CreateRole
    v-if="canCreateRole"
    :showCreateUpdateModal="showCreateUpdateRoleModal"
    :isUpdating="isUpdating"
    :currentRole="currentRole"
  />
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.role', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
                v-if="canCreateRole"
                size="sm"
                color="primary"
                class="float-end"
                @click="openModal(false, null)"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.create') }}</span>
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol :md="12">
              <TablePlaceholder v-if="isLoading"/>
              <CTable
                v-if="!isLoading && roles.length > 0"
                align="middle"
                class="mb-0 border"
                hover
                responsive
              >
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell class="text-center">#</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.title') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center">{{ $tc('labels.permission', 2) }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center">{{ $tc('actions.create', 2) }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center">{{ $tc('labels.action', 2) }}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="role in roles" :key="role.name">
                    <CTableDataCell class="text-center align-middle">
                      <div>{{ roles.indexOf(role) + 1 }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="text-left align-middle">
                      <div>{{ role.first_name }} {{ role.title }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="text-center align-middle">
                      <div>{{ role.permissions.length }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="text-center align-middle">
                      <div>{{ createdAt(role.created_at) }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="text-center align-middle">
                      <CButtonGroup role="group">
                        <CTooltip :content="$t('actions.view')" placement="top">
                          <template #toggler="{ on }">
                            <CButton
                              v-on="on"
                              @click="() => {this.$router.push(`/roles/${role.id}`)}"
                              color="primary"
                              size="sm"
                            >
                              <CIcon icon="cilBlur" size="sm"/>
                            </CButton>
                          </template>
                        </CTooltip>
                        <CTooltip :content="$t('actions.edit')" placement="top">
                          <template #toggler="{ on }">
                            <CButton
                              v-on="on"
                              @click="openModal(true, role)"
                              color="warning"
                              size="sm"
                            >
                              <CIcon icon="cilPencil" size="sm"/>
                            </CButton>
                          </template>
                        </CTooltip>
                        <CTooltip :content="$t('actions.delete')" placement="top">
                          <template #toggler="{ on }">
                            <CButton
                              v-on="on"
                              @click="handleDeleteRole(role)"
                              color="danger"
                              size="sm"
                            >
                              <CIcon icon="cilTrash" size="sm"/>
                            </CButton>
                          </template>
                        </CTooltip>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <CAlert v-if="!isLoading && roles.length === 0" color="danger">{{ $t('labels.noRolesFound') }}</CAlert>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import { REQUEST_METHOD } from "../../utils/enums";
import { PERMISSIONS } from "../../utils/app.permissions";
import { EMITTERS } from "../../utils/constants";
import CreateRole from "./CreateRole";

export default {
  name: "Roles",
  components: {
    CreateRole,
    Loading,
  },
  computed: {
    canCreateRole() {
      return this.hasValidAccess(PERMISSIONS.CREATE_ROLE);
    },
    canViewRole() {
      return this.hasValidAccess(PERMISSIONS.VIEW_ROLE);
    },
    canEditRole() {
      return this.hasValidAccess(PERMISSIONS.EDIT_ROLE);
    },
    canDeleteRole() {
      return this.hasValidAccess(PERMISSIONS.DELETE_ROLE);
    },
  },
  data() {
    return {
      isLoading: false,
      isUpdating: false,
      errorMessage: "",
      roles: [],
      currentRole: {},
      deleteRoleToast: {
        message: this.$t('messages.roleDeleted'),
        type: "success",
      },
      showCreateUpdateRoleModal: false,
    };
  },
  created() {
    this.getAllRoles();

    this.emitter.on(EMITTERS.GET_DATA, () => {
      this.getAllRoles();
    });

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.onClose();
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert', 'hasValidAccess'],
  methods: {
    async getAllRoles() {
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
    handleDeleteRole(role) {
      const vm = this;
      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$tc('messages.deleteSystemConfirmation', { arg: role.title }),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yes'),
        cancelButtonText: vm.$t('actions.no')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await vm.deleteRole(role);
        }
      });
    },
    async deleteRole(currentRole) {
      this.isLoading = true;
      await this.fetcher(`/api/roles/${currentRole.id}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.deleteRoleToast);
          this.getAllRoles();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    createdAt(created_at) {
      return moment(created_at).format("MMMM Do YYYY");
    },
    openModal(isUpdating = false, role = null) {
      if (isUpdating) {
        this.isUpdating = true;
        this.currentRole = role;
      } else {
        this.isUpdating = false;
        this.currentRole = {};
      }
      this.showCreateUpdateRoleModal = true;
    },
    onClose() {
      this.showCreateUpdateRoleModal = false;
    },
  },
};
</script>
