<template>
  <CModal
    backdrop="static"
    :visible="showMediaUploadModal"
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
          <textarea class="code w-100" rows="10"></textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="light"
        @click="closeModal"
      >
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton v-else color="primary" @click="createRole">
        {{ $t('actions.upload') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { EMITTERS } from "../utils/constants";

export default {
  name: "MediaUpload",
  props: {
    showMediaUploadModal: {
      required: true,
      type: Boolean,
      default: false,
    },
    collectionName: {
      required: true,
      type: String,
      default: null,
    },
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  data() {
    return {
      isLoading: false,
      isDev: false,
    };
  },
  methods: {
    closeModal() {
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
};
</script>

<style scoped>

</style>
