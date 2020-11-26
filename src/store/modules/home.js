export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchCurrency ({commit}) {
      commit('error/clearError', null, {root: true});

      try {
        let res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER}&symbols=RUB,USD,EUR`);

        res = await res.json();

        if (!res.success) {
          await Promise.reject(res.error);
        }

        return res;
      }
      catch (error) {
        commit('error/setError', error, {root: true});
        throw error;
      }
    },
  },
};