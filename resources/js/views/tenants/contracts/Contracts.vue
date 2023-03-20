<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow class="mb-3">
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">{{ $tc('labels.contract', 2) }}</h4>
                <div class="small text-medium-emphasis">
                  <span v-if="contracts.length > 0">{{ $t('labels.totalCount') }}: {{ this.contracts.length }}</span>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <TablePlaceholder v-if="isLoading" :showActions="false"/>
                <CTable v-if="!isLoading && contracts.length > 0" align="middle" class="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell class="text-center align-middle">Contract ID</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">Name</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">User</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">Participant ID</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">Viewed</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">Signed</CTableHeaderCell>
                      <CTableHeaderCell class="text-center align-middle">Created</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow v-for="contract in contracts" :key="contract.name">
                      <CTableDataCell class="text-center align-middle">
                        <div>{{ contract.id }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="align-middle">
                        <div>{{ contract.template.name }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="align-middle">
                        <div>{{ contract.user.first_name }} {{ contract.user.last_name }}</div>
                        <div class="small text-medium-emphasis">
                          <a class="text-secondary text-decoration-none" :href="'mailto:' + contract.user.email">
                        <span>
                          {{ contract.user.email }}
                        </span>
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <div>{{ contract.participant_id }}</div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <CBadge :color="contract.viewed ? 'success' : 'danger'">
                          {{ contract.viewed ? 'YES' : 'NO' }}
                        </CBadge>
                        <div v-if="contract.viewed_at">
                          {{ getDate(contract.viewed_at) }}
                        </div>
                        <div v-if="contract.viewed_at" class="small text-medium-emphasis">
                          {{ getTime(contract.viewed_at) }}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <CBadge :color="contract.signed ? 'success' : 'danger'">
                          {{ contract.signed ? 'YES' : 'NO' }}
                        </CBadge>
                        <div v-if="contract.signed_at">
                          {{ getDate(contract.signed_at) }}
                        </div>
                        <div v-if="contract.signed_at" class="small text-medium-emphasis">
                          {{ getTime(contract.signed_at) }}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell class="text-center align-middle">
                        <div>
                          {{ getDate(contract.created_at) }}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                <CAlert v-if="!isLoading && contracts.length === 0" color="danger">
                  {{ $t('labels.noContractsFound') }}
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
import moment from "moment";
import { REQUEST_METHOD } from "../../../utils/enums";

export default {
  name: 'Dashboard',
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      contracts: [],
    };
  },
  created() {
    this.getAllTenants();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async getAllTenants() {
      this.isLoading = true;
      await this.fetcher(`/api/contracts`, REQUEST_METHOD.GET)
        .then((response) => {
          this.contracts = response.data.data.contracts;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    getDate(dateTime) {
      return moment(dateTime).local().format("MMMM Do YYYY");
    },
    getTime(dateTime) {
      return moment(dateTime).local().format("h:mm:ss A");
    },
  },
};
</script>
