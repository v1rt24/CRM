import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import error from '@/store/modules/message.error';
import home from '@/store/modules/home';
import category from '@/store/modules/category';

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
  },
});
