<template>
  <CTable align="middle" class="mb-0 border" responsive>
    <CTableHead color="secondary">
      <CTableRow>
        <CTableHeaderCell v-for="e in Array.from({length: 10})" :key="e">
          <CPlaceholder component="p" animation="wave">
            <CPlaceholder :xs="9" color="secondary"/>
          </CPlaceholder>
        </CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="r in Array.from({length: 10})" :key="r">
        <CTableDataCell class="align-middle" v-for="e in Array.from({length: 9})" :key="e">
          <CPlaceholder component="p" animation="wave">
            <CPlaceholder :xs="6" size="xs" color="secondary"/>
          </CPlaceholder>
        </CTableDataCell>
        <CTableDataCell v-if="showActions" class="align-middle d-flex justify-content-between">
          <CButton v-c-placeholder="{xs: 3}" size="sm" color="secondary" disabled></CButton>
          <CButton v-c-placeholder="{xs: 3}" size="sm" color="secondary" disabled></CButton>
          <CButton v-c-placeholder="{xs: 3}" size="sm" color="secondary" disabled></CButton>
        </CTableDataCell>
        <CTableDataCell v-else>
          <CPlaceholder component="p" animation="wave">
            <CPlaceholder :xs="6" size="xs" color="secondary"/>
          </CPlaceholder>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>
export default {
  name: "TablePlaceholder",
  props: {
    showActions: {
      type: Boolean,
      default: true
    }
  },
};
</script>

<style scoped>

</style>
