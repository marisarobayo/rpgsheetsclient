<template>
  <div id="app">
    <!--<img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

import axios from 'axios';

let baseURL = process.env.VUE_APP_BASEURL;
if(baseURL == null || baseURL == undefined){
  baseURL = 'https://localhost:3000/';
}

export var requester = axios.create({
  baseURL: baseURL
});

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style> <!-- margin was edited from 60 -->
