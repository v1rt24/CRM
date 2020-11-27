import { server } from '@/store/server';

export default {
  namespaced: true,
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
    async fetchCategories ({commit, rootGetters}) {
      commit('error/clearError', null, {root: true});

      try {
        const user_id = (rootGetters['auth/getUser']).id;

        const res = await fetch(`${server}/category/${user_id}`);

        return await res.json();
      }
      catch (error) {
        throw error;
      }
    },
    async updateCategory ({rootGetters}, {id, namecat, limitmoney}) {
      try {
        const user_id = (rootGetters['auth/getUser']).id;

        const res = await fetch(`${server}/category/${user_id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            id,
            namecat,
            limitmoney,
          }),
        });

        const dataRes = await res.json();

        if (!dataRes.status) {
          await Promise.reject(dataRes.message);
        }

        return dataRes.message;
      }
      catch (error) {
        throw error;
      }
    },
  },
};