<template>
  <CButtonGroup role="group">
    <CTooltip :content="$t('actions.view')" placement="top">
      <template #toggler="{ on }">
        <CButton v-on="on" @click="() => {this.$router.push(`/users/${user.id}`);}" color="primary" size="sm">
          <CIcon icon="cilBlur" size="sm"/>
        </CButton>
      </template>
    </CTooltip>
    <CTooltip :content="$t('actions.edit')" placement="top">
      <template #toggler="{ on }">
        <CButton v-on="on" @click="() => {this.$router.push(`/users/${user.id}/edit`);}" color="warning" size="sm">
          <CIcon icon="cilPencil" size="sm"/>
        </CButton>
      </template>
    </CTooltip>
    <CTooltip :content="$t('actions.delete')" placement="top">
      <template #toggler="{ on }">
        <CButton v-on="on" @click="() => {currentUser = user;showDeleteModal = true;}" color="danger" size="sm">
          <CIcon icon="cilTrash" size="sm"/>
        </CButton>
      </template>
    </CTooltip>
  </CButtonGroup>
</template>

<script>
export default {
  name: "DatatableActions"
};
</script>

<style scoped>

</style>
