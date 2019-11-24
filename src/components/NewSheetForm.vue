<template>
  <div class = "box">
    <div class = "title is-3"> New Character Sheet </div>

    <form class = "container" >

      <br>
      
      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for = "nameL" class = "label"> Name</label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id ="nameL" class = "input" type = "text" placeholder="Sheet name" v-model = "name" />
            </div>
          </div>
        </div>
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for = "gameL" class = "label"> Game </label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <label class = "radio">
                <input id = "gameL" type = "radio" v-model = "game" value = "dw" checked/>
                Dungeon World
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" ref="file" accept="image/*" @change="handleFile()">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Portrait image...
            </span>
          </span>
          <span class="file-name">
            {{image.name}}
          </span>
        </label>
      </div>

      <!--
      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for= "playersL" class = "label"> Invite players </label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id = "playersL" class = "input" :class = "{'is-danger' : playersIncorrect}" type = "password" v-model = "players"/>
            </div>
            <p class = "help is-danger left" v-show="playersIncorrect"> Passwords do not match </p>
          </div>
        </div>
      </div>
      -->
      <br>
      <div class="field">
        <a class="button is-link" @click="postSheet()" >Create Sheet</a>
        <a class="button is-danger" @click="close()" >Cancel</a>
      </div>
    </form>

  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../App.vue';

export default {
  name: 'NewSheetForm',
  data() { 
    return {
      name: "",
      game: "",
      image: "",
      players: [],
      playersIncorrect: false
    }
  },
  methods: {
    handleFile: function(){
      this.image = this.$refs.file.files[0];
    },
    postSheet: _.debounce(async function(){
      let token = this.$store.state.token;

      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('game', this.game);
      formData.append('image', this.image);

      requester.post('sheets', formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      },
      ).then(response => {
        this.close();
      }).catch(err => {
        alert(err);
      })
    }, 2000, {leading: true}),

    close: _.debounce(async function(){
      this.$emit('sheet-created');
    })
    
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
