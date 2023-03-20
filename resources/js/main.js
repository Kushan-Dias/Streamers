import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';

import mitt from 'mitt';
import i18n from "./lang/i18n";

import CoreuiVue from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from './assets/icons';
import ToastPlugin from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import VueEasyLightbox from 'vue-easy-lightbox';

import TablePlaceholder from "./components/placeholders/TablePlaceholder";

// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-datepicker-next/index.css';
import 'vue3-carousel/dist/carousel.css';


const emitter = mitt();
const app = createApp(App);

app.use(i18n)
  .use(store)
  .use(router)
  .use(CoreuiVue)
  .use(ToastPlugin)
  .use(VueSweetalert2)
  .use(VueEasyLightbox);

app.config.globalProperties.emitter = emitter;

app.provide('icons', icons);

app.component('CIcon', CIcon)
  .component('TablePlaceholder', TablePlaceholder);

app.mount('#app');
