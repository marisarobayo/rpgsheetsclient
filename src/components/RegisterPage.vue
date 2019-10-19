<template>
  <div>
    <title-bar></title-bar>
    <register-form></register-form>
  </div>
</template>

<script>
import TitleBar from './TitleBar.vue'
import RegisterForm from './RegisterForm.vue'

export default {
  name: 'RegisterPage',
  components: {
    TitleBar,
    RegisterForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
