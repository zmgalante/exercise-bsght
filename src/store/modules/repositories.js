import axios from 'axios';
import dayjs from 'dayjs';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint no-param-reassign:["error",{"props": true, "ignorePropertyModificationsFor":["state"]}] */

const state = {
  repositories: [],
};
const getters = {};
const mutations = {
  updateRepositories(state, repositories) {
    state.repositories = repositories;
  },
};
const actions = {
  fetchRepositories({ commit }) {
    const date = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    return axios.get(`https://api.github.com/search/repositories?q=created:">${date}"&sort=stars&per_page=5`)
      .then((response) => {
        if (response && response.data && response.data.items) {
          commit('updateRepositories', response.data.items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  clearRepositories({ commit }) {
    commit('updateRepositories', []);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
