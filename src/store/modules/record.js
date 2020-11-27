import { server } from '@/store/server';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createRecord ({rootGetters}, record) {
      const dataForm = new FormData();
      dataForm.set('category_id', record.category_id);
      dataForm.set('type', record.type);
      dataForm.set('amount', record.amount);
      dataForm.set('description', record.description);
      dataForm.set('user_id', record.user_id);

      try {
        const res = await fetch(`${server}/createRecord`, {
          method: 'POST',
          body: dataForm,
        });

        const dataRes = await res.json();

        if (!dataRes.status) {
          await Promise.reject(dataRes);
        }

        return dataRes;
      }
      catch (error) {
        throw error;
      }
    },
    async updateUserBill ({rootGetters, dispatch}, bill) {
      try {
        const user_id = rootGetters['auth/getUser'].id;

        const res = await fetch(`${server}/updateUser/${user_id}`, {
          method: 'PATCH',
          body: JSON.stringify({bill}),
        });

        const dataRes = await res.json();

        if (!dataRes.status) {
          await Promise.reject(dataRes);
        }

        dispatch('auth/authObserver', user_id, {root: true});

        return dataRes;
      }
      catch (error) {
        throw error;
      }
    },
    async fetchRecords ({rootGetters}) {
      try {
        const user_id = rootGetters['auth/getUser'].id;

        const res = await fetch(`${server}/getRecords/${user_id}`);

        const dataRes = await res.json();

        if (!dataRes.status) {
          await Promise.reject(dataRes);
        }

        return dataRes.data;
      }
      catch (error) {
        throw error;
      }
    },
  },
};