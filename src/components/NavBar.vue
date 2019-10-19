<template>
<div>

  <nav class="navbar nav" role="navigation" >
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <strong>RPGSheets</strong>
      </a>

      <a role="button" class="navbar-burger" :class = "{ 'is-active': drop }" @click="toggleDropdown" data-target="navbarBasicExample">
        <span></span>
        <span></span>
        <span></span>
        
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class = "{ 'is-active': drop }">
      <div class="navbar-start">
        <router-link to = "/main" class="navbar-item">
          View Sheets
        </router-link>

        <a class="navbar-item" @click= "newSheetFormActive = true">
          New Sheet
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class = "dropdown is-right is-hoverable" >
            <div class = "dropdown-trigger"> 
              <a class = "title is-6" @click="toggleDropdown"> Hello, {{displayName}} </a>
            </div>
            <div class = "dropdown-menu" id="dropdown-menu" role="menu"> 
              <div class = "dropdown-content">
                <div class = "dropdown-item">
                  <a href = "#"> Profile </a>
                </div>
                <div class = "dropdown-item">
                  <a href = "#" @click="logOut"> Log out </a>
                </div>
              </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </nav>

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
import {requester} from '../App.vue'; 
import {store} from '../store.js';
import NewSheetForm from './NewSheetForm.vue';

export default {
  name: 'NavBar',
  data: function() {
    return {
       drop: false,
       displayName: "",
       newSheetFormActive: false
    }
  },
  methods: {
    toggleDropdown(){
      this.drop = !this.drop;
    },
    logOut(){
      requester.delete('logout').then((response) => {
        store.commit('setToken', "");
        store.commit('setIsPlayer', true);
        this.$router.push('/')
      })
    },
    sheetCreated(){
      this.newSheetFormActive = false;
      this.$router.go(); //reloads the current route so new sheets are grabbed
    }
  },
  created(){
    let token = this.$store.state.token;
    requester.get("profile", {
      headers: {
        token
      }
    }).then((response) => {
      this.displayName = response.data.displayName;
    })
  },
  components: {
    NewSheetForm
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.nav {
  background-color : #00ccff;
  font-family: 'Century Gothic', 'Tahoma', 'Verdana'
}
</style>
