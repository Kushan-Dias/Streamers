<template>
  <AddAsset :showCreateModal="showCreateModal"/>
  <CRow>
    <CCol>
      <CCard>
        <CCardBody>
          <CRow class="mb-3">
            <CCol :sm="5">
              <h4 class="card-title mb-0">{{ $tc('labels.asset', 2) }}</h4>
            </CCol>
            <CCol :sm="7" class="d-none d-md-block">
              <CButton
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
          <VueDatatable id="assets" url="/api/assets/datatable" :columns="columns" :columnDefs="columnDefs"/>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { createApp } from "vue";
import moment from "moment";
import VueDatatable from "../../../../../components/VueDatatable";
import DatatableActionButton from "../../../../../components/DatatableActionButton";
import $ from "jquery";
import AddAsset from "./AddAsset";
import { EMITTERS } from "../../../../../utils/constants";

export default {
  name: "Assets",
  components: {
    AddAsset,
    VueDatatable,
  },
  data() {
    return {
      isLoading: false,
      assets: null,
      columns: [
        { "data": "id", "title": "ID", "searchable": true, "orderable": true },
        { "data": "name", "title": "Asset Name", "searchable": true, "orderable": true },
        { "data": "parent", "title": "Parent Name", "searchable": false, "orderable": false },
        { "data": "ongoing_maintenances", "title": "Ongoing Maintenances", "searchable": false, "orderable": false },
        { "data": "created_at", "title": "Create Date", "searchable": false, "orderable": true },
        { "data": null, "title": "Actions", "searchable": false, "orderable": false }
      ],
      columnDefs: [
        { className: 'text-center', targets: [2, 3, 4] },
        {
          targets: 0, render: function (id) {
            return `<h5>#${id}</h5>`;
          }
        },
        {
          targets: 2, render: function (parent) {
            if (parent) {
              return `
            <div>${parent.name}</div>
            <small class="text-secondary fw-bold">#${parent.id}</small>
            `;
            } else {
              return `<div>Root Asset</div>`;
            }
          }
        },
        {
          targets: 3, render: function (ongoing_maintenances) {
            if (ongoing_maintenances.length > 0) {
              return `<span class="badge badge-danger px-3">${ongoing_maintenances.length}</span>`;
            } else {
              return `<span class="badge badge-success">None</span>`;
            }
          }
        },
        {
          targets: 4, render: function (created_at) {
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
                btnId: `viewAssetAction${rowData.id}`,
                btnClass: 'btn-primary text-white',
                iconClass: 'cil-apps',
                eventName: 'maintenances-view-redirect',
                item: rowData,
                eventBus: this.eventBus,
                url: `/maintenances/assets/${rowData.id}`
              },
            );

            let editButton = createApp(DatatableActionButton,
              {
                btnId: `editAssetAction${rowData.id}`,
                btnClass: 'btn-warning',
                iconClass: 'cil-pencil',
                eventName: 'maintenances-edit-redirect',
                item: rowData,
                eventBus: this.eventBus,
              },
            );

            let deleteButton = createApp(DatatableActionButton,
              {
                btnId: `deleteAssetAction${rowData.id}`,
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
  inject: ['showToast'],
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

<style scoped>

</style>
