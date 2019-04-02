<template>
    <div>
      <template v-if="users.length && Object.keys(followers).length">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>id</th>
              <th>login</th>
              <th>avatar</th>
              <th>followers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{id, login, avatar_url} in users" :key="id">
              <td>
                {{ id }}
              </td>
              <td>
                {{ login }}
              </td>
              <td>
                <img :src="avatar_url" :alt="login">
              </td>
              <td>
                {{ followers[login] }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else-if="loaded && !users.length && !Object.keys(followers).length">
          There was an error fetching the users!
      </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { setInterval, clearInterval } from 'timers';

export default {
  data: () => ({
    loaded: false,
    followerRefresh: null,
  }),
  computed: {
    ...mapState({
      users: state => state.users.users,
      followers: state => state.users.followers,
    }),
  },
  async created() {
    await this.fetchUsers();
    await this.fetchFollowers();
    this.loaded = true;
    this.followerRefresh = setInterval(() => {
      this.fetchFollowers();
    }, 120000);
  },
  beforeDestroy() {
    this.clearUsers();
    this.clearFollowers();
    clearInterval(this.followerRefresh);
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
      fetchFollowers: 'users/fetchFollowers',
      clearUsers: 'users/clearUsers',
      clearFollowers: 'users/clearFollowers',
    }),
  },
};
</script>
