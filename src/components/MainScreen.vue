<template>
    <div>
        <nav-bar></nav-bar>
        <router-view> </router-view>
    </div>
</template>

<script>

import NavBar from './NavBar.vue'
export default {
  name: 'MainScreen',
  components: {
      NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
