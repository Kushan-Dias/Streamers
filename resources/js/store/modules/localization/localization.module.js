const lang = localStorage.getItem('lang');
const initialState = lang
  ? { lang: lang }
  : { lang: 'en-US' };

export const localization = {
  namespaced: true,
  state: initialState,
  getters: {
    lang: state => {
      return state.lang;
    }
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
    },
    GET_LANG(state) {
      return state.lang;
    },
  },
  actions: {
    setLang({ commit }, lang) {
      localStorage.setItem('lang', lang);
      commit('SET_LANG', lang);
    },
    getLang({ commit }) {
      let lang = localStorage.getItem('lang');
      commit('GET_LANG', lang);
    },
  },
};
