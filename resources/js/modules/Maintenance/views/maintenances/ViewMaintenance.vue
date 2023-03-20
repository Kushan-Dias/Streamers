<template>
  <AssignMaintainer :showAssignModal="showAssignModal" :maintenanceId="maintenance.id"/>
  <ViewMaintenancePlaceholder v-if="isLoadingMaintenance || isLoadingMaintenanceLog"/>
  <div v-else>
    <CRow class="mb-3">
      <CCol :md="8">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol :md="8">
                <h3 class="ticket-id">{{ $tc('labels.requestNo', { id: maintenance.id }) }}</h3>
              </CCol>
              <CCol :md="4" class="d-flex flex-column justify-content-between align-items-end">
                <div class="d-flex align-items-stretch mb-2">
                  <CBadge :color="statusColor" class="d-flex align-items-center">
                    <h6 class="mb-0">{{ maintenance.status }}</h6>
                  </CBadge>
                  <CDropdown class="ms-2" color="light" variant="btn-group">
                    <CDropdownToggle color="light" :caret="false" size="sm">
                      <CIcon icon="cilOptions"/>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem class="small">{{ $t('actions.edit') }}</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <h5 class="mb-0">{{ maintenance.title }}</h5>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <small class="text-secondary">
                  {{ formatLLLT(maintenance.created_at) }}</small>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="4">
        <CCard class="h-100">
          <CCardBody>
            <CRow class="h-100">
              <CCol class="d-flex flex-column justify-content-between">
                <div class="d-flex align-items-center">
                  <CAvatar :src="createdByAvatar" size="md"/>
                  <div class="d-flex flex-column justify-content-start ms-2">
                    <h6 class="mb-0">
                      {{ maintenance.requested_by.first_name }} {{ maintenance.requested_by.last_name }}
                    </h6>
                    <small class="text-secondary">{{ maintenance.requested_by.email }}</small>
                  </div>
                </div>
                <small>{{ maintenance.created_by.mobile }}</small>
                <div class="d-flex justify-content-start align-items-end">
                  <small class="mb-0 me-2 fw-bold">{{ $t('labels.priority') }}</small>
                  <CBadge :color="priorityColor">
                    <small>{{ maintenance.priority }}</small>
                  </CBadge>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol :md="8">
        <CRow class="mb-3">
          <CCol>
            <CCard>
              <CCardBody>
                <CRow class="mb-3">
                  <CCol>
                    <h5 class="mb-0">{{ maintenance.asset.name }}</h5>
                    <small class="text-secondary">{{ maintenance.location }}</small>
                  </CCol>
                  <CCol :xs="1">
                    <CButtonGroup role="group">
                      <CTooltip :content="$t('actions.viewAsset')" placement="top">
                        <template #toggler="{ on }">
                          <CButton
                            v-on="on"
                            size="sm"
                            color="primary"
                            class="float-end ml-2"
                            @click="this.$router.push(`/maintenances/assets/${maintenance.asset.id}`)"
                          >
                            <CIcon icon="cilBlur"/>
                          </CButton>
                        </template>
                      </CTooltip>
                    </CButtonGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <vue-easy-lightbox
                      loop
                      :visible="showLightBox"
                      :imgs="maintenanceAttachments"
                      :index="lightBoxIndex"
                      @hide="closeLightBox"
                    ></vue-easy-lightbox>
                    <Carousel :autoplay="5000" :wrap-around="true">
                      <Slide v-for="(attachment, index) in maintenanceAttachments" :key="index">
                        <img class="d-block"
                             :src="attachment"
                             :alt="'attachment_' + index"
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
        <CRow class="mb-3">
          <CCol>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <h5>{{ $t('labels.description') }}</h5>
                    <div class="text-justify">
                      {{ maintenance.description }}
                    </div>
                    <div>
                      <hr class="bg-secondary">
                      <CRow>
                        <CCol :md="6">
                          <h5 class="mb-0">{{ $t('labels.problemNature') }}</h5>
                          <small>{{ maintenance.problem_nature }}</small>
                        </CCol>
                        <CCol :md="6">
                          <h5 class="mb-0">{{ $t('labels.convenientDate') }}</h5>
                          <div class="small">{{ formatLL(maintenance.convenient_from) }}</div>
                          <div class="small text-secondary">
                            {{ formatLT(maintenance.convenient_from) }} -
                            {{ formatLT(maintenance.convenient_to) }}
                          </div>
                        </CCol>
                      </CRow>
                    </div>
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
                  <CCol class="d-flex justify-content-between">
                    <h5>{{ $tc('labels.maintainer', 1) }}</h5>
                    <div class="float-end">
                      <CButton
                        size="sm"
                        color="primary"
                        class="me-1"
                        @click="openAssignModal"
                      >
                        <CIcon icon="cilPlus"/>
                        <small> {{ $t('actions.assignMaintainer') }}</small>
                      </CButton>
                      <CButtonGroup role="group">
                        <CTooltip :content="$t('actions.viewCalendar')" placement="top">
                          <template #toggler="{ on }">
                            <CButton
                              v-on="on"
                              size="sm"
                              color="primary"
                              @click="()=> {this.$router.push('/maintenances/calendar')}"
                            >
                              <CIcon icon="cilCalendar"/>
                            </CButton>
                          </template>
                        </CTooltip>
                      </CButtonGroup>
                    </div>
                  </CCol>
                </CRow>
                <CRow v-if="maintenance.maintainer" class="mt-4">
                  <CCol :md="6">
                    <div class="d-flex align-items-center">
                      <CAvatar
                        :src="maintenance.maintainer.avatar_url ? maintenance.maintainer.avatar_url : defaultAvatar"
                        size="xl"
                      />
                      <div class="ms-3">
                        <h6 class="mb-0">
                          {{ maintenance.maintainer.first_name }} {{ maintenance.maintainer.last_name }}
                        </h6>
                        <div>
                          <CIcon icon="cilStar" class="text-warning"/>
                          <small class="ms-1">4.9</small>
                        </div>
                        <div class="small text-secondary">
                          {{ $tc('labels.assignedAt', { dateTime: formatLLLT(maintenance.assigned_at) }) }}
                        </div>
                      </div>
                    </div>
                  </CCol>
                  <CCol :md="6">
                    <h6 class="mb-0">{{ $t('labels.maintenanceDate') }}</h6>
                    <small class="mb-0">{{ formatLL(maintenance.maintenance_event.event_date) }}</small>
                    <div class="small text-secondary">
                      {{ formatLT(maintenance.maintenance_event.start_time) }} -
                      {{ formatLT(maintenance.maintenance_event.end_time) }}
                    </div>
                  </CCol>
                </CRow>
                <CRow v-else>
                  <CCol>
                    <span class="text-secondary">{{ $t('messages.noMaintainerAssignedYet') }}</span>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
      <CCol :md="4">
        <CRow class="mb-3">
          <CCol>
            <CCard>
              <CCardBody>
                <div class="d-flex justify-content-between mb-4">
                  <h5>{{ $t('labels.timeline') }}</h5>
                  <CButton
                    size="sm"
                    color="primary"
                  >
                    <CIcon icon="cilPlus"/>
                    <small> {{ $t('actions.addEntry') }}</small>
                  </CButton>
                </div>
                <ul v-if="logs.length > 0" class="timeline mb-3">
                  <li v-for="(log, index) in logs" class="event" :key="index">
                    <h6 class="title">{{ log.title }}</h6>
                    <small class="date-time text-secondary">{{ formatLLLT(log.created_at) }}</small>
                    <p class="description">
                      {{ log.description }}
                    </p>
                  </li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import AssignMaintainer from "./AssignMaintainer";
