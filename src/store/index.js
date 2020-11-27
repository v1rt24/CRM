import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import error from '@/store/modules/message.error';
import home from '@/store/modules/home';
import category from '@/store/modules/category';
import record from '@/store/modules/record';
import planning from '@/store/modules/planning';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    error,
    home,
    category,
    record,
    planning,
  },
});
