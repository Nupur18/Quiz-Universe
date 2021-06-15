import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL='https://quizapi.io/api/v1/questions';
axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_QUIZ_TOKEN;
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
