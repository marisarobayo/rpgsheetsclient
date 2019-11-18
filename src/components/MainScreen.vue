<template>
    <div>
        <nav-bar @new-sheet = "newSheet"></nav-bar>
        <router-view @new-sheet = "newSheet"> </router-view>

        <div class="modal" :class="{'is-active': newSheetFormActive}">
          <div class="modal-background"></div>
          <div class="modal-content" >
            <new-sheet-form @sheet-created = "sheetCreated"> </new-sheet-form>
          </div>
          <button class="modal-close is-large" @click="newSheetFormActive = false"></button>
        </div>

    </div>
</template>

<script>

import NavBar from './NavBar.vue'
import NewSheetForm from './NewSheetForm.vue'
export default {
  name: 'MainScreen',
  data(){
    return{
      newSheetFormActive: false
    }
  },
  components: {
      NavBar,
      NewSheetForm
  },
  methods: {
    newSheet(){
      this.newSheetFormActive = true;
    },
    sheetCreated(){
      this.newSheetFormActive = false;
      this.$router.go(); //reloads the current route so new sheets are grabbed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
