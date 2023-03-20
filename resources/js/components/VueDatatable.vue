<template>
  <table :id="id" class="w-100 table table-sm table-striped table-hover ">
    <thead>
    <tr>
      <th v-for="column in getColumns" v-html="title(column)"></th>
    </tr>
    </thead>
    <tfoot v-if="footer">
    <tr>
      <th v-for="column in getColumns" v-html="column.footer"></th>
    </tr>
    </tfoot>
  </table>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

import $ from 'jquery';
import _ from 'lodash';
import { REQUEST_METHOD } from "../utils/enums";
import { EMITTERS } from "../utils/constants";

export default {
  name: "VueDatatable",
  props: {
    id: { type: String, required: true },
    footer: { type: Boolean, default: false },
    url: { type: String, required: true },
    columns: { type: Array, required: true },
    columnDefs: { type: Array },
    enableGlobalSearch: { type: Boolean, default: true },
    additionalParams: { type: Object },
    hiddenData: { type: Array, default: [] },
    enableSelectAll: { type: Boolean, default: false },
    reloadTable: { type: Boolean, default: false }
  },
  data() {
    return {
      searchString: [],
      orderBy: {},
      dataTable: null,
    };
  },
  inject: ['fetcher', 'catcher'],
  computed: {
    getGridData: {
      get: function () {
        return this.griddata;
      }
    },
    getUrl: {
      get: function () {
        return this.url;
      }
    },
    getColumns: {
      get: function () {
        return this.columns;
      }
    },
    getAdditionalParam: {
      get: function () {
        return this.additionalParams;
      }
    }
  },
  async mounted() {
    this.initializeDataTable();

    this.emitter.on(EMITTERS.RELOAD_DATATABLE, () => {
      this.dataTable.ajax.reload();
    });

    this.searchAreaSyntax = `<div class="input-group input-group-sm">
          <input type="text" class="form-control">
          <span class="input-group-append">
	        <button type="button" class="btn btn-info btn-flat"><i class="fas fa-search"></i></button>
          </span>
          <span class="input-group-append">
	        <button type="button" class="btn btn-info btn-flat"><i class="fas fa-times"></i></button>
          </span>
        </div>`;
  },
  destroyed() {
    this.dataTable.destroy();
  },
  methods: {
    initializeDataTable() {
      this.dataTable = $(this.$el).DataTable({
        autoWidth: false,
        deferRender: true,
        responsive: true,
        scrollX: true,
        orderCellsTop: true,
        fixedHeader: true,
        searching: this.enableGlobalSearch,
        columnDefs: this.columnDefs,
        pagingType: "full_numbers",
        ajax: this.populateDataTable,
        columns: this.getColumns,
        serverSide: true,
        processing: true
      });

      this.customizeDatatable(this.getColumns, this.dataTable);
    },
    title(column) {
      return column.title || column.data;
    },
    populateDataTable(data, callback, settings) {
      if (data) {
        const orderBy = data.order[0];
        data.orderBy = {};
        data.orderBy.fieldName = settings.aoColumns[orderBy.column].mData;
        data.orderBy.order = orderBy.dir;
      }
      this.tableDataFetcher(data).then((jsonRes) => {
        const dataSet = {
          "data": jsonRes.data.data.data,
          "draw": jsonRes.data.data.draw,
          "recordsTotal": jsonRes.data.data.recordsTotal,
          "recordsFiltered": jsonRes.data.data.recordsFiltered,
        };

        callback(dataSet);
        // EventBus.$emit('set-selected-rows');
      });
    },
    async tableDataFetcher(data) {
      //debugger;
      data.searchString = this.searchString;
      data.additionalParams = this.additionalParams;

      return await this.fetcher(this.getUrl, REQUEST_METHOD.POST, data)
        .then(json => {
          if (json) {
            return json;
          }
        })
        .catch(error => {
          this.catcher(error);
        });
    },
    customizeDatatable(colConfig, dataTable) {
      // debugger;
      const searchable = _.filter(colConfig, { searchable: true });
      this.setupSearchFields(searchable, dataTable);
      this.selectAll(dataTable);
    },
    setupSearchFields(searchableCols, dataTable) {
      const methodContext = this;
      const tableId = dataTable.table().node().id;
      //add textboxes to columns if datacolumn search is enabled
      $(`#${tableId} thead tr:eq(1) th`).each(function () {
        //debugger;
        if (_.findIndex(searchableCols, { sTitle: this.innerText }) > -1) {
          $(this).html(`<input type="text" style="width:150px" aria-description="${this.innerText}" placeholder="Search" class="column_search" />`);
        } else
          $(this).html('');
      });
      // now register Enter key to submit the search
      // debugger;
      $('input.column_search').on('keyup', function (e) {
        /* Ignore all keyup events except for return keys */
        if (e.type === 'keyup' && e.keyCode !== 10 && e.keyCode !== 13) return;
        methodContext.searchString.length = 0; // reset old values
        //debugger;
        $('input.column_search').each(function () {
          if (this.attributes.length === 0) return;
          const searchField = this.attributes['aria-description'].value.trim();
          const fieldValue = $(this).val();
          // ignore any without search field name & a value in text-box
          // if ((searchField === null || searchField === '') || (fieldValue === null || fieldValue === '')) return;

          methodContext.searchString.push({ "DiplayName": searchField, "Value": fieldValue });
        });

        // now prepare order column details
        dataTable.search(e.target.value).draw();
      });
    },
    selectAll(dataTable) {
      if (this.enableSelectAll) {
        const tableId = dataTable.table().node().id;
        const th = $(`#${tableId} thead tr:eq(1) th:first`);

        th.html(`<div class="checkbox"><input type="checkbox" id="selectall" class="dt-checkboxes" ></div>`);

        $('#selectall').change(function () {
          // EventBus.$emit('onAllSelected', this.checked);
        });
      }

    }

  },
  watch: {
    griddata: {
      handler(val, oldVal) {
        console.log(val);
        console.log(oldVal);
      }
    },
    additionalParams: {
      handler(val, oldVal) {
        console.log('additional param changed');
        // this.dataTable.draw(false);
        //this.dataTable.ajax.reload(null,false);
      }
    },
    reloadTable: {
      handler(val, oldVal) {
        if (val === true) {
          console.log('reload datatable called');
          this.dataTable.draw();
        }
      }
    }
  },
};
</script>

<style>
.dataTables_scrollBody {
  min-height: 500px;
}
</style>
