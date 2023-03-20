<template>
  <a :href="url">
    <button :id="btnId" type="button" class="btn btn-sm mr-1" :class="[btnClass]" @click="btnClick(item)"
            data-toggle="tooltip"
            data-placement="top" :title="btnTitle">
      <i :class="[iconClass]"></i>
      <span v-if="btnText">{{ btnText }}</span>
    </button>
  </a>
</template>

<script>
export default {
  name: "DatatableActionButton",
  props: {
    btnId: { type: String },
    btnClass: { type: String },
    iconClass: { type: String },
    btnTitle: { type: String, default: 'Click' },
    btnText: { type: String, default: null },
    eventName: { type: String },
    item: { type: Object },
    bus: {},
    url: { type: String }
  },
  mounted() {

  },
  methods: {
    btnClick() {
      if (this.eventName) {
        // console.log('Event', this.eventName, 'fired!');
        // this.eventBus.emit(this.eventName, this.item);
      }
    }
  }
};
</script>

<style scoped>

</style>
