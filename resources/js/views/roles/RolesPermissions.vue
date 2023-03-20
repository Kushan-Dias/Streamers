<template>
  <CreateRole
    v-if="canCreateRole"
    :showCreateUpdateModal="showCreateRoleModal"
  />
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="7">
              <h4 class="card-title mb-0">{{ $t('labels.system') }}</h4>
            </CCol>
            <CCol :sm="5" class="d-none d-md-block">
              <CButton
                size="sm"
                color="primary"
                class="ml-2 float-end"
                @click="openModal"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('labels.createRole') }}</span>
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <TablePlaceholder v-if="isLoading" :showActions="false"/>
              <CTable
                v-if="!isLoading && roles && permissions"
                align="middle"
                class="mb-0 border"
                hover
                responsive
              >
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell class="text-left">{{ $tc('labels.permission', 2) }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center" v-for="role in roles" :key="role.id">
                      {{ role.title }}
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="permission in permissions" :key="permission.id">
                    <CTableDataCell class="text-left" cols='3'>{{ permission.title }}</CTableDataCell>
                    <CTableDataCell class="text-center" v-for="role in roles" :key="role.name">
                      <input class="form-check-input" type="checkbox" :id="role.name"
                             :checked.sync="role.permissions.some(p => p.id === permission.id)"
                             @change="(e) => { setRolesPermissions(e.target.checked, role.name, permission.name) }"
                      />
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <CAlert v-if="!isLoading && roles.length === 0" color="danger">
                {{ $t('labels.noRolesFound') }}
              </CAlert>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton
            size="sm"
            color="primary"
            class="ml-2 float-end"
            @click="syncRolesPermissions"
          >
            <span>{{ $t('actions.save') }}</span>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { REQUEST_METHOD } from "../../utils/enums";
import CreateRole from "./CreateRole";
import { PERMISSIONS } from "../../utils/app.permissions";
import { EMITTERS } from "../../utils/constants";

export default {
  name: "RolesPermissions",
  components: {
    CreateRole,
  },
  computed: {
    canCreateRole() {
      return this.hasValidAccess(PERMISSIONS.CREATE_ROLE);
    },
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      currentRole: {
        name: '',
        title: '',
        permissions: [],
      },
      roles: [],
      permissions: [],
      roles_permissions: {},
      roleCreateSuccessToast: {
        message: this.$t('messages.roleCreated'),
        type: 'success',
      },
      permissionAssignSuccessToast: {
        message: this.$t('messages.permissionsAssigned'),
        type: 'success',
      },
      showCreateRoleModal: false,
    };
  },
  created() {
    this.getRolePermissionData();

    this.emitter.on(EMITTERS.GET_DATA, () => {
      this.getRolePermissionData();
    });

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.onClose();
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'hasValidAccess'],
  methods: {
    getRolePermissionData() {
      this.getAllRoles();
      this.getAllPermissions();
    },
    async getAllRoles() {
      this.isLoading = true;
      await this.fetcher(`/api/roles`, REQUEST_METHOD.GET)
        .then((response) => {
          this.roles = response.data.data.roles;
          this.roles.forEach(role => {
            role.permissions.forEach(permission => {
              this.setRolesPermissions(true, role.name, permission.name);
            });
          });
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async getAllPermissions() {
      this.isLoading = true;
      await this.fetcher(`/api/permissions`, REQUEST_METHOD.GET)
        .then((response) => {
          this.permissions = response.data.data.permissions;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async syncRolesPermissions() {
      this.isLoading = true;
      await this.fetcher(`/api/roles/sync`, REQUEST_METHOD.POST, { "roles_permissions": this.roles_permissions })
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.permissionAssignSuccessToast);
          this.getAllRoles();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    setRolesPermissions(checked, roleName, permissionName) {
      if (checked) {
        if (this.roles_permissions[roleName]) {
          this.roles_permissions[roleName].push(permissionName);
        } else {
          this.roles_permissions[roleName] = [permissionName];
        }
      } else {
        if (this.roles_permissions[roleName]) {
          this.roles_permissions[roleName] = this.roles_permissions[roleName].filter(
            (item) => {
              return item !== permissionName;
            }
          );
          if (this.roles_permissions[roleName].length === 0) {
            this.roles_permissions[roleName] = [];
          }
        }
      }
    },
    openModal() {
      this.showCreateRoleModal = true;
    },
    onClose() {
      this.showCreateRoleModal = false;
    },
  },
};
</script>
