import { createStore } from 'vuex';
import { auth } from "./modules/auth/auth.module";
import { localization } from "./modules/localization/localization.module";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  getters: {},
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
    TOGGLE_UNFOLDABLE(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
    UPDATE_SIDEBAR_VISIBLE(state, payload) {
      state.sidebarVisible = payload.value;
    },
  },
  actions: {},
  modules: {
    auth,
    localization,
  },

});
