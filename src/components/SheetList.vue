<template>
  <div>
    <br/>
    <h3 class = "title is-4 section" v-if="sheets.length > 0"> Character Sheets </h3>
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
          <a href="#" class="card-footer-item" @click="invitePlayersFormActive = true; sheetIdInvite = sheet._id">Invite players</a>
        </footer>
      </div>
    </div>

    <div class = "section" v-if="sheets.length < 1">
      <div class = "title is-4"> You don't have any character sheets yet! Start creating one!</div>
      <a class = "button is-medium is-primary" @click = "newSheet()">  Create new sheet </a>
    </div>

    <div class="modal" :class="{'is-active': invitePlayersFormActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <invite-players @exit = "exit" :sheetId = sheetIdInvite> </invite-players>
      </div>
      <button class="modal-close is-large" @click="invitePlayersFormActive = false"></button>
    </div> 

  </div>
</template>
<script>

import {requester} from '../App.vue';
import InvitePlayers from './InvitePlayers.vue';

export default {
  name: 'SheetList',
  data: function() {
    return {
      sheets: [],
      token: this.$store.state.token,
      invitePlayersFormActive: false,
      sheetIdInvite: ""
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
    },
    exit(){
      this.invitePlayersFormActive = false;
    },
    newSheet(){
      this.$emit("new-sheet");
    }
  },
  created () {
    this.getSheets();
  },
  components: {
    InvitePlayers
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
