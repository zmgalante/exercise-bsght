<template>
    <div>
      <template v-if="repositories.length">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>stars</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{id, name, description, stargazers_count: stars} in repositories" :key="id">
              <td>
                {{ id }}
              </td>
              <td>
                {{ name }}
              </td>
              <td>
                {{ description }}
              </td>
              <td>
                {{ stars }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else-if="loaded && !repositories.length">
          There was an error fetching the repositories!
      </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    loaded: false,
  }),
  computed: {
    ...mapState({
      repositories: state => state.repositories.repositories,
    }),
  },
  async created() {
    await this.fetchRepositories();
    this.loaded = true;
  },
  beforeDestroy() {
    this.clearRepositories();
  },
  methods: {
    ...mapActions({
      fetchRepositories: 'repositories/fetchRepositories',
      clearRepositories: 'repositories/clearRepositories',
    }),
  },
};
</script>
