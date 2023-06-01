<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('TOGGLE_SIDEBAR')">
        <CIcon icon="cil-menu" size="lg"/>
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo"/>
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/dashboard">{{ $t('labels.dashboard') }}</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/users">{{ $tc('labels.user', 2) }}</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/streamer">{{ $tc('labels.streamer', 2) }}</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderLocaleDropdown/>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg"/>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg"/>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg"/>
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt/>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider/>
    <CContainer fluid>
      <AppBreadcrumb/>
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb';
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt';
import AppHeaderLocaleDropdown from './AppHeaderLocaleDropdown';
import { logo } from '../assets/brand/logo';

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
    AppHeaderLocaleDropdown,
  },
  setup() {
    return {
      logo,
    };
  },
};
</script>
