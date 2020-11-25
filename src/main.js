import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';
import Messages from '@/utils/message.plagin';

Vue.use(Vuelidate);
Vue.use(Messages);

import 'material-design-icons-iconfont';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/css/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      router.push({
        name: 'Login',
        query: {message: 'login'},
      });
      return;
    }

    store.dispatch('auth/authObserver', token);
  },
}).$mount('#app');
