// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    userRole: 'agent' // Default role, this should be set based on actual user data
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    }
  },
  actions: {
    updateUserRole({ commit }, role) {
      commit('setUserRole', role);
    }
  },
  getters: {
    getUserRole: state => state.userRole
  }
});
