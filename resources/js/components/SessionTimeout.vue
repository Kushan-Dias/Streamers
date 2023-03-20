<template>
</template>

<script>
import store from "../store";
import { decodeJwt } from "../utils/app.utils";

export default {
  name: "SessionTimeout",
  data() {
    return {
      timeOutFunc: null,
      alertVisible: false,
    };
  },
  created() {
    this.getSessionTimeOut();
  },
  inject: ['refreshToken', 'forceLogout', 'showAlert', 'showAlertMessage'],
  methods: {
    getSessionTimeOut() {
      const decoded = decodeJwt();
      const vm = this;
      if (decoded) {
        let expTime = new Date(decoded.exp * 1000);

        this.timeOutFunc = setInterval(function () {
          let now = new Date().getTime();
          let timeLeft = expTime - now;

          let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          // console.log(expTime, timeLeft, days, hours, minutes, seconds);

          if (store.state.auth.status.loggedIn && (days === 0 && hours === 0 && minutes === 0 && seconds <= 59)) {
            if (!vm.alertVisible) {
              let timerInterval;
              vm.showAlert({
                title: vm.$t('messages.sessionTimeoutAlert'),
                html: `Your session will end in <b>${seconds}</b> seconds.`,
                timer: (minutes * 60 * 1000) + (seconds * 1000),
                timerProgressBar: true,
                confirmButtonText: vm.$t('actions.refreshSession'),
                showLoaderOnConfirm: true,
                showConfirmButton: true,
                allowOutsideClick: () => false,
                didOpen: () => {
                  const b = vm.$swal.getHtmlContainer().querySelector('b');
                  timerInterval = setInterval(() => {
                    b.textContent = Math.floor(vm.$swal.getTimerLeft() / 1000);
                  }, 1000);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
                preConfirm: async () => {
                  return await vm.refreshToken()
                    .then(response => {
                      clearInterval(vm.timeOutFunc);
                      vm.$forceUpdate();
                      vm.getSessionTimeOut();
                      vm.showAlertMessage(vm.$t('messages.sessionRefreshed'));
                      return response;
                    })
                    .catch(error => {
                      console.log(error);
                      vm.$swal.close();
                      clearInterval(vm.timeOutFunc);
                      vm.forceLogout();
                      vm.showAlertMessage(vm.$t('messages.loginToContinue'));
                      return error;
                    });
                },
              })
                .then((result) => {
                  if (result.dismiss === vm.$swal.DismissReason.timer) {
                    vm.showAlertMessage(vm.$t('messages.loginToContinue'));
                  }
                });
              vm.alertVisible = true;
            }
          }

          if (days <= 0 && hours <= 0 && minutes <= 0 && seconds < 3) {
            vm.forceLogout();
            clearInterval(vm.timeOutFunc);
          }
        }, 1000);
      } else {
        // this.forceLogout();
      }
    },
  },
};
</script>

<style scoped>

</style>
