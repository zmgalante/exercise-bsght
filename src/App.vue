<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Bitsight Exercise</h1>
        <div class="container">
          <button
            class="button"
            type="button"
            id="hot_repo"
            :class="{
              'is-loading': loading && activeTable === 'hot_repo'
            }"
            @click="activeTable = 'hot_repo'">
              Repositories
          </button>
          <button
            class="button"
            type="button"
            id="prolific_users"
            :class="{
              'is-loading': loading && activeTable === 'prolific_users'
            }"
            @click="activeTable = 'prolific_users'">
              Users
          </button>
          <Component
            :is="tableComponent"
            @hook:created="loading = true"
            @hook:updated="loading = false"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    activeTable: 'hot_repo',
    loading: false
  }),
  computed: {
    tableComponent() {
      const ComponentName = this.activeTable === 'hot_repo' ? 'RepositoriesTable' : 'UsersTable';
      return () => import (`./components/${ComponentName}.vue`)
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
