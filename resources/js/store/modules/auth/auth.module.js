import ApiClient from "../../../utils/api.client";
import { decodeJwt } from "../../../utils/app.utils";
import { REQUEST_METHOD } from "../../../utils/enums";

const token = localStorage.getItem('token');
const initialState = token
  ? {
    status: {
      loggedIn: true
    },
    token: token,
    jwtPayload: decodeJwt(token),
  }
  : {
    status: {
      loggedIn: false
    },
    token: null,
    jwtPayload: {},
  };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      return await ApiClient.request('/api/auth/login', REQUEST_METHOD.POST, user)
        .then(
          response => {
            if (response.data.data.access_token) {
              localStorage.setItem('token', response.data.data.access_token);
              commit('LOGIN_SUCCESS', response.data);
            }
            return Promise.resolve(response.data);
          },
          error => {
            commit('LOGIN_FAILURE');
            return Promise.reject(error);
          },
        );
    },
    async logout({ commit }) {
      await ApiClient.request('/api/auth/logout', REQUEST_METHOD.POST)
        .then(
          res => {
            commit('LOGOUT');
            return Promise.resolve(res);
          },
          error => {
            commit('LOGOUT');
            return Promise.reject(error);
          },
        );
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
  },
  mutations: {
    LOGIN_SUCCESS(state, data) {
      state.status.loggedIn = true;
      state.token = data.access_token;
      state.jwtPayload = decodeJwt(state.token);
    },
    LOGIN_FAILURE(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    LOGOUT(state) {
      state.status.loggedIn = false;
      state.token = null;
      state.jwtPayload = {};
      localStorage.removeItem('token');
    },
    REGISTER_SUCCESS(state) {
      state.status.loggedIn = false;
    },
    REGISTER_FAILURE(state) {
      state.status.loggedIn = false;
    },
    SET_TOKEN(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
      state.jwtPayload = decodeJwt(state.token);
    },
  },
};
