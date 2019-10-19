import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: "",
    isPlayer: false
  },
  mutations: {
      setToken: function (state, token) {
          this.state.token = token;
      },
      setIsPlayer: function(statee,isPlayer) {
          this.state.isPlayer = isPlayer;
      }
  },
  plugins: [
      //TODO SI VOY A SUBIR ESTO A HEROKU SECURE TIENE QUE SER TRUE
      createPersistedState({
          getState: (key) => Cookies.getJSON(key),
          setState: (key, state) => Cookies.set(key, state, {expires: 1, secure: false})
      })
  ]

});