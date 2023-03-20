<template>
  <CModal
    backdrop="static"
    :visible="showDeleteModal"
    @close="() => {showDeleteModal = false}"
  >
    <Loading v-model:active="isLoading" :is-full-page="false"/>
    <CModalHeader>
      <CModalTitle>{{ $t('labels.deleteUser') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      {{ $tc('messages.deleteSystemConfirmation', { arg: currentUser.name }) }}
    </CModalBody>
    <CModalFooter>
      <CButton
        color="light"
        @click="() => {showDeleteModal = false}"
      >
        {{ $t('actions.cancel') }}
      </CButton>
      <CButton color="danger" @click="deleteUser(currentUser)"> {{ $t('actions.yes') }}</CButton>
    </CModalFooter>
  </CModal>
  <CreateUser :showCreateModal="showCreateModal"/>
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.user', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
                v-if="canCreateUser"
                size="sm"
                color="primary"
                class="float-end ml-2"
                @click="openCreateModal"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.create') }}</span>
              </CButton>
              <CButton
                size="sm"
                color="primary"
                class="float-end ml-2"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.export') }}</span>
              </CButton>
              <CButton
                size="sm"
                color="primary"
                class="float-end"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.import') }}</span>
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <VueDatatable v-if="canListUsers" id="users" url="/api/users/datatable" :columns="columns"
                            :columnDefs="columnDefs"/>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { createApp } from "vue";
import $ from 'jquery';
import moment from "moment";
import Loading from "vue-loading-overlay";
import CreateUser from "./CreateUser";
import VueDatatable from "../../../components/VueDatatable";
import DatatableActionButton from "../../../components/DatatableActionButton";
import { REQUEST_METHOD } from "../../../utils/enums";
import { PERMISSIONS } from "../../../utils/app.permissions";
import { EMITTERS } from "../../../utils/constants";

import defaultAvatar from "../../../assets/images/avatar-default.png";

export default {
  name: "Users",
  components: {
    CreateUser,
    Loading,
    VueDatatable,
    DatatableActionButton
  },
  setup() {
    return {
      windowLocationProtocol: window.location.protocol,
      windowLocationHost: window.location.host,
    };
  },
  computed: {
    windowLocationProtocol() {
      return window.location.protocol;
    },
    windowLocationHost() {
      return window.location.host;
    },
    canCreateUser() {
      return this.hasValidAccess(PERMISSIONS.CREATE_USER);
    },
    canListUsers() {
      return this.hasValidAccess(PERMISSIONS.LIST_USERS);
    },
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      users: [],
      currentUser: {},
      columns: [
        { "data": "avatar_url", "title": "", "searchable": false, "orderable": false },
        { "data": "first_name", "title": "First Name" },
        { "data": "last_name", "title": "Last Name" },
        { "data": "gender", "title": "Gender", "orderable": false },
        { "data": "email", "title": "Email" },
        { "data": "roles", "title": "Roles", "searchable": false, "orderable": false },
        { "data": "created_at", "title": "Member Since" },
        { "data": "status", "title": "Status", "orderable": false },
        { "data": null, "title": "Actions", "searchable": false, "orderable": false }
      ],
      columnDefs: [
        { className: 'text-center', targets: [6] },
        {
          targets: 0, render: function (avatar_url) {
            return `
            <div style="height: 35px; width: 35px;">
              <img
                class="avatar-img"
                src=${avatar_url != null
              ? avatar_url
              : defaultAvatar}
              />
            </div>
            `;
          }
        },
        {
          targets: 5, render: function (roles) {
            return roles.map(role => role.title).join(', ');
          }
        },
        {
          targets: 6, render: function (data) {
            return `
            <div>${moment(data).format('MMMM Do YYYY')}</div>
            <small class="text-secondary">${moment(data).format('LT')}</small>
            `;
          }
        },
        {
          targets: -2, render: function (data) {
            return `
            <span class='badge badge-${data === 'ACTIVE' ? 'success' : 'danger'}'>${data}</span>
            `;
          }
        },
        {
          targets: -1,
          "createdCell": function (cell, cellData, rowData, row, col) {
            let viewButton = createApp(DatatableActionButton,
              {
                btnId: `viewUserAction${rowData.id}`,
                btnClass: 'btn-primary text-white',
                iconClass: 'cil-apps',
                eventName: 'user-view-redirect',
                item: rowData,
                eventBus: this.eventBus,
                url: `/users/${rowData.id}`
              },
            );

            let editButton = createApp(DatatableActionButton,
              {
                btnId: `editUserAction${rowData.id}`,
                btnClass: 'btn-warning',
                iconClass: 'cil-pencil',
                eventName: 'user-edit-redirect',
                item: rowData,
                eventBus: this.eventBus,
              },
            );

            let deleteButton = createApp(DatatableActionButton,
              {
                btnId: `deleteUserAction${rowData.id}`,
                btnClass: 'btn-danger text-white',
                iconClass: 'cil-delete',
                eventName: 'user-delete-action',
                item: rowData,
                eventBus: this.eventBus,
              },
            );

            const viewSpan = document.createElement('span');
            const editSpan = document.createElement('span');
            const deleteSpan = document.createElement('span');

            viewButton.mount(viewSpan);
            editButton.mount(editSpan);
            deleteButton.mount(deleteSpan);

            $(cell).empty().append(viewSpan, editSpan, deleteSpan);
          },
        },
      ],
      createSuccessToast: {
        message: "User deleted",
        type: "success",
      },
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error',
      },
      showCreateModal: false,
      showDeleteModal: false,
      confirmDelete: false,
    };
  },
  inject: ['fetcher', 'catcher', 'showToast', 'hasValidAccess'],
  created() {
    if (!this.canListUsers) {
      this.showToast(this.noPermissionsToast);
      this.$router.push('/dashboard');
    }

    this.emitter.on(EMITTERS.CLOSE_MODAL, () => {
      this.onClose();
    });
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = !this.showCreateModal;
    },
    onClose() {
      this.showCreateModal = false;
    },
    async deleteUser(currentUser) {
      this.isLoading = true;
      await this.fetcher(`/api/users/${currentUser.id}`, REQUEST_METHOD.DELETE)
        .then((response) => {
          this.isLoading = false;
          this.showDeleteModal = false;
          this.showToast(this.deleteSuccessToast);
          this.getAllUsers();
        })
        .catch((error) => {
          this.isLoading = false;
          this.catcher(error);
        });
    },
    memberSince(created_at) {
      return moment(created_at).format("MMMM Do YYYY");
    },
  },
};
</script>
