<template>
<div>

  <nav class="navbar nav is-fixed-top" role="navigation" >
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

        <a class="navbar-item" @click= "newSheet()">
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

</div>
</template>

<script>
import {requester} from '../App.vue'; 
import {store} from '../store.js';

export default {
  name: 'NavBar',
  data: function() {
    return {
       drop: false,
       displayName: ""
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
    newSheet(){
      this.$emit("new-sheet");
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
