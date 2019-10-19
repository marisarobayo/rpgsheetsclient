<template>
  <div id="app">
    <!--<img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

import axios from 'axios';

export var requester = axios.create({
  baseURL: 'https://localhost:3000/'
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
