<template>
  <CModal
    :visible="showStatusUpdateModal"
    @close="() => {this.showStatusUpdateModal = false}"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('labels.changeStatus') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoadingTenant" :is-full-page="false"/>
      <CFormLabel for="status">{{ $t('labels.selectStatus') }}</CFormLabel>
      <div class="mb-3">
        <CFormSelect id="status" v-model="newStatus">
          <option
            v-for="status in ['ACTIVE', 'INACTIVE', 'RESTRICTED']"
            :value="status"
            :key="status"
          >
            {{ status }}
          </option>
        </CFormSelect>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="light"
        @click="() => {this.showStatusUpdateModal = false}"
      >
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton color="primary" @click="updateTenantStatus">{{ $t('actions.update') }}</CButton>
    </CModalFooter>
  </CModal>
  <CRow class="mb-3">
    <CCol>
      <CCard>
        <CCardBody>
          <Loading v-model:active="isLoadingTenant" :is-full-page="false"/>
          <CRow class="mb-3">
            <CCol :sm="8">
              <h4 class="card-title mb-0">{{ $t('labels.tenantOverview') }}</h4>
            </CCol>
            <CCol :sm="4" class="d-block">
              <div class="d-flex align-items-stretch float-end">
                <CBadge
                  :color="tenant.status === 'ACTIVE' ? 'success' : 'danger'"
                  class="d-flex align-items-center"
                  @click="() => {this.showStatusUpdateModal = !showStatusUpdateModal}"
                >
                  <h6 class="mb-0">{{ tenant.status }}</h6>
                </CBadge>
                <CDropdown class="ms-2" color="light" variant="btn-group">
                  <CDropdownToggle color="light" :caret="false" size="sm">
                    <CIcon icon="cilOptions"/>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem class="small" @click="() => {this.$router.push(`/tenants/${tenant.id}/edit`)}">
                      {{ $t('actions.edit') }}
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            </CCol>
          </CRow>
          <CRow class="g-3">
            <CCol :md="9">
              <h6 class="mb-2">{{ tenant.name }}</h6>
              <div class="d-flex justify-content-start mb-2">
                <CBadge class="me-4" color="primary">
                  <a :href="windowLocationProtocol + '//' + tenant.id + '.' + windowLocationHost"
                     class="text-white text-decoration-none" target="_blank">
                    <span class="me-2">{{ windowLocationProtocol }}//{{ tenant.id }}.{{ windowLocationHost }}</span>
                    <i class="cil-external-link"></i>
                  </a>
                </CBadge>
                <CBadge class="d-flex align-items-center me-4" color="info">
                  {{ tenant.plan }}
                </CBadge>
              </div>
              <small class="text-secondary">{{ $tc('labels.createdAt', { dateTime: tenantCreatedAt }) }}</small>
              <div class="mt-3">
                <small class="text-secondary fw-bold">ADMIN</small>
                <div class="d-flex align-items-center mt-3">
                  <CAvatar :src="defaultAvatar" size="md"/>
                  <div class="d-flex flex-column justify-content-start ms-2">
                    <h6 class="mb-0">
                      Bruce Wayne
                    </h6>
                    <small class="text-secondary">
                      bruce@gmail.com
                    </small>
                  </div>
                </div>
                <div class="d-flex align-items-center mt-3">
                  <CAvatar :src="defaultAvatar" size="md"/>
                  <div class="d-flex flex-column justify-content-start ms-2">
                    <h6 class="mb-0">
                      John Doe
                    </h6>
                    <small class="text-secondary">
                      johndoe@gmail.com
                    </small>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol>
              <CRow class="g-3">
                <CCol :md="12">
                  <CCard color="primary" text-color="white">
                    <CCardBody>
                      <div class="d-flex justify-content-between">
                        <h3 class="mb-1">124</h3>
                        <CIcon icon="cilOptions"/>
                      </div>
                      <small>Users</small>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol :md="12">
                  <CCard color="warning" text-color="white">
                    <CCardBody>
                      <div class="d-flex justify-content-between">
                        <h3 class="mb-1">$12,468</h3>
                        <CIcon icon="cilOptions"/>
                      </div>
                      <small>Revenue</small>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol :md="12">
                  <CCard color="danger" text-color="white">
                    <CCardBody>
                      <div class="d-flex justify-content-between">
                        <h3 class="mb-0 me-2">163MB</h3>
                        <CIcon icon="cilOptions"/>
                      </div>
                      <div>
                        <small>Storage</small>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol>

            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow class="mb-3">
    <CCol>
      <CCard class="modules-card">
        <CCardHeader>
          <CRow v-if="tenant && !isLoadingModules">
            <CCol :sm="8">
              <h5 class="card-title mb-0">{{ $t('labels.availableModules') }}</h5>
              <div class="small text-medium-emphasis">
                <span>{{ $t('labels.totalCount') }}: {{ modules.length }}</span>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody class="modules-card">
          <Loading v-model:active="isLoadingModules" :is-full-page="false"/>
          <CAccordion>
            <CAccordionItem v-for="module in modules" :key="module">
              <CAccordionHeader class="">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <strong>{{ module.name }}</strong>
                  <CBadge
                    class="ms-3 me-4"
                    :color="isModuleActive(module.name) ? 'success' : 'secondary'">
                    {{
                      isModuleActive(module.name) ? $t('status.active').toUpperCase() : $t('status.inactive').toUpperCase()
                    }}
                  </CBadge>
                </div>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormSwitch
                  :id="module"
                  class="btn"
                  size="lg"
                  :label="$t('labels.setModuleActive')"
                  :model-value="isModuleActive(module.name)"
                  @change="setModuleUpdateFields($event, module.name)"
                />
                <p class="mb-0">
                  {{ module.description }}
                </p>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            class="float-end"
            size="sm"
            :disabled="moduleUpdateData.modules.length === 0"
            @click="addUpdateTenantModules"
          >
            <small> {{ $t('labels.saveChanges') }}</small>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
  <CRow class="mb-3">
    <CCol :md="6">
      <CCard class="oneflow-card">
        <CCardHeader>
          <CRow>
            <CCol :md="8">
              <h5 class="card-title mb-0">{{ $t('labels.oneFlowAccount') }}</h5>
            </CCol>
            <CCol :md="4" class="d-flex justify-content-end">
              <CButtonGroup role="group">
                <CTooltip :content="$t('actions.view')" placement="top">
                  <template #toggler="{ on }">
                    <CButton v-on="on"
                             @click="this.$router.push('/tenants/oneflow-accounts')"
                             color="primary" size="sm">
                      <CIcon icon="cilBlur" size="sm"/>
                    </CButton>
                  </template>
                </CTooltip>
              </CButtonGroup>
              <CDropdown class="ms-2" color="light" variant="btn-group">
                <CDropdownToggle color="light" :caret="false" size="sm">
                  <CIcon icon="cilOptions"/>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem class="small">
                    {{ $t('actions.edit') }}
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <Loading v-model:active="isLoadingTenant" :is-full-page="false"/>
        <CCardBody v-if="oneFlowAccount">
          <CRow>
            <CCol>
              <CRow>
                <CCol :md="9" class="mb-2">
                  <small class="title text-secondary">{{ $t('labels.accountFirstNameLastName').toUpperCase() }}</small>
                  <h6>{{ oneFlowAccount.name }}</h6>
                </CCol>
                <CCol :md="3">
                  <CBadge class="float-end" :color="oneFlowAccount.status === 'ACTIVE' ? 'success' : 'danger'">
                    <h6 class="mb-0">{{ oneFlowAccount.status }}</h6>
                  </CBadge>
                </CCol>
                <CCol :md="12" class="mb-2">
                  <small class="title text-secondary">{{ $t('labels.organizerTitle').toUpperCase() }}</small>
                  <h6>{{ oneFlowAccount.title }}</h6>
                </CCol>
                <CCol :md="6" class="mb-2">
                  <small class="title text-secondary">{{ $t('labels.email').toUpperCase() }}</small>
                  <h6>{{ oneFlowAccount.email }}</h6>
                </CCol>
                <CCol :md="6" class="mb-2">
                  <small class="title text-secondary">{{ $t('labels.mobile').toUpperCase() }}</small>
                  <div class="d-flex align-items-center">
                    <CIcon v-if="oneFlowAccount.country_code"
                           class="mb-2" :icon="'cif-'+oneFlowAccount.country_code.toLowerCase()" size="xl"
                    />
                    <h6 class="ms-2">{{ oneFlowAccount.mobile }}</h6>
                  </div>
                </CCol>
                <CCol :md="12" class="mb-2">
                  <small class="title text-secondary">{{ $t('labels.token').toUpperCase() }}</small>
                  <h6 v-if="oneFlowAccount.token">****{{ oneFlowAccount.token.substr(-4) }}</h6>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardBody v-if="!oneFlowAccount && !isLoadingTenant"
                   class="d-flex flex-column align-items-center justify-content-center p-5"
        >
          <h5 class="text-secondary text-center mb-3">{{ $tc('messages.noOneFlowFor', { name: tenant.name }) }}</h5>
          <CButtonGroup role="group">
            <CTooltip :content="$t('actions.add')" placement="top">
              <template #toggler="{ on }">
                <CButton v-on="on"
                         @click="()=> { this.$router.push('/tenants/oneflow-accounts') }"
                         color="primary" size="sm">
                  <span>{{ $t('actions.addAccount') }}</span>
                </CButton>
              </template>
            </CTooltip>
          </CButtonGroup>
        </CCardBody>
      </CCard>
    </CCol>
    <ContractTemplates v-if="!isLoadingTenant && oneFlowAccount !== null && tenant.id !== null" :tenantId="tenant.id"/>
  </CRow>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import ContractTemplates from "../contracts/ContractTemplates";
