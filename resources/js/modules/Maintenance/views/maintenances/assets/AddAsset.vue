<template>
  <CModal
    backdrop="static"
    :visible="showCreateModal"
    @close="closeModal"
    size="lg"
  >
    <CModalHeader>
      <CCardTitle>{{ $t('labels.addNewMaintenanceAsset') }}</CCardTitle>
    </CModalHeader>
    <CModalBody>
      <Loading v-model:active="isLoading" :is-full-page="false"/>
      <CForm>
        <CRow>
          <CCol>
            <CFormLabel for="name">{{ $t('labels.name') }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="name" v-model="asset.name" placeholder="Asset name"/>
              <div class="d-flex flex-column" v-if="v$.asset.name.$dirty">
                <small class="validation-error" v-if="v$.asset.name.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="description">{{ $t('labels.description') }}</CFormLabel>
            <div class="mb-3">
              <CFormTextarea id="description" rows="6" v-model="asset.description"
                             placeholder="Asset description">
              </CFormTextarea>
              <div class="d-flex flex-column" v-if="v$.asset.description.$dirty">
                <small class="validation-error" v-if="v$.asset.description.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel for="images">{{ $tc('labels.image', 2) }}</CFormLabel>
            <div class="mb-3">
              <CFormInput id="images" type="url" v-model="asset.images"
                          placeholder="https://images.app.au/sites/public/event-image.png"
              />
              <div class="d-flex flex-column" v-if="v$.asset.images.$dirty">
                <small class="validation-error" v-if="v$.asset.images.required.$invalid">
                  {{ $t('labels.validations.required') }}
                </small>
                <small class="validation-error" v-if="v$.asset.images.url.$invalid">
                  {{ $t('labels.validations.url') }}
                </small>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="12" v-if="asset.images">
            <div class="mb-3 text-center">
              <img :src="asset.images" class="img-fluid" height="250" alt="event_image">
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol :md="4" class="mb-2" v-for="(selectedAsset, index) in selectedAssets">
            <CFormLabel v-if="index === selectedAssets.length - 1">{{ $t('labels.selectedParent') }}</CFormLabel>
            <CFormLabel v-else>&nbsp;</CFormLabel>
            <div class="form-control d-flex justify-content-between align-items-center">
              <span class="">{{ selectedAsset.name }}</span>
              <span class="btn px-0" @click="removeSelectedAsset(index)">
                <CIcon icon="cil-x-circle"/>
              </span>
            </div>
          </CCol>
          <CCol :md="4" v-if="assets.length > 0 && selectedAssets.length >= 0">
            <CFormLabel for="parent_id">{{ $t('labels.selectParent') }}</CFormLabel>
            <div class="mb-3">
              <CFormSelect id="parent_id" v-model="asset.parent_id" @change="setAsset">
                <option value="">{{ $t('labels.selectParent') }}</option>
                <option
                  v-for="asset in assets"
                  :value="asset.id"
                  :key="asset.id"
                  :selected="asset.parent_id === asset.id"
                >
                  {{ asset.name }}
                </option>
              </CFormSelect>
            </div>
          </CCol>
        </CRow>
        <CRow v-if="!asset.parent_id">
          <CCol>
            <CAlert color="success" class="d-flex align-items-center">
              <CIcon icon="cilInfo" size="md"/>
              <small class="ms-2">{{ $t('messages.addingRootAsset') }}</small>
            </CAlert>
          </CCol>
        </CRow>
      </CForm>
      <CRow v-if="isDev">
        <CCol>
          <textarea class="code w-100" rows="10">{{ asset }}</textarea>
        </CCol>
        <CCol>
          <textarea class="code w-100" rows="10">{{ v$ }}</textarea>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton class="float-right" type="submit" color="light" @click="closeModal">
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton class="float-right" type="submit" color="primary" @click="addAsset">
        {{ $t('actions.addAsset') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Loading from "vue-loading-overlay";
import useVuelidate from "@vuelidate/core";
import { required, url } from "@vuelidate/validators";
import { EMITTERS } from "../../../../../utils/constants";
import { REQUEST_METHOD } from "../../../../../utils/enums";

export default {
  name: "AddAsset",
  components: {
    Loading,
  },
  props: {
    showCreateModal: {
      required: true,
      type: Boolean,
      default: false
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      asset: {
        name: { required },
        description: { required },
        images: { required, url },
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
      asset: {},
      assets: [],
      selectedAsset: {},
      selectedAssets: [],
      createSuccessToast: {
        message: this.$t('messages.newAssetAdded'),
        type: 'success',
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    setAsset(e) {
      this.selectedAsset = this.assets[e.target.selectedIndex - 1];
      this.selectedAssets.push(this.selectedAsset);
      this.getAssets(e.target.value);
    },
    removeSelectedAsset(index) {
      this.selectedAssets.length = index;
      if (this.selectedAssets.length > 0) {
        this.asset.parent_id = this.selectedAssets[this.selectedAssets.length - 1].id;
      } else {
        this.asset.parent_id = null;
      }
      this.getAssets(this.asset.parent_id ? this.asset.parent_id : 0);
    },
    resetForm() {
      this.asset = {};
      this.selectedAssets = [];
      this.selectedAsset = {};
      this.v$.$reset();
    },
    async getAssets(parentId = 0) {
      this.isLoading = true;
      await this.fetcher(`/api/assets/parent/${parentId}`, REQUEST_METHOD.GET)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.assets = response.data.data.assets;
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    async addAsset() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.isLoading = true;

      await this.fetcher('/api/assets', REQUEST_METHOD.POST, this.asset)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.showToast(this.createSuccessToast);
            this.emitter.emit(EMITTERS.RELOAD_DATATABLE);
            this.resetForm();
            this.closeModal();
          }
        }).catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    closeModal() {
      this.resetForm();
      this.emitter.emit(EMITTERS.CLOSE_MODAL, false);
    },
  },
  watch: {
    showCreateModal(value) {
      if (value) {
        this.getAssets();
      }
    },
  },
};
</script>

<style scoped>

</style>
