<template>
  <SessionTimeout v-if="renderSessionTimeout"/>
  <router-view/>
</template>

<script>
import ApiClient from "./utils/api.client";
import SessionTimeout from "./components/SessionTimeout";

import { decodeJwt, hasValidAccess } from "./utils/app.utils";
import { REQUEST_METHOD } from "./utils/enums";
import moment from "moment";

export default {
  name: "App",
  components: {
    SessionTimeout,
  },
  setup() {
    return {
      moment: moment,
    };
  },
  provide() {
    return {
      fetcher: this.fetcher,
      catcher: this.catcher,
      refreshToken: this.refreshToken,
      decodeJwt: decodeJwt,
      hasValidAccess: hasValidAccess,
      showToast: this.showToast,
      showAlertMessage: this.showAlertMessage,
      showAlert: this.showAlert,
      forceLogout: this.forceLogout,
      formatLLLT: this.formatLLLT,
      formatLL: this.formatLL,
      formatLT: this.formatLT,
    };
  },
  data() {
    return {
      renderSessionTimeout: true,
      toastOptions: {
        message: '',
        type: 'default',
        duration: 5000,
        dismissible: true,
        queue: false,
        position: 'bottom-left',
      },
      sessionExpiredToast: {
        message: 'Your session has been expired',
        type: 'error',
        duration: 0,
        dismissible: true,
      },
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error',
      },
      alertOptions: {},
    };
  },
  methods: {
    async fetcher(url, method, data = null, headers = {}, authorized = true) {
      return await ApiClient.request(url, method, data, headers, authorized);
    },
    catcher(error) {
      if (error.response.status === 401) {
        return this.refreshToken();
      }

      if (error.response.status === 403) {
        this.showToast(this.noPermissionsToast);
        return;
      }

      if (error.response.status >= 400 && error.response.status < 500) {
        this.showToast({
          message: 'Error: ' + error.response.status,
          type: 'error',
        });
      }

      if (error.response.status === 500) {
        this.showToast({
          message: 'Something went wrong',
          type: 'error',
        });
      }
    },
    async refreshToken() {
      return await this.fetcher('/api/auth/refresh', REQUEST_METHOD.GET, null, {}, true, false)
        .then(response => {
          if (response.status === 200) {
            let token = response.data.data.access_token;
            localStorage.setItem('token', token);
            this.forceRerenderSessionTimeout();
          }
        }).catch(error => {
          this.forceLogout();
          this.catcher(error);
        });
    },
    showToast(options = {}) {
      let opts = Object.assign(this.toastOptions, options);
      return this.$toast.open(opts);
    },
    showAlertMessage(message) {
      return this.$swal(message);
    },
    showAlert(options) {
      let opts = Object.assign(this.alertOptions, options);
      return this.$swal.fire(opts);
    },
    forceLogout() {
      this.$store.dispatch('auth/logout')
        .then(
          (response) => {
            this.$router.push('/login');
            this.showToast(this.sessionExpiredToast);
          },
          (error) => {
            this.$router.push('/login');
            this.showToast(this.sessionExpiredToast);
          },
        );
    },
    forceRerenderSessionTimeout() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    formatLLLT(dateTime) {
      if (dateTime) {
        return moment(dateTime).local().format('LL LT');
      } else {
        return "";
      }
    },
    formatLL(time) {
      if (time) {
        return moment(time).local().format('LL');
      } else {
        return "";
      }
    },
    formatLT(time) {
      if (time) {
        return moment(time).local().format('LT');
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
