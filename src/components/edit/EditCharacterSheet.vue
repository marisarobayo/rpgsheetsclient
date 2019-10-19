<template>
  <div class = "columns">
    <div class = "column">
      <router-view> </router-view>
    </div>

    <!-- SIDEBAR AREA
    <div class = "column is-narrow-widescreen menu" style = "width: 300px; font-size: 1.3em; margin: 25px 0px 25px 0px">
      <p class="menu-label">
        Connected
      </p>
      <ul name = "connected" class = "menu-list">
        <li v-for="user in connected" :key="user._id"> {{user.displayName}} </li>
      </ul>

      <p class="menu-label">
        Navigation
      </p>

      <router-view name="menu" class = "menu-list"> </router-view>

    </div>

    -->
  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../../App.vue';

export default {
  name: 'EditCharacterSheet',
  data() { 
    return {
      connected: [{displayName: "Bob", _id: 1}, {displayName: "Alice", _id: 2}]
    }
  },
  methods: {
    
  },
  created(){
    //TODO start websockets connection here
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.full {
  flex:1
}
</style>