import ViewMaintenancePlaceholder from "../../components/placeholders/ViewMaintenancePlaceholder";

import defaultAvatar from "../../../../assets/images/avatar-default.png";
import { REQUEST_METHOD } from "../../../../utils/enums";
import { EMITTERS } from "../../../../utils/constants";

export default {
  name: "ViewMaintenance",
  components: {
    ViewMaintenancePlaceholder,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    AssignMaintainer,
  },
  setup() {
    return {
      v$: useVuelidate(),
      moment: moment,
    };
  },
  validations() {
    return {};
  },
  computed: {
    statusColor() {
      if (this.maintenance) {
        switch (this.maintenance.status) {
          case "ASSIGNED":
            return "warning";
          case "REQUESTED":
            return "danger";
          case "RESOLVED":
            return "success";
          case "COMPLETED":
            return "success";
        }
      } else {
        return "danger";
      }

      return "danger";
    },
    priorityColor() {
      if (this.maintenance) {
        switch (this.maintenance.priority) {
          case "LOW":
            return "secondary";
          case "MEDIUM":
            return "warning";
          case "HIGH":
            return "danger";
          case "URGENT":
            return "danger";
        }
      } else {
        return "danger";
      }

      return "danger";
    },
    createdByAvatar() {
      return this.maintenance.created_by.avatar_url ? this.maintenance.created_by.avatar_url : defaultAvatar;
    },
  },
  data() {
    return {
      isLoadingMaintenance: false,
      isLoadingMaintenanceLog: false,
      showAssignModal: false,
      defaultAvatar: defaultAvatar,
      maintenance: {
        requested_by: {},
        created_by: {},
        maintainer: {},
        asset: {},
        maintenance_event: {},
      },
      logs: [],
      maintainer: null,
      maintenanceAttachments: [],
      showLightBox: false,
      lightBoxIndex: 0,
      showNotFoundToast: {
        message: 'Request not found',
        type: 'error',
        duration: 3000,
      },
    };
  },
  created() {
    this.getMaintenanceData();

    this.emitter.on(EMITTERS.CLOSE_MODAL, (val) => {
      this.closeAssignModal(val);
    });

    this.emitter.on(EMITTERS.RELOAD_MAINTENANCE, () => {
      this.getMaintenanceData();
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'formatLLLT', 'formatLL', 'formatLT'],
  methods: {
    openLightBox(index) {
      this.lightBoxIndex = index;
      this.showLightBox = true;
    },
    closeLightBox() {
      this.showLightBox = false;
    },
    openAssignModal() {
      this.showAssignModal = !this.showAssignModal;
    },
    closeAssignModal(val) {
      this.showAssignModal = val;
    },
    setAttachments(attachments) {
      this.maintenanceAttachments = attachments.split(',');
    },
    getMaintenanceData() {
      this.getMaintenance();
      this.getMaintenanceLogs();
    },
    async getMaintenance() {
      this.isLoadingMaintenance = true;

      await this.fetcher(`/api/maintenances/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.maintenance = response.data.data.maintenance;
          this.setAttachments(this.maintenance.attachments);
          this.isLoadingMaintenance = false;
        })
        .catch((error) => {

          if (error.response.data.status === 404) {
            this.$router.push('/maintenances');
            this.showToast(this.showNotFoundToast);
          } else {
            this.isLoadingMaintenance = false;
            this.catcher(error);
          }

        });
    },
    async getMaintenanceLogs() {
      this.isLoadingMaintenanceLog = true;

      await this.fetcher(`/api/maintenances/logs/${this.$route.params.id}`, REQUEST_METHOD.GET)
        .then((response) => {
          this.logs = response.data.data.logs;
          this.isLoadingMaintenanceLog = false;
        })
        .catch((error) => {
          this.catcher(error);
          this.isLoadingMaintenanceLog = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ticket-id {
  font-weight: 700;
}

.carousel {
  position: relative;
  height: 400px;

  img, .carousel__track {
    height: 380px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}

.timeline {
  border-left: 3px solid var(--cui-primary);
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  margin: 0 auto;
  letter-spacing: 0.2px;
  position: relative;
  line-height: 1.4em;
  font-size: 1.03em;
  padding: 15px 15px 0;
  list-style: none;
  text-align: left;
  max-width: 90%;

  .event {
    border-bottom: 1px dashed var(--cui-secondary);
    padding-bottom: 20px;
    margin-bottom: 20px;
    position: relative;
    font-size: 0.9rem;

    .title {
      margin-bottom: 0;
      font-weight: bold;
    }

    .date-time {
      margin-bottom: 0.3rem;
    }

    .description {
      margin-bottom: 0;
      font-size: 0.9rem;
      line-height: 1.3;
    }

    &:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
    }

    &::after {
      position: absolute;
      display: block;
      -webkit-box-shadow: 0 0 0 3px var(--cui-primary);
      box-shadow: 0 0 0 3px var(--cui-primary);
      left: -21px;
      background: #fff;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      content: "";
      top: 5px;
    }
  }
}
</style>
