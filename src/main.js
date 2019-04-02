import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store/index';
import './assets/scss/app.scss';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$apiUrl = 'https://api.github.com';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
