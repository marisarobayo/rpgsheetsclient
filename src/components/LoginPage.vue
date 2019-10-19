<template>
  <div>
    <title-bar></title-bar>
    <app-description> </app-description>
  </div>
</template>

<script>
import TitleBar from './TitleBar.vue'
import AppDescription from './AppDescription.vue'

export default {
  name: 'LoginPage',
  components: {
    TitleBar,
    AppDescription
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
