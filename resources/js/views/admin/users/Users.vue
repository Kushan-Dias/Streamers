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
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.user', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
                size="sm"
                color="primary"
                class="float-end ml-2"
                @click="() => {this.$router.push('/users/create');}"
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
        </CCardHeader>
        <CCardBody>
          <!-- Users Table -->
          <VueDatatable id="users" url="/api/users/datatable" :columns="columns" :columnDefs="columnDefs"/>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { createApp } from "vue";
import moment from "moment";
import Loading from "vue-loading-overlay";
import VueDatatable from "../../../components/VueDatatable";
import DatatableActionButton from "../../../components/DatatableActionButton";
import $ from 'jquery';
import { REQUEST_METHOD } from "../../../utils/enums";

export default {
  name: "Users",
  components: {
    Loading,
    VueDatatable,
    DatatableActionButton
  },
  computed: {
    windowLocationProtocol() {
      return window.location.protocol;
    },
    windowLocationHost() {
      return window.location.host;
    },
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      defaultAvatarURL:
        "https://st4.depositphotos.com/1156795/20814/v/380/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg?forcejpeg=true",
      users: [],
      currentUser: {},
      deleteSuccessToast: {
        message: "User deleted",
        type: "success",
      },
      showCreateModal: false,
      showDeleteModal: false,
      confirmDelete: false,
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
        {
          targets: 0, render: function (avatar_url) {
            return `
            <div style="height: 35px; width: 35px;">
              <img
                class="avatar-img"
                src=${avatar_url != null
              ? avatar_url
              : "https://st4.depositphotos.com/1156795/20814/v/380/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg?forcejpeg=true"}
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
            return moment(data).format('MMMM Do YYYY');
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
    };
  },
  setup() {
    return {
      windowLocationProtocol: window.location.protocol,
      windowLocationHost: window.location.host,
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
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
