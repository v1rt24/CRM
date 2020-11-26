import { server } from '@/store/server';
import {
  setLocalStorage,
  clearLocalStorage,
} from '@/utils/localStorageData';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    clearUser (state) {
      state.user = null;
    },
  },
  actions: {
    async registrationUser ({commit}, {email, password, name, bill}) {
      commit('error/clearError', null, {root: true});

      try {
        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);
        formData.set('name', name);
        formData.set('bill', bill);

        const res = await fetch(`${server}/usersReg`, {
          method: 'POST',
          body: formData,
        });

        const resData = await res.json();

        // console.log(resData);

        if (!resData.status) {
          await Promise.reject(resData);
        }

        setLocalStorage('token', resData.user_id);

        commit('setUser', {
          id: resData.user_id,
          name,
          bill,
        });
      }
      catch (error) {
        commit('error/setError', error.message, {root: true});
        throw error;
      }
    },
    async authUser ({commit}, {email, password}) {
      commit('error/clearError', null, {root: true});

      try {
        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);

        const res = await fetch(`${server}/usersAut`, {
          method: 'POST',
          body: formData,
        });

        const resData = await res.json();

        // console.log(resData);

        if (!resData.status) {
          await Promise.reject(resData);
        }

        setLocalStorage('token', resData.user_id);

        commit('setUser', {id: resData.user_id, name: resData.name, bill: resData.bill});
      }
      catch (error) {
        commit('error/setError', error.message, {root: true});
        throw error;
      }
    },
    logoutUser ({commit}) {
      commit('clearUser');
      clearLocalStorage('token');
    },
    async authObserver ({commit}, id) {
      try {
        const res = await fetch(`${server}/authorizationUserId/${id}`);

        const resData = await res.json();

        // console.log(resData.data);

        if (!resData.status) {
          await Promise.reject(resData);
        }

        commit('setUser', {id, name: resData.data.name, bill: resData.data.bill});
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};