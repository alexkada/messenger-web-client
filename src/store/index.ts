import modules from './modules/'
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

const storeData =  {
  state: {
    mobileAnimationType: "none"
  },
  getters: {},
  mutations: {
    setAnimation(state: any, animation: string) {
      state.mobileAnimationType = animation;
    },
    resetAnimation(state: any) {
      state.mobileAnimationType = "none";
    }
  },
  actions: {},
  modules,
 // plugins: [createPersistedState()]
}

Vue.use(Vuex)

export const store = new Vuex.Store(storeData)
