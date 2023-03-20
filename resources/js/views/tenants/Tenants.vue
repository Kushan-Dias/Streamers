<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow class="mb-3">
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">{{ $tc('labels.tenant', 2) }}</h4>
                <div class="small text-medium-emphasis">
                  <span v-if="tenants.length > 0">{{ $t('labels.totalCount') }}: {{ this.tenants.length }}</span>
                </div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton size="sm" color="primary" class="float-end"
                         @click="()=> { this.$router.push('/tenants/create') }">
                  <CIcon icon="cilPlus"/>
                  <span> {{ $t('actions.create') }}</span>
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <TablePlaceholder v-if="isLoading"/>
                <CTable v-if="!isLoading && tenants.length > 0" align="middle" class="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>{{ $t('labels.tenantName') }}</CTableHeaderCell>
                      <CTableHeaderCell>{{ $t('labels.domain') }}</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">{{ $t('labels.plan') }}</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">OneFlow</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">{{ $t('labels.status') }}</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">{{ $t('labels.action', 2) }}</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow v-for="tenant in tenants" :key="tenant.name">
                      <CTableDataCell class="align-middle">
                        <div>{{ tenants.indexOf(tenant) + 1 }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="align-middle">
                        <div>{{ tenant.name }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="align-middle">
                        <div v-for="domain in tenant.domains" :key="domain">{{ domain.domain }}</div>
                        <div class="small text-medium-emphasis" v-for="domain in tenant.domains" :key="domain">
                          <a :href="windowLocationProtocol + '//' + domain.domain + '.' + windowLocationHost"
                             target="_blank">
                        <span>
                          {{ windowLocationProtocol }}//{{ domain.domain }}.{{ windowLocationHost }}
                        </span>
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <div>{{ tenant.plan }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <CBadge :color="tenant.one_flow_account !== null ? 'success' : 'danger'">
                          {{
                            tenant.one_flow_account !== null ? $t('actions.yes').toUpperCase() : $t('actions.no').toUpperCase()
                          }}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <CBadge :color="tenant.status === 'ACTIVE' ? 'success' : 'danger'">{{ tenant.status }}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <CButtonGroup role="group">
                          <CTooltip :content="$t('actions.view')" placement="top">
                            <template #toggler="{ on }">
                              <CButton v-on="on" @click="()=> { this.$router.push(`/tenants/${tenant.id}`) }"
                                       color="primary"
                                       size="sm">
                                <CIcon icon="cilBlur" size="sm"/>
                              </CButton>
                            </template>
                          </CTooltip>
                          <CTooltip :content="$t('actions.edit')" placement="top">
                            <template #toggler="{ on }">
                              <CButton v-on="on" @click="()=> { this.$router.push(`/tenants/${tenant.id}/edit`) }"
                                       color="warning" size="sm">
                                <CIcon icon="cilPencil" size="sm"/>
                              </CButton>
                            </template>
                          </CTooltip>
                          <CTooltip :content="$t('actions.delete')" placement="top">
                            <template #toggler="{ on }">
                              <CButton v-on="on" @click="handleDeleteTenant(tenant)"
                                       color="danger" size="sm">
                                <CIcon icon="cilTrash" size="sm"/>
                              </CButton>
                            </template>
                          </CTooltip>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                <CAlert v-if="!isLoading && tenants.length === 0" color="danger">
                  {{ $t('messages.noTenantsFound') }}
                </CAlert>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import CreateTenant from "./CreateTenant";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: 'Dashboard',
  components: {
    CreateTenant,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      tenants: [],
      currentTenant: {},
      deleteSuccessToast: {
        message: this.$t('messages.tenantDeleted'),
        type: 'success',
        duration: 10000,
        dismissible: true,
        queue: false,
        position: 'top-right',
      },
      showCreateModal: false,
      confirmDelete: false,
    };
  },
  computed: {
    windowLocationProtocol() {
      return window.location.protocol;
    },
    windowLocationHost() {
      return window.location.host;
    },
  },
  created() {
    this.getAllTenants();
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert'],
  methods: {
    async getAllTenants() {
      this.isLoading = true;
      await this.fetcher(`/api/tenants`, REQUEST_METHOD.GET)
        .then((response) => {
          this.tenants = response.data.data.tenants;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    handleDeleteTenant(tenant) {
      const vm = this;
      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$t('messages.deleteSystemConfirmation', { arg: tenant.name }),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yes'),
        cancelButtonText: vm.$t('actions.no')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await vm.deleteTenant(tenant);
        }
      });
    },
    async deleteTenant(tenant) {
      this.isLoading = true;

      await this.fetcher(`/api/tenants/${tenant.id}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.deleteSuccessToast);
          this.getAllTenants();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
  },
};
</script>
