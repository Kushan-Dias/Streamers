<template>
  <AddMaintenance v-if="canCreateMaintenance" :showCreateModal="showCreateModal"/>
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.maintenanceRequest', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
                v-if="canCreateMaintenance"
                size="sm"
                color="primary"
                class="float-end ml-2"
                @click="openCreateModal"
              >
                <CIcon icon="cilPlus"/>
                <span> {{ $t('actions.create') }}</span>
              </CButton>
            </CCol>
          </CRow>
          <VueDatatable id="maintenances" url="/api/maintenances/datatable" :columns="columns"
                        :columnDefs="columnDefs"/>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { createApp } from "vue";
import $ from "jquery";
import moment from "moment";
import VueDatatable from "../../../../components/VueDatatable";
import DatatableActionButton from "../../../../components/DatatableActionButton";
import AddMaintenance from "./AddMaintenance";

import { EMITTERS } from "../../../../utils/constants";
import { PERMISSIONS } from "../../utils/app.permissions";

export default {
  name: "Maintenances",
  components: {
    AddMaintenance,
    VueDatatable,
  },
  computed: {
    canCreateMaintenance() {
      return this.hasValidAccess(PERMISSIONS.CREATE_MAINTENANCE);
    },
  },
  data() {
    return {
      isLoading: false,
      columns: [
        { "data": "id", "title": "ID", "searchable": true, "orderable": true },
        { "data": "requested_by", "title": "User", "searchable": false, "orderable": false },
        { "data": "asset", "title": "Asset Name", "searchable": false, "orderable": false },
        { "data": "maintainer", "title": "Maintainer", "orderable": false },
        { "data": "status", "title": "Status", "orderable": true },
        { "data": "assigned_at", "title": "Assign Date", "orderable": true },
        { "data": "priority", "title": "Priority", "orderable": true },
        { "data": "created_at", "title": "Create Date", "orderable": true },
        { "data": null, "title": "Actions", "searchable": false, "orderable": false }
      ],
      columnDefs: [
        { className: 'text-center', targets: [3, 4, 5, 6, 7, -1] },
        { className: 'dt-id', targets: [0] },
        { className: 'dt-fixed-100', targets: [1, 2] },
        {
          targets: 0, render: function (id) {
            return `<h5>#${id}</h5>`;
          }
        },
        {
          targets: 1, render: function (requested_by) {
            return `${requested_by.first_name} ${requested_by.last_name}`;
          }
        },
        {
          targets: 2, render: function (asset) {
            return asset.name;
          }
        },
        {
          targets: 3, render: function (maintainer) {
            if (maintainer !== null) {
              return `${maintainer.first_name} ${maintainer.last_name}`;
            } else {
              return `
                <div class='badge badge-danger'>NONE</div>
            `;
            }
          }
        },
        {
          targets: 4, render: function (status) {
            if (status === 'REQUESTED') {
              return `<span class='badge badge-danger'>${status}</span>`;
            } else if (status === 'RESOLVED') {
              return `<span class='badge badge-success'>${status}</span>`;
            } else {
              return `<span class='badge badge-warning'>${status}</span>`;
            }
          }
        },
        {
          targets: 5, render: function (assigned_at) {
            if (assigned_at !== null) {
              return `
              <div>${moment(assigned_at).format('MMMM Do YYYY')}</div>
              <small class="text-secondary">${moment(assigned_at).format('LT')}</small>
              `;
            } else {
              return `
                <span class='badge badge-danger'>NO</span>
            `;
            }
          }
        },
        {
          targets: 6, render: function (priority) {
            if (priority === 'URGENT' || priority === 'HIGH') {
              return `<span class='badge badge-danger'>${priority}</span>`;
            } else if (priority === 'LOW') {
              return `<span class='badge badge-secondary'>${priority}</span>`;
            } else {
              return `<span class='badge badge-warning'>${priority}</span>`;
            }
          }
        },
        {
          targets: 7, render: function (created_at) {
            return `
            <div>${moment(created_at).format('MMMM Do YYYY')}</div>
            <small class="text-secondary">${moment(created_at).format('LT')}</small>
            `;
          }
        },
        {
          targets: -1,
          "createdCell": function (cell, cellData, rowData, row, col) {
            let viewButton = createApp(DatatableActionButton,
              {
                btnId: `viewMaintenanceAction${rowData.id}`,
                btnClass: 'btn-primary text-white',
                iconClass: 'cil-apps',
                eventName: 'maintenances-view-redirect',
                item: rowData,
                eventBus: this.eventBus,
                url: `/maintenances/${rowData.id}`
              },
            );

            let editButton = createApp(DatatableActionButton,
              {
                btnId: `editMaintenanceAction${rowData.id}`,
                btnClass: 'btn-warning',
                iconClass: 'cil-pencil',
                eventName: 'maintenances-edit-redirect',
                item: rowData,
                eventBus: this.eventBus,
              },
            );

            let deleteButton = createApp(DatatableActionButton,
              {
                btnId: `deleteMaintenanceAction${rowData.id}`,
                btnClass: 'btn-danger text-white',
                iconClass: 'cil-delete',
                eventName: 'maintenances-delete-action',
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
      showCreateModal: false,
    };
  },
  inject: ['showToast', 'hasValidAccess'],
  created() {
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
  },
};
</script>

<style>
.dt-id {
  font-weight: 900;
}

.dt-fixed-100 {
  width: 100px;
}
</style>
