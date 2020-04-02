<template>

  <div>

    <div class = "navbar is-fixed-bottom notification is-success" :class= "{'hidden': !successfulUpdate}">
      <button class="delete" @click="successfulUpdate = false"></button>
      Your sheet was updated!
    </div>
    
    <div class = "columns section">

      <!-- LEFT SIDE -->
      <div class = "column is-one-third-desktop">

        <div class = "" >
          <table name = "stats" class = "table is-fullwidth" >
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
                <th>Mod</th>
                <th>Weak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>STR</th>
                <th><input type = "number"  v-model.number="sheet.strength" min = "1" max = "18" @change="strFail = checkIsNumber(sheet.strength, strFail)"/></th>
                <th>{{calculateModifier(sheet.strength, sheet.strWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.strWeak"></th>
              </tr>
              <tr>
                <th>CON</th>
                <th><input type = "number" :class = "{'is-danger' : conFail}" v-model.number="sheet.constitution" min = "1" max = "18" @change="conFail =  checkIsNumber(sheet.constitution, conFail)"/></th>
                <th>{{calculateModifier(sheet.constitution, sheet.conWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.conWeak"></th>
              </tr>
              <tr>
                <th>DEX</th>
                <th><input type = "number" :class = "{'is-danger' : dexFail}" v-model.number="sheet.dexterity" min = "1" max = "18" @change="dexFail = checkIsNumber(sheet.dexterity, dexFail)"/></th>
                <th>{{calculateModifier(sheet.dexterity, sheet.dexWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.dexWeak"></th>
              </tr>
              <tr>
                <th>INT</th>
                <th><input type = "number" :class = "{'is-danger' : intFail}" v-model.number="sheet.intelligence" min = "1" max = "18" @change="intFail = checkIsNumber(sheet.intelligence, intFail)"/></th>
                <th>{{calculateModifier(sheet.intelligence, sheet.intWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.intWeak"></th>
              </tr>
              <tr>
                <th>WIS</th>
                <th><input type = "number" :class = "{'is-danger' : wisFail}" v-model.number="sheet.wisdom" min = "1" max = "18" @change="wisFail = checkIsNumber(sheet.wisdom, wisFail)"/></th>
                <th>{{calculateModifier(sheet.wisdom, sheet.wisWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.wisWeak"></th>
              </tr>
              <tr>
                <th>CHA</th>
                <th><input type = "number" :class = "{'is-danger' : chaFail}" v-model.number="sheet.charisma" min = "1" max = "18" @change="chaFail = checkIsNumber(sheet.charisma, chaFail)"/></th>
                <th>{{calculateModifier(sheet.charisma, sheet.chaWeak)}}</th>
                <th> <input type = "checkbox" v-model = "sheet.chaWeak"></th>
              </tr>
            </tbody>
          </table>
        </div>
        

        <div class = "section">
          <div class = "title is-3">
            Race
          </div>
          <div class="control">
            <label class="radio">
              <input type="radio" name = "race" v-model = "sheet.race" value = "Human">
              Human
            </label>
            <label class="radio">
              <input type="radio" name = "race" v-model = "sheet.race" value = "Elf">
              Elf
            </label>
            <label class="radio">
              <input type="radio" name = "race" v-model = "sheet.race" value = "Dwarf">
              Dwarf
            </label>
            <label class="radio">
              <input type="radio" name = "race" v-model = "sheet.race" value = "Halfling">
              Halfling
            </label>
            <label class="radio">
              <input type="radio" name = "race" v-model = "sheet.race" value = "Other">
              Other
            </label>
            <input type = "text" v-model = "sheet.raceOther" @click="sheet.race = 'Other'"/>
          </div>
          <textarea class="textarea" placeholder="Racial Move" v-model="sheet.racialMove"></textarea>
        </div>
        


        <div class = "section">
          <div class = "title is-3">
            Alignment
          </div>
          <div class="control">
            <label class="radio">
              <input type="radio" name = "alignment" v-model = "sheet.alignment" value = "Good">
              Good
            </label>
            <label class="radio">
              <input type="radio" name = "alignment" v-model = "sheet.alignment" value = "Evil">
              Evil
            </label>
            <label class="radio">
              <input type="radio" name = "alignment" v-model = "sheet.alignment" value = "Lawful">
              Lawful
            </label>
            <label class="radio">
              <input type="radio" name = "alignment" v-model = "sheet.alignment" value = "Chaotic">
              Chaotic
            </label>
          </div>
          <textarea class="textarea" placeholder="Alignment Move" v-model="sheet.alignmentMove"></textarea>
        </div>
        
        <div class = "section">
          <div class = "title is-3">
            Bonds
          </div>
          <div v-for="bond in sheet.bonds" :key= "bond.id">
            <textarea class="textarea" placeholder="Bond" v-model="bond.text"></textarea>
          </div>
        </div>
        
      </div>
      
      <!-- RIGHT SIDE -->
      <div class = "column">
        <div class = "columns is-desktop is-vcentered">
          <div class = "column field is-half-desktop">
            <div class = "field">
              <p class = "control is-expanded">
                <input type = "text" v-model = "sheet.name" placeholder="Character name" class = "input is-large" style = "text-align: center">
              </p>
            </div>
          </div>
          <div class = "column is-half-desktop " style = "">
            <input accept="image/*" v-show = "false" ref="fileup" type = "file" @change = "postImage()" />
            <figure class="image is-256x256 imagecenter" @click = "updateImage()">
              <img :src = "getImage" alt="Placeholder image"/>
            </figure>
          </div>
        </div>

        <div class = "max field is-grouped is-grouped-centered" >
          <p class = "control is-expanded">
            <input type = "text" v-model = "sheet.class" placeholder="Class Name" class = "input is-large" style = "text-align: center">
          </p>

          <p class = "control">
            <input class = "button is-success is-large" type = "button" @click="updateSheet()" value = "Update sheet">
          </p>
        </div>
        

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">LV</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input class="input" type="number" min = 0 v-model.number = "sheet.level" @change="levelFail = checkIsNumber(sheet.level, levelFail)">
              </p>
            </div>
            <div class="field-label is-normal">
              <label class="label">XP</label>
            </div>
            <div class="field">
              <p class="control is-expanded">
                <input class="input" type="number" min = 0 v-model.number = "sheet.xp" @change="xpFail = checkIsNumber(sheet.xp, xpFail)">
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">HP</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input class="input" type="number" min = 0 v-model.number = "sheet.maxhp" @change="maxhpFail = checkIsNumber(sheet.maxhp, maxhpFail)">
              </p>
            </div>

            <div class="field-label is-normal">
              <label class="label">ARMOR</label>
            </div>
            <div class="field">
              <p class="control is-expanded">
                <input class="input" type="number" min = 0 v-model.number = "sheet.armor" @change="armorFail = checkIsNumber(sheet.armor, armorFail)">
              </p>
            </div>

            <div class="field-label is-normal">
              <label class="label">DAMAGE</label>
            </div>
            <div class="field">
              <p class="control is-expanded select">
                <select v-model.number="sheet.damage">
                  <option value="4">d4</option>
                  <option value="6">d6</option>
                  <option value="8">d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                </select>
              </p>
            </div>
          </div>
        </div>
          
        <div name = "moves" class = "columns is-multiline section is-6 is-variable is-vcentered">

          <div class = "column is-half" v-for="move in sheet.moves" :key= "move.id">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title field control">
                  <input type = "text" value = "title" class = "input" placeholder="Move Name" v-model = "move.name"/>
                </p>
              <a class = "card-header-icon" @click="sheet.moves.pop(move)"> Delete </a>
              </header>
              <div class="card-content">
                <div class="content">
                  <textarea class = "textarea" placeholder="Move Description" v-model = "move.description"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class = "column is-half">
            <button class="button is-primary is-large" @click="newMove">Add Move</button>
          </div>
          
        </div>

        <div class = "section">

          <div class = "title is-3">
            Equipment
          </div>
          <table name = "equipment" class = "table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Function</th>
                <th>Weight</th>
                <th>Tags</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sheet.equipment" :key = "item.id">
                <th><input class = "input" type = "text" v-model="item.name"/></th>
                <th><input class = "input" type = "text" v-model="item.description"/></th>
                <th><input class = "input" type = "number" v-model.number="item.weight" min = "0" max = "6" style="width:3em"/></th>
                <th><input class = "input" type = "text" v-model="item.tags"/></th>
                <th> <input class = "input" type = "number" v-model.number="item.amount" min = "0" max = "6" style="width:3em"/></th>
                <th> <a @click="sheet.equipment.pop(item);"> Delete</a> </th>
              </tr>
              <tr>
                <th><a @click="newItem"> Add</a></th>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script>
import _ from 'lodash';
import {requester} from '../../App.vue';
import { fail } from 'assert';

export default {
  name: 'DWEditMain',
  data() { 
    return {
      sheet: {},
      token: this.$store.state.token,
      successfulUpdate: false,
      numberOfNumberFieldErrors: 0,
      strFail: false,
      dexFail: false,
      conFail: false,
      intFail: false,
      wisFail: false,
      chaFail: false,
      levelFail: false,
      xpFail: false,
      maxhpFail: false,
      armorFail: false
      }
  },
  computed: {
    getImage: function(){
      if(this.sheet.characterSheet && this.sheet.characterSheet.displayImage){
        return this.sheet.characterSheet.displayImage + "";
      } else {
        return require('../../../public/placeholder.png');
      }
    }
  },
  methods: {
    handleFile: function(){
      this.image = this.$refs.file.files[0];
    },
    newMove: function(){
      this.sheet.moves.push({});
    },
    newItem: function(){
      this.sheet.equipment.push({});
    },
    updateSheet: _.debounce(async function(){
      // Validation for standard number attributes
      if(this.numberOfNumberFieldErrors > 0){
        return;
      }
      
      // Checking for empty moves and items
      for(let item of this.sheet.equipment){
        if(Object.entries(item).length === 0 && item.constructor === Object || item.name == "" || item.name == undefined){
          this.sheet.equipment.pop(item);
        }
      }

      for(let move of this.sheet.moves){
        if(Object.entries(move).length === 0 && move.constructor === Object || move.name == "" || move.name == undefined){
          this.sheet.moves.pop(move);
        }
      }

      // Validation for item number attributes
      for(let equip of this.sheet.equipment){
        if(!Number.isInteger(equip.weight) || ! Number.isInteger(equip.amount)){
          return;
        }
      }

      let token = this.token;
      let id = this.$route.params.sheetId;

      let tmpRace = this.sheet.race;
      if (this.sheet.race == "Other"){
        this.sheet.race = this.sheet.raceOther;
      }

      let formData = new FormData();
      formData.append('sheet', this.sheet);

      let url = 'sheets/' + id;
      requester.put(url,{
        sheet: this.sheet
      }, {
        headers: {
          token
        }
      }).then(response => {
        this.successfulUpdate = true;
        this.sheet.race = tmpRace;
      }).catch(err => {
        alert(err);
      }).finally(function (){
        //this.sheet.race = tmpRace;
      })

    }, 2000, {leading: true}),
    toMain: function(){
      this.$router.push('/main')
    },
    initialize: function(){
      this.sheet.strength = 10;
      this.sheet.dexterity = 10;
      this.sheet.constitution = 10;
      this.sheet.intelligence = 10;
      this.sheet.wisdom = 10;
      this.sheet.charisma = 10;
      this.sheet.level = 1;
      this.sheet.xp = 0;
      for(let i = 0; i < 6; i++){
        this.sheet.bonds.push({text: "", id: i});
      }
    },
    calculateModifier: function(attribute, isWeak){
      let modifier;
      if(attribute >= 18){
        modifier = 3;
      } else if (attribute >= 16){
        modifier = 2;
      } else if (attribute >= 13){
        modifier = 1;
      } else if (attribute >= 9){
        modifier = 0;
      } else if (attribute >= 6){
        modifier = -1;
      } else if (attribute >= 4){
        modifier = -2;
      } else {
        modifier = -3;
      }

      if(isWeak){
        modifier--;
      }

      if (modifier >= 0){
        modifier = "+" + modifier;
      }
      return modifier;
    },
    checkIsNumber: function(property,failureFlag){
      if(!Number.isInteger(property)){
        if(failureFlag == false){
          this.numberOfNumberFieldErrors++;
        }
        return true;

      } else{
        if(failureFlag == true && this.numberOfNumberFieldErrors > 0){
          this.numberOfNumberFieldErrors--;
        }
        return false;
      }
    },

    updateImage: function(){
      let fileForm = this.$refs["fileup"];
      fileForm.click();
    },
    postImage: function(){
      let file = this.$refs["fileup"].files[0];
      let token = this.$store.state.token;

      let formData = new FormData();
      formData.append('image', file);

      requester.put('sheets/' + this.sheet.characterSheet._id + "/image", formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      },
      ).then(response => {
        this.sheet.characterSheet.displayImageFile = response.data.displayImageFile;
        this.sheet.characterSheet.displayImage = response.data.displayImage;
        this.sheet.characterSheet.displayImageID = response.data.displayImageID;
      }).catch(err => {
        alert(err);
      })
    }
    
  },
  created: function(){
    let token = this.token;
    let id = this.$route.params.sheetId;
    requester.get('sheets/' + id, {
      headers: {
        token
      }
    }).then((response) => {
      this.sheet = response.data;
      this.sheet.name = this.sheet.characterSheet.name;
      if(isNaN(this.sheet.strength)){
        this.initialize();
      }
      if(this.sheet.race != "Human" && this.sheet.race != "Elf" && this.sheet.race != "Dwarf" && this.sheet.race != "Halfling"){
        this.sheet.raceOther = this.sheet.race;
        this.sheet.race = "Other";
      }
    }).catch((response) => {
      //alert("error");
      //alert(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.max {
  max-width: 700px; 
  margin: 0 auto;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.imagecenter {
  margin: auto;
}
.hidden {
  display: none;
}

.is-256x256{
  width:350px;
  height:350px;
  object-fit: cover;
}
</style>
