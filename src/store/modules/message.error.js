export default {
  namespaced: true,
  state: {
    error: null,
  },
  getters: {
    getError: state => state.error,
  },
  mutations: {
    setError (state, error) {
      state.error = error;
    },
    ClearError (state) {
      state.error = null;
    },
  },
};