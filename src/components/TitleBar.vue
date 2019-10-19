<template>
<div>
  <div class = "hero">
    <div class = "hero-body level">
      <div class = "level-item">
        <div>
          <div class = "title is-2 topbar">
          RPGSheets
          </div>
          <div class = "">
            Creating Characters. Simplified.
          </div>
        </div>
      </div>
      <div class = "dropdown is-right" :class="{ 'is-active': drop }" v-click-outside="hideDropdown">
        <div class = "dropdown-trigger"> 
          <button class = "title button is-link is-medium is-rounded" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleDropdown"> Log in </button>
        </div>
        
        <div class = "dropdown-menu" id="dropdown-menu" role="menu"> 
          <div class = "dropdown-content">
            <div class = "dropdown-item">
              <login-form></login-form>
            </div>
          </div>
      </div>
  </div>
    </div>
  </div>
  
</div>
</template>

<script>

import LoginForm from './LoginForm.vue'

export default {
  name: 'TitleBar',
  components: {
    LoginForm
  },
  data: function() {
    return {
       drop: false
    }
  },
  methods: {
    toggleDropdown(){
      this.drop = !this.drop;
    },
    hideDropdown(){
      if(this.drop){
        this.drop = false;
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
div {
  /*background-color : #00ccff;*/
  text-align: center;
  font-family: 'Century Gothic', 'Tahoma', 'Verdana'
}
.hero {
  background-image: linear-gradient(to bottom right, #00ffff, #0099cc);
}
.topbar {
  margin-top: 10px;
}
</style>
