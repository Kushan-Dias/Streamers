<template>
  <CModal
    backdrop="static"
    :visible="showCreateUpdateModal"
    @close="closeModal"
  >
    <Loading v-model:active="isLoading" :is-full-page="false"/>
    <CModalHeader>
      <CModalTitle v-if="isUpdating">{{ $t('labels.updateRole') }}</CModalTitle>
      <CModalTitle v-else>{{ $t('labels.createRole') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormLabel for="Role Name">{{ $t('labels.roleTitle') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="roleName" v-model="role.title" placeholder="Student"
                          @input="setRoleName"/>
              <div class="d-flex flex-column" v-if="v$.role.title.$dirty">
                <small class="text-danger" v-if="v$.role.title.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ isUpdating }} {{ role }}</textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton v-if="isUpdating" color="primary" @click="updateRole">
        {{ $t('actions.update') }}
      </CButton>
      <CButton v-else color="primary" @click="createRole">
        {{ $t('actions.create') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { REQUEST_METHOD } from "../../utils/enums";
import { EMITTERS } from "../../utils/constants";

export default {
  name: "CreateRole",
  components: {},
  props: {
    showCreateUpdateModal: {
      required: true,
      type: Boolean,
      default: false
    },
    isUpdating: {
      type: Boolean,
      default: false
    },
    currentRole: {
      type: Object,
      default: {},
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      role: {
        name: { required },
        title: { required },
      },
    };
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  data() {
    return {
      isLoading: false,
      role: {},
      roleCreateSuccessToast: {
        message: this.$t('messages.roleCreated'),
        type: 'success',
      },
      roleUpdateSuccessToast: {
        message: this.$t('messages.roleUpdated'),
        type: 'success',
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    async createRole() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;
      await this.fetcher(`/api/roles`, REQUEST_METHOD.POST, this.role)
        .then((response) => {
          this.isLoading = false;
          this.showToast(this.roleCreateSuccessToast);
          this.emitter.emit(EMITTERS.GET_DATA);
          this.closeModal();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async updateRole() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;
      await this.fetcher(`/api/roles/${this.role.id}`, REQUEST_METHOD.PUT, this.role)
        .then((response) => {
          this.isLoading = false;
          this.emitter.emit(EMITTERS.GET_DATA);
          this.closeModal();
          this.showToast(this.roleUpdateSuccessToast);
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    setRoleName(e) {
      if (!this.isUpdating) {
        this.role.name = e.target.value.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w-]+/g, '')        // Remove all non-word chars
          .replace(/--+/g, '-')           // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');
      }      // Trim - from end of text
    },
    resetForm() {
      this.role = {};
      this.v$.$reset();
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    currentRole(value) {
      if (value) {
        this.role = value;
      }
    }
  },
};
</script>

<style scoped>

</style>
