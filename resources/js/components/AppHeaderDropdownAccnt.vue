<template>
  <Loading v-model:active="isLoading" :is-full-page="false"/>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="$store.state.auth.jwtPayload.avatar_url ? $store.state.auth.jwtPayload.avatar_url : avatar" size="md"/>
    </CDropdownToggle>
    <CDropdownMenu>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-user"/>
        Profile
      </CDropdownItem>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Settings
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-settings"/>
        Settings
      </CDropdownItem>
      <CDropdownDivider/>
      <CDropdownItem @click="handleLogout">
        <CIcon icon="cil-lock-locked"/>
        Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import Loading from "vue-loading-overlay";
import avatar from '../assets/images/avatar-default.png';

export default {
  name: 'AppHeaderDropdownAccnt',
  components: {
    Loading,
  },
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout')
        .then(
          (response) => {
            this.$router.push('/login');
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            this.$router.push('/login');
          },
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  .dropdown-item {
    cursor: pointer;
  }
}
</style>
