<template>
  <CRow class="mb-3">
    <CRow class="mb-3">
      <CCol :md="7">
        <CRow class="mb-3">
          <CCol>
            <CCard>
              <CCardHeader class="pb-0">
                <CRow>
                  <CCol>
                    <h5 class="mb-1">{{ asset.name }}</h5>
                    <div class="small">{{ asset.location }}</div>
                    <div class="small text-secondary">
                      {{ $tc('labels.createdAt', { dateTime: formatLLLT(asset.created_at) }) }}
                    </div>
                  </CCol>
                  <CCol :xs="2">
                    <CDropdown class="float-end ms-2" color="light" variant="btn-group">
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
              <CCardBody>
                <Loading v-model:active="isLoading" :is-full-page="false"/>
                <CRow>
                  <CCol>
                    <vue-easy-lightbox
                      loop
                      :visible="showLightBox"
                      :imgs="assetImages"
                      :index="lightBoxIndex"
                      @hide="closeLightBox"
                    ></vue-easy-lightbox>
                    <Carousel :autoplay="5000" :wrap-around="true">
                      <Slide v-for="(attachment, index) in assetImages" :key="index">
                        <img class="d-block"
                             :src="attachment"
                             :alt="'image_' + index"
                             @click="openLightBox(index)"
                        />
                      </Slide>
                      <template #addons>
                        <Navigation/>
                        <Pagination/>
                      </template>
                    </Carousel>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <h5>{{ $t('labels.description') }}</h5>
                    <div class="text-justify">
                      {{ asset.description }}
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
      <CCol :md="5">
        <CRow>
          <CCol>
            <CCard class="h-100">
              <CCardHeader>
                <CRow>
                  <CCol>
                    <h5 class="card-title mb-0">{{ $t('labels.maintenanceHistory') }}</h5>
                  </CCol>
                  <CCol :sm="2" class="d-none d-md-block">
                    <CButton
                      color="primary"
                      class="float-end"
                      size="sm"
                    >
                      <small> {{ $t('actions.create') }}</small>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardHeader>
              <Loading v-model:active="isLoading" :is-full-page="false"/>
              <CCardBody v-if="maintenances.length > 0">
                <CRow v-for="(maintenance, index) in maintenances">
                  <CCol :md="12">
                    <CRow>
                      <CCol :md="10" class="mb-1">
                        <h6 class="mb-0">{{ maintenance.title }}</h6>
                        <small class="text-secondary me-3">
                          {{ $t('labels.problemNature') }}: {{ maintenance.problem_nature }}
                        </small>
                      </CCol>
                      <CCol :md="2">
                        <CButtonGroup class="float-end" role="group">
                          <CTooltip :content="$t('actions.viewRequest')" placement="top">
                            <template #toggler="{ on }">
                              <CButton v-on="on"
                                       @click="this.$router.push(`/maintenances/${maintenance.id}`)"
                                       color="primary" size="sm">
                                <i class="cil-blur"></i>
                              </CButton>
                            </template>
                          </CTooltip>
                        </CButtonGroup>
                      </CCol>
                      <CCol :md="12">
                        <CBadge :color="getStatusColor(maintenance.status)">
                          <small class="mb-0">{{ maintenance.status }}</small>
                        </CBadge>
                      </CCol>
                    </CRow>
                    <hr v-if="index !== maintenances.length - 1"/>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardBody v-else class="d-flex flex-column align-items-center justify-content-center p-5">
                <h5 class="text-secondary text-center mb-4">{{ $t('messages.noMaintenances') }}</h5>
                <CButtonGroup role="group">
                  <CButton color="primary" size="sm">
                    <span>{{ $t('actions.addMaintenance') }}</span>
                  </CButton>
                </CButtonGroup>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </CRow>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { REQUEST_METHOD } from "../../../../../utils/enums";

export default {
  name: "ViewAsset",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      isLoading: false,
      asset: {},
      assetImages: [],
      maintenances: [],
      showLightBox: false,
      lightBoxIndex: 0,
      showNotFoundToast: {
        message: 'Asset not found',
        type: 'error',
        duration: 3000,
      },
    };
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert', 'formatLLLT', 'formatLL', 'formatLT'],
  created() {
    this.getAsset();
  },
  methods: {
    openLightBox(index) {
      this.lightBoxIndex = index;
      this.showLightBox = true;
    },
    closeLightBox() {
      this.showLightBox = false;
    },
    setImages(images) {
      this.assetImages = images.split(',');
    },
    getStatusColor(status) {
      switch (status) {
        case "ASSIGNED":
          return "warning";
        case "REQUESTED":
          return "danger";
        case "RESOLVED":
          return "success";
        case "COMPLETED":
          return "success";
        default:
          return "dark";
      }
    },
    async getAsset() {
      this.isLoading = true;
      await this.fetcher(`/api/assets/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.asset = response.data.data.asset;
          this.maintenances = this.asset.maintenances;
          this.setImages(this.asset.images);
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response.data.status === 404) {
            this.$router.push('/maintenances/assets');
            this.showToast(this.showNotFoundToast);
          } else {
            this.isLoading = false;
            this.catcher(error);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  height: 350px;

  img, .carousel__track {
    height: 330px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
