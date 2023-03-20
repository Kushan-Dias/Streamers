<template>
  <CModal backdrop="static" :visible="showCreateUpdateTemplateModal"
          @close="() => { this.showCreateUpdateTemplateModal = false; this.isUpdating = false; }" size="lg">
    <Loading v-model:active="isLoading" :is-full-page="false"/>
    <CModalHeader>
      <CModalTitle>{{ $t('labels.addContractTemplate') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="tenant">{{ $t('labels.tenant', 1) }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="tenant" v-model="tenantId" placeholder="" disabled/>
            </div>
          </CCol>
          <CCol xs>
            <CFormLabel for="name">{{ $t('labels.templateName') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="currentTemplate.name" placeholder="New Contract"/>
              <div class="d-flex flex-column" v-if="v$.currentTemplate.name.$dirty">
                <small class="text-danger" v-if="v$.currentTemplate.name.required.$invalid">
                  Template name field is required
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormLabel for="template_id">{{ $t('labels.templateId') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="template_id" type="number" v-model="currentTemplate.id" placeholder="274154"/>
              <div class="d-flex flex-column" v-if="v$.currentTemplate.id.$dirty">
                <small class="text-danger" v-if="v$.currentTemplate.id.required.$invalid">
                  Template ID field is required
                </small>
              </div>
            </div>
          </CCol>
          <CCol>
            <CFormLabel for="workspace_id">{{ $t('labels.workspaceId') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="workspace_id" type="number" v-model="currentTemplate.workspace_id"
                          placeholder="487521"/>
              <div class="d-flex flex-column" v-if="v$.currentTemplate.workspace_id.$dirty">
                <small class="text-danger" v-if="v$.currentTemplate.workspace_id.required.$invalid">
                  Account Email field is required
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6">
            <CFormLabel for="email">{{ $t('labels.version') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="version" type="number" v-model="currentTemplate.version"
                          placeholder="1"/>
              <div class="d-flex flex-column" v-if="v$.currentTemplate.version.$dirty">
                <small class="text-danger" v-if="v$.currentTemplate.version.required.$invalid">
                  Version field is required
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="light" @click="() => { this.showCreateUpdateTemplateModal = false; this.isUpdating = false; }">
        Cancel
      </CButton>
      <CButton v-if="isUpdating" color="primary" @click="updateContractTemplate()">
        Update
      </CButton>
      <CButton v-else color="primary" @click="createContractTemplate()">
        Add
      </CButton>
    </CModalFooter>
  </CModal>
  <CCol :md="6">
    <CCard class="template-card">
      <CCardHeader>
        <CRow>
          <CCol :sm="5">
            <h5 class="card-title mb-0">{{ $tc('labels.contractTemplate', 2) }}</h5>
          </CCol>
          <CCol :sm="7" class="d-none d-md-block">
            <CButton
              color="primary"
              class="float-end"
              size="sm"
              @click="openAddModal"
            >
              <small> {{ $t('actions.add') }}</small>
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CCardBody v-if="contractTemplates.length > 0" class="template-card h-100">
        <CRow v-for="(template, index) in contractTemplates">
          <CCol :md="12">
            <CRow>
              <CCol :md="10" class="mb-1">
                <h6 class="mb-0">{{ template.name }}</h6>
                <div class="d-flex">
                  <div class="small text-secondary me-3">
                    {{ $t('labels.templateId') }}: {{ template.id }}
                  </div>
                  <div class="small text-secondary me-3">
                    {{ $t('labels.workspaceId') }}: {{ template.workspace_id }}
                  </div>
                  <div class="small text-secondary me-3">
                    {{ $t('labels.version') }}: {{ template.version }}
                  </div>
                </div>
              </CCol>
              <CCol :md="2">
                <CButtonGroup class="float-end" role="group">
                  <CTooltip :content="$t('actions.edit')" placement="top">
                    <template #toggler="{ on }">
                      <CButton v-on="on"
                               @click="()=> {
                                 this.showCreateUpdateTemplateModal = true;
                                 this.isUpdating = true;
                                 this.currentTemplate = template;
                                 this.templateId = template.id;
                               }"
                               color="warning" size="sm">
                        <CIcon icon="cilPencil" size="sm"/>
                      </CButton>
                    </template>
                  </CTooltip>
                  <CTooltip :content="$t('actions.delete')" placement="top">
                    <template #toggler="{ on }">
                      <CButton v-on="on"
                               @click="handleDeleteContractTemplate(template)"
                               color="danger" size="sm">
                        <CIcon icon="cilTrash" size="sm"/>
                      </CButton>
                    </template>
                  </CTooltip>
                </CButtonGroup>
              </CCol>
              <CCol :md="12">
                <CBadge color="primary">
                  <small class="mb-0">{{ template.role.title }}</small>
                </CBadge>
              </CCol>
            </CRow>
            <hr v-if="index !== contractTemplates.length - 1"/>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardBody v-else class="d-flex flex-column align-items-center justify-content-center p-5">
        <h5 class="text-secondary text-center mb-3">{{ $t('messages.noContractTemplates') }}</h5>
        <CButtonGroup role="group">
          <CButton v-on="on"
                   @click="openAddModal"
                   color="primary" size="sm">
            <span>{{ $t('actions.addTemplate') }}</span>
          </CButton>
        </CButtonGroup>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
import moment from "moment";
import Loading from "vue-loading-overlay";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { REQUEST_METHOD } from "../../utils/enums";

export default {
  name: "ContractTemplates",
  components: {
    Loading,
  },
  props: {
    tenantId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      isLoading: false,
      isUpdating: false,
      errorMessage: "",
      tenants: [],
      contractTemplates: [],
      currentTemplate: {},
      templateId: null,
      templateCreateSuccessToast: {
        message: this.$t('messages.templateCreated'),
        type: 'success',
      },
      templateUpdateSuccessToast: {
        message: this.$t('messages.templateUpdated'),
        type: 'success',
      },
      deleteTemplateToast: {
        message: this.$t('messages.templateDeleted'),
        type: "success",
      },
      showCreateUpdateTemplateModal: false,
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      currentTemplate: {
        id: { required },
        workspace_id: { required },
        name: { required },
        version: { required },
        // role_id: { required }, // Todo:
      },
    };
  },
  created() {
    this.getAllTenants();
    if (this.tenantId) {
      this.getAllContractTemplates();
    }
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert'],
  methods: {
    openAddModal() {
      this.currentTemplate = {};
      this.showCreateUpdateTemplateModal = true;
    },
    async getAllTenants() {
      this.isLoading = true;
      await this.fetcher(`/api/tenants/${this.tenantId}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.tenants = response.data.data.tenants;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    async createContractTemplate() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;
      this.currentTemplate.template_id = this.currentTemplate.id;
      this.currentTemplate.role_id = 2;

      await this.fetcher(`/api/contracts/templates/${this.tenantId}/`, REQUEST_METHOD.POST, this.currentTemplate)
        .then((response) => {
          this.showCreateUpdateTemplateModal = false;
          this.showToast(this.templateCreateSuccessToast);
          this.currentTemplate = {};
          this.isLoading = false;
          this.getAllContractTemplates();
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async updateContractTemplate() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;
      this.currentTemplate.template_id = this.currentTemplate.id;

      await this.fetcher(`/api/contracts/templates/${this.tenantId}/${this.templateId}`, REQUEST_METHOD.PUT, this.currentTemplate)
        .then((response) => {
          this.currentTemplate = {};
          this.showCreateUpdateTemplateModal = false;
          this.showToast(this.templateUpdateSuccessToast);
          this.isUpdating = false;
          this.isLoading = false;
          this.getAllContractTemplates();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async getAllContractTemplates() {
      this.isLoading = true;

      await this.fetcher(`/api/contracts/templates/${this.tenantId}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.contractTemplates = response.data.data.templates;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    handleDeleteContractTemplate(template) {
      const vm = this;
      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$tc('messages.deleteTenantConfirmation', { arg: template.name }),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yes'),
        cancelButtonText: vm.$t('actions.no')
      }).then(async (result) => {
        if (result.isConfirmed) {
          await vm.deleteContractTemplate(template);
        }
      });
    },
    async deleteContractTemplate(template) {
      this.isLoading = true;

      await this.fetcher(`/api/contracts/templates/${this.tenantId}/${template.id}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          this.showToast(this.deleteTemplateToast);
          this.isLoading = false;
          this.getAllContractTemplates();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    createdAt(created_at) {
      return moment(created_at).format("MMMM Do YYYY");
    },
  },
};
</script>

<style>
.template-card {
  height: 338px;
  overflow-y: auto;
}
</style>
