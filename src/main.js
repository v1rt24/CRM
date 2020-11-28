import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';
import Messages from '@/utils/message.plagin';
import Preloader from '@/components/app/Preloader';
import DataFilter from '@/filters/dataFilter';
import PriceFilter from '@/filters/price.filter';
import tooltipDirective from '@/directives/tooltip.derective';
import Paginate from 'vuejs-paginate';

import 'material-design-icons-iconfont';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/css/index.css';

Vue.use(Vuelidate);
Vue.use(Messages);
Vue.component('Preloader', Preloader);
Vue.filter('dataFilter', DataFilter);
Vue.filter('priceFilter', PriceFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Paginate', Paginate);

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
