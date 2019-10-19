<template>
  <div>
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
              Change portrait image...
            </span>
          </span>
          <span class="file-name">
            {{image.name}}
          </span>
        </label>
      </div>
      <br>
      <div class="field">
        <button class="button is-link" @click="postSheet()" >Sign up!</button>
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
      sheet: ""
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
        console.log("emitting");
        this.$emit('sheet-created');
      }).catch(err => {
        alert(err);
      })
    }, 2000, {leading: true})
    
  },
  created(){
    let token = this.$store.state.token;
    requester.get('sheets/'+ this.$route.params.sheetId, {
    headers: {
        token
    }
    }).then((response) => {
        this.sheet = response.data;
    }).catch((response) => {
        alert("error");
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
