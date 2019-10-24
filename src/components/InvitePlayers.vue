<template>
  <div class = "box small">
    <div class = "title is-3"> Invite Players </div>

    <form class = "container" >

      <br>

      <div class = "field has-addons">
        <div class = "control is-expanded">
          <input id ="search" class = "input" type = "text" v-model = "search" placeholder="Email or username"/>
        </div>
        <div class="control">
          <a class="button is-info" @click="addPlayer()">
            Add
          </a>
        </div>
      </div>

      <br>

      <!--<div class = "field select is-multiple">
       

      </div> -->

      <table name = "players" class = "table is-bordered" style = "margin: 0 auto">
        <tbody>
          <tr v-for="player in players" :key = "player.id">
            <th @click="removePlayer(player)">{{player.name}}</th>
          </tr>
        </tbody>
      </table>

      <br>
      <div class="field">
        <button class="button is-link" @click="invitePlayers()" >Invite Players</button>
      </div>
    </form>

  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../App.vue';


export default {
  name: 'InvitePlayers',
  data() { 
    return {
      players: [],
      search: "",
      token: this.$store.state.token
    }
  },
  props: ['sheetId'],
  methods: {
    addPlayer: _.debounce(async function(){
      let token = this.$store.state.token;

      requester.get('profile/' + this.search,  {
        headers: {
          token
        }
      },
      ).then(response => {
        //Add player if it has not been added already, to prevent duplicates
        if(!isAlreadyAdded(this.players,response.data)){
          this.players.push(response.data);
        }
        
      }).catch(err => {
        alert(err);
      })
    }, 2000, {leading: true}),
    removePlayer: function(player){
      console.log(player);
      var index = this.players.indexOf(player);
      if (index > -1) {
        this.players.splice(index, 1);
      }
    },
    invitePlayers: _.debounce(async function(){
      let token = this.$store.state.token;
      let sheetId = this.sheetId;
      console.log(sheetId);

      requester.put('sheets/' + sheetId + "/invite", {
        players: this.players
      }, {
        headers: {
          token
        }
      },
      ).then(response => {
        this.players = [];
        this.search = "";
        this.$emit('exit');
      }).catch(err => {
        alert(err);
      })
    }, 2000, {leading: true}),
    
  }
}

function isAlreadyAdded(players, player){
  let result = false;
  players.forEach(function(element) {
    if(element.id == player.id){
      result = true;
      return;
    }
  });
  return result;
}

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.small {
  max-width: 500px;
}
</style>
