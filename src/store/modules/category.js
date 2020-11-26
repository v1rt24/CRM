import { server } from '@/store/server';

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  getters: {},
  mutations: {},
  actions: {
    async createCategories ({commit, rootGetters}, {namecat, limitmoney}) {
      commit('error/clearError', null, {root: true});

      try {
        const userId = (rootGetters['auth/getUser']).id;

        const dataForm = new FormData();
        dataForm.set('namecat', namecat);
        dataForm.set('limitmoney', limitmoney);
        dataForm.set('user_id', userId);

        const res = await fetch(`${server}/category`, {
          method: 'POST',
          body: dataForm,
        });

        const dataRes = await res.json();

        // console.log(dataRes);

        if (!dataRes.status) {
          await Promise.reject(dataRes.message);
        }

        return {
          id: dataRes.post_id,
          namecat,
          limitmoney,
        };
      }
      catch (error) {
        commit('error/setError', error, {root: true});
        throw error;
      }
    },
  },
};