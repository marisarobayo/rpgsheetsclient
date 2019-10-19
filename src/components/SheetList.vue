<template>
  <div>
    <h3 class = "title is-3 section"> Character Sheets </h3>
    <div class = "columns" v-for = "sheetGroup in sliceSheets(sheets)" :key = "sheetGroup.id">
      <div class = "card column is-one-quarter" v-for="sheet in sheetGroup.sheets" :key="sheet.id">
        <div class = "card-image">
          <figure class="image is-4by3">
            <img :src="sheet.displayImage" alt="Placeholder image">
          </figure>
        </div>
        <div class = "card-content">
          <router-link :to="'/main/'+ sheet._id + '/main'"> {{sheet.name}} </router-link>
        </div>
        <footer class="card-footer">
          <router-link :to="'/main/'+ sheet._id + '/main'" class="card-footer-item"> Edit</router-link>
          <a href="#" class="card-footer-item" @click="deleteSheet(sheet._id)">Delete</a>
        </footer>
    </div>
    </div>
  </div>
</template>

<script>

import {requester} from '../App.vue';

export default {
  name: 'SheetList',
  data: function() {
    return {
      sheets: [],
      token: this.$store.state.token
    }
  },
  methods: {
    sliceSheets(sheets){
      var newArray = [];
      for(var i = 0; i <= sheets.length; i += 4){
        newArray.push({sheets : sheets.slice(i, i+4), id : i/4});
      }
      return newArray;
    },
    deleteSheet(sheetId){
      console.log(sheetId);
      let token = this.token;
      requester.delete('sheets/'+ sheetId, {
        headers: {
          token
        }
      }).then((response) => {
        this.getSheets();
      }).catch((err) => {
        alert(err);
      })
    },
    getSheets(){
      let token = this.token;
      requester.get('sheets', {
        headers: {
          token
        }
      }).then((response) => {
        this.sheets = response.data;
      }).catch((response) => {
        alert("error");
      })
    }
  },
  created () {
    this.getSheets();
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
