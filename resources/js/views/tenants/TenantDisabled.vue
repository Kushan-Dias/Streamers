<template>
  <div class="container py-4">
    <CAlert color="danger" v-bind:visible="true">
      <CAlertHeading>Tenant disabled</CAlertHeading>
      <p>This tenant has been disabled by the administration.</p>
      <hr/>
      <p class="mb-0">Please contact 555-5555-5555</p>
    </CAlert>
  </div>
</template>

<script>
export default {
  name: "TenantDisabled",
};
</script>

<style scoped>

</style>
