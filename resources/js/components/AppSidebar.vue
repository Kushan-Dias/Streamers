<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'UPDATE_SIDEBAR_VISIBLE',
          value: event,
        })
    "
  >
    <CSidebarBrand>
<!--      <img src="../assets/images/logo.png" alt="logo" height="50">-->
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand>
    <AppSidebarNav :locale="$i18n.locale"/>
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('TOGGLE_UNFOLDABLE')"
    />
  </CSidebar>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { AppSidebarNav } from './AppSidebarNav';
import { logoNegative } from '../assets/brand/logo-negative';
import { sygnet } from '../assets/brand/sygnet';

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  setup() {
    const store = useStore();
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    };
  },
};
</script>
