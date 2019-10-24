<template>
  <div>
    <div class="notification is-danger" v-show="wrongLogin"> 
      <button class="delete" @click="wrongLogin = false"></button>
      Invalid credentials.
    </div>
    <div class = "field">
      <label for = "usernameL" class = "label"> Username </label>
      <div class = "control">
        <input id ="usernameL" class = "input" type = "text" placeholder="Username" v-model="username"/>
      </div>
    </div>
    <div class = "field">
      <label for= "passwordL" class = "label"> Password </label>
      <div class = "control">
        <input id = "passwordL" class = "input" type = "password" v-model="password"/>
      </div>
    </div>
    <div class="field">
      <!--<router-link to="/main/gm" class="button is-link">Submit</router-link>-->
      <button class="button is-link" @click="logIn"> Submit </button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../App.vue'; 
import {store} from '../store.js';

export default {
  name: 'LoginForm',
  data: function(){
    return {
      username: "",
      password: "",
      wrongLogin: false
    }
  },
  methods: {
    logIn: _.debounce(function(){
      requester.post('login', {
        username: this.username,
        password: this.password
      }).then(response => {
        let token = response.data.token;
        let isPlayer = response.data.isPlayer;
        store.commit('setToken', token);
        store.commit('setIsPlayer', isPlayer);
        
        this.$router.push('/main')
      }).catch(response => {
        alert(response);
        this.wrongLogin = true;
      })
    }, 2000, {leading: true})
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