import { REQUEST_METHOD } from "../../utils/enums";

import defaultAvatar from "../../assets/images/avatar-default.png";

export default {
  name: "ViewTenant",
  components: {
    ContractTemplates,
    Loading,
  },
  data() {
    return {
      isLoadingTenant: false,
      isLoadingModules: false,
      defaultAvatar: defaultAvatar,
      fullPage: true,
      tenant: {},
      oneFlowAccount: null,
      modules: [],
      tenantModules: [],
      moduleUpdateData: {
        modules: [],
      },
      newStatus: "",
      statusUpdateSuccessToast: {
        message: this.$t('messages.tenantStatusUpdated'),
        type: "success",
      },
      modulesUpdateSuccessToast: {
        message: this.$t('messages.tenantModulesUpdated'),
        type: "success",
      },
      showNotFoundToast: {
        message: 'Tenant not found',
        type: 'error',
        duration: 3000
      },
      showStatusUpdateModal: false,
    };
  },
  created() {
    this.getTenant();
    this.getAllModules();
    this.getTenantModules();
  },
  computed: {
    windowLocationProtocol() {
      return window.location.protocol;
    },
    windowLocationHost() {
      return window.location.host;
    },
    tenantCreatedAt() {
      return moment(this.tenant.created_at).format("MMMM Do YYYY");
    },
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getTenant() {
      this.isLoadingTenant = true;

      await this.fetcher(`/api/tenants/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.tenant = response.data.data.tenant;
          this.oneFlowAccount = this.tenant.one_flow_account;
          this.isLoadingTenant = false;
        })
        .catch((error) => {

          if (error.response.data.status === 404) {
            this.$router.push('/tenants');
            this.showToast(this.showNotFoundToast);
          } else {
            this.isLoadingMaintenance = false;
            this.catcher(error);
          }

        });
    },
    async updateTenantStatus() {
      this.isLoadingTenant = true;
      const updateData = {
        id: this.$route.params.id,
        status: this.newStatus,
      };

      await this.fetcher(`/api/tenants/${this.$route.params.id}`, REQUEST_METHOD.PUT, updateData)
        .then((response) => {
          this.tenant = response.data.data.tenant;
          this.isLoadingTenant = false;
          this.showStatusUpdateModal = false;
          this.showToast(this.statusUpdateSuccessToast);
          this.$router.push(`/tenants/${this.$route.params.id}`);
        })
        .catch((error) => {
          this.isLoadingTenant = false;
          this.catcher(error);
        });
    },
    async getAllModules() {
      this.isLoadingModules = true;

      await this.fetcher(`/api/modules`, REQUEST_METHOD.GET)
        .then((response) => {
          this.modules = response.data.data.modules;
          this.isLoadingModules = false;
        })
        .catch((error) => {
          this.isLoadingModules = false;
          this.catcher(error);
        });
    },
    async getTenantModules() {
      this.isLoadingModules = true;

      await this.fetcher(`/api/modules/tenant/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.tenantModules = response.data.data.modules;
          this.moduleUpdateData.modules = [];
          this.isLoadingModules = false;
        })
        .catch((error) => {
          this.isLoadingModules = false;
          this.catcher(error);
        });
    },
    async addUpdateTenantModules() {
      this.isLoadingModules = true;

      await this.fetcher(`/api/modules/tenant/${this.$route.params.id}`, REQUEST_METHOD.POST, this.moduleUpdateData)
        .then((response) => {
          this.tenantModules = response.data.data.modules;
          this.isLoadingModules = false;
          this.showToast(this.modulesUpdateSuccessToast);
          this.getTenantModules();
        })
        .catch((error) => {
          this.isLoadingModules = false;
          this.catcher(error);
        });
    },
    isModuleActive(name) {
      return this.tenantModules.some(m => (m.name === name && m.status === 'ACTIVE'));
    },
    setModuleUpdateFields(e, name) {
      let data = {
        "name": name,
        "status": e.target.checked ? 'ACTIVE' : 'INACTIVE',
      };

      this.moduleUpdateData.modules = this.moduleUpdateData.modules.filter((updateData) => {
        return updateData.name !== data.name;
      });

      this.moduleUpdateData.modules.push(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.modules-card {
  max-height: 800px;
  overflow-y: auto;
}

.oneflow-card {
  height: 338px;
  overflow-y: auto;

  .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>
