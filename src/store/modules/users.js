import axios from 'axios';
import dayjs from 'dayjs';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint no-param-reassign:["error",{"props": true, "ignorePropertyModificationsFor":["state"]}] */

const state = {
  users: [],
  followers: {},
};
const getters = {};
const mutations = {
  updateUsers(state, users) {
    state.users = users;
  },
  updateFollowers(state, followers) {
    state.followers = followers;
  },
};
const actions = {
  fetchUsers({ commit, state }) {
    const date = dayjs().startOf('year').format('YYYY-MM-DD');
    return axios.get(`https://api.github.com/search/users?q=created:">${date}"&sort=followers&per_page=5`)
      .then((response) => {
        if (response && response.data && response.data.items) {
          commit('updateUsers', response.data.items);
          commit('updateFollowers', state.users.reduce((object, user) => ({ ...object, [user.login]: 0 }), {}));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchFollowers({ commit, state }) {
    if (state.users.length) {
      const { followers } = state;

      if (Object.keys(followers).length) {
        const fetchUserFollowers = [];
        Object.keys(followers).forEach((follower) => {
          const request = axios.get(`https://api.github.com/users/${follower}`)
            .then((response) => {
              if (response && response.data) {
                followers[follower] = response.data.followers;
              }
            });
          fetchUserFollowers.push(request);
        });
        Promise.all(fetchUserFollowers).then(() => {
          commit('updateFollowers', followers);
        });
      }
    }
  },
  clearUsers({ commit }) {
    commit('updateUsers', []);
  },
  clearFollowers({ commit }) {
    commit('updateFollowers', {});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
