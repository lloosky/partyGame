import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App.vue';
import axios from 'axios';
import router from './routes/router';
import store from './store';
import './registerServiceWorker';

Vue.use(VueResource);

Vue.config.productionTip = false;
require('../public/css/style.css');

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res);
  return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
