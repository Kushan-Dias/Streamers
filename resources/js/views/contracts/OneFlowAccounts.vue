<template>
  <AddOneFlowAccount
    v-if="canCreateOneFlowAccount"
    :showCreateUpdateAccountModal="showCreateUpdateAccountModal"
    :isUpdating="isUpdating"
    :ofAccount="currentAccount"
  />
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.oneFlowAccount', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
                v-if="canCreateOneFlowAccount"
                size="sm"
                color="primary"
                class="float-end"
                @click="openModal(false, null)"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.add') }}</span>
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol :md="12">
              <TablePlaceholder v-if="isLoading"/>
              <CTable v-if="!isLoading && oneFlowAccounts.length > 0" align="middle" class="mb-0 border"
                      hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell class="text-left">{{ $tc('labels.tenant', 2) }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.account') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.organizer') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.email') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.token') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.mobile') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-left">{{ $t('labels.country') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center">{{ $t('labels.status') }}</CTableHeaderCell>
                    <CTableHeaderCell class="text-center">{{ $tc('labels.action', 2) }}</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow v-for="account in oneFlowAccounts" :key="account.name">
                    <CTableDataCell class="align-middle">
                      <div>{{ account.tenant.name }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <div>{{ account.name }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <div>{{ account.title }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <div>{{ account.email }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <strong>****{{ account.token.substr(-4) }}</strong>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <div>{{ account.mobile }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle text-center">
                      <div>{{ account.country_code }}</div>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <CBadge :color="account.status === 'ACTIVE' ? 'success' : 'danger'">{{ account.status }}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell class="align-middle">
                      <CButtonGroup role="group">
                        <CTooltip :content="$t('actions.edit')" placement="top">
                          <template #toggler="{ on }">
                            <CButton v-on="on"
                                     v-if="canCreateOneFlowAccount"
                                     @click="openModal(true, account)"
                                     color="warning" size="sm">
                              <CIcon icon="cilPencil" size="sm"/>
                            </CButton>
                          </template>
                        </CTooltip>
                        <CTooltip :content="$t('actions.delete')" placement="top">
                          <template #toggler="{ on }">
                            <CButton v-on="on" @click="handleDeleteOneFlowAccount(account)"
                                     color="danger" size="sm"
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
              <CAlert v-if="!isLoading && oneFlowAccounts.length === 0" color="danger">
                {{ $t('messages.noOneFlowAccountFound') }}
              </CAlert>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import moment from "moment";
import AddOneFlowAccount from "./AddOneFlowAccount";

import { REQUEST_METHOD } from "../../utils/enums";
import { EMITTERS } from "../../utils/constants";
import { PERMISSIONS } from "../../utils/app.permissions";

export default {
  name: "OneFlowAccounts",
  components: {
    AddOneFlowAccount,
  },
  computed: {
    canCreateOneFlowAccount() {
      return !this.hasValidAccess(PERMISSIONS.ADD_ONEFLOW);
    },
  },
  data() {
    return {
      isLoading: false,
      isUpdating: false,
      errorMessage: "",
      tenants: [],
      oneFlowAccounts: [],
      currentAccount: {},
      deleteAccountToast: {
        message: "Account deleted",
        type: "success",
      },
      showCreateUpdateAccountModal: false,
    };
  },
  created() {
    this.getAllOneFlowAccounts();

    this.emitter.on(EMITTERS.GET_DATA, () => {
      this.getAllOneFlowAccounts();
    });

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.onClose();
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert', 'hasValidAccess'],
  methods: {
    async getAllOneFlowAccounts() {
      this.isLoading = true;

      await this.fetcher(`/api/contracts/oneflow`, REQUEST_METHOD.GET)
        .then((response) => {
          this.oneFlowAccounts = response.data.data.oneflow_accounts;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    handleDeleteOneFlowAccount(account) {
      const vm = this;
      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$tc('messages.deleteTenantConfirmation', {
          arg: account.name,
          tenant: account.tenant.name,
        }),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yes'),
        cancelButtonText: vm.$t('actions.no')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await vm.deleteOneFlowAccount(account);
        }
      });
    },
    async deleteOneFlowAccount(account) {
      this.isLoading = true;

      await this.fetcher(`/api/contracts/oneflow/${account.id}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          this.currentAccount = {};
          this.showToast(this.deleteAccountToast);
          this.isLoading = false;
          this.getAllOneFlowAccounts();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    openModal(isUpdating = false, account = null) {
      if (isUpdating) {
        this.isUpdating = true;
        this.currentAccount = account;
      } else {
        this.isUpdating = false;
        this.currentAccount = {};
      }
      this.showCreateUpdateAccountModal = true;
    },
    onClose() {
      this.isUpdating = false;
      this.currentAccount = {};
      this.showCreateUpdateAccountModal = false;
    },
    createdAt(created_at) {
      return moment(created_at).format("MMMM Do YYYY");
    },
  },
};
</script>
