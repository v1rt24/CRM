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
    clearError (state) {
      state.error = null;
    },
  },
};