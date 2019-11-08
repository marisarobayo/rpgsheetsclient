<template>
  <div class = "columns section">
    <div class = "column is-one-third">

      <div class = "section">
        <table name = "stats" class = "table is-fullwidth">
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
              <th><input type = "number" v-model.number="sheet.strength" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "sheet.strWeak"></th>
            </tr>
            <tr>
              <th>CON</th>
              <th><input type = "number" v-model.number="sheet.constitution" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "sheet.conWeak"></th>
            </tr>
            <tr>
              <th>DEX</th>
              <th><input type = "number" v-model.number="sheet.dexterity" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "sheet.dexWeak"></th>
            </tr>
            <tr>
              <th>INT</th>
              <th><input type = "number" v-model.number="sheet.intelligence" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "sheet.intWeak"></th>
            </tr>
            <tr>
              <th>WIS</th>
              <th><input type = "number" v-model.number="sheet.wisdom" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "sheet.wisWeak"></th>
            </tr>
            <tr>
              <th>CHA</th>
              <th><input type = "number" v-model.number="sheet.charisma" min = "6" max = "18"/></th>
              <th>+0</th>
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
          <input type = "text" v-model = "sheet.raceOther" @click="race = 'Other'"/>
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
        <div v-for="(bond,index) in bondKey" :key="index">
          <textarea class="textarea" placeholder="Bond" v-model="sheet.bonds[index]"></textarea>
        </div>
        
      </div>
      
    </div>
    
    <div class = "column">
      <div class = "control section max" >
        <input type = "text" v-model = "sheet.class" placeholder="Class Name" class = "input is-large" style = "text-align: center">
      </div>
      
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">LV</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0 v-model = "sheet.level">
            </p>
          </div>
          <div class="field-label is-normal">
            <label class="label">XP</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0 v-model = "sheet.xp">
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
              <input class="input" type="number" min = 0 v-model.number = "sheet.maxhp">
            </p>
          </div>

          <div class="field-label is-normal">
            <label class="label">ARMOR</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0 v-model.number = "sheet.armor">
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
            <a class = "card-header-icon" @click="moves.pop(move)"> Delete </a>
            </header>
            <div class="card-content">
              <div class="content">
                <textarea class = "textarea" placeholder="Move Description" v-model = "move.description"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class = "column is-half">
          <button class="button is-primary is-large" @click="newMove">New Move</button>
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
              <th>Description</th>
              <th>Weight</th>
              <th>Tags</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sheet.equipment" :key = "item.id">
              <th><input class = "input" type = "text" v-model="item.name"/></th>
              <th><input class = "input" type = "text" v-model="item.description"/></th>
              <th><input class = "input" type = "number" v-model.number="item.weight" min = "0" max = "6" style="width:3em"/></th>
              <th><input class = "input" type = "text" v-model="item.tags"/></th>
              <th> <input class = "input" type = "number" v-model.number="item.weight" min = "0" max = "6" style="width:3em"/></th>
            </tr>
            <tr>
              <th><a @click="newItem"> Add</a></th>
            </tr>
          </tbody>
        </table>
      </div>
      <input class = "button is-primary is-large" type = "button" @click="updateSheet()" value = "Update">
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../../App.vue';

export default {
  name: 'DWEditMain',
  data() { 
    return {
      sheet: {},
      token: this.$store.state.token,
      bondKey: ["","","","","",""]
      }
  },
  methods: {
    newMove: function(){
      this.sheet.moves.push({});
    },
    newItem: function(){
      this.sheet.equipment.push({});
    },
    updateSheet: _.debounce(async function(){
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
        //this.toMain();
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
      this.sheet.str = 10;
      this.sheet.dex = 10;
      this.sheet.con = 10;
      this.sheet.int = 10;
      this.sheet.wis = 10;
      this.sheet.cha = 10;
      this.sheet.level = 1;
      this.sheet.xp = 0;
      for(let i = 0; i < 6; i++){
        this.sheet.bonds.push("");
      }
      
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
      if(isNaN(this.sheet.strength)){
        this.initialize();
      }
    }).catch((response) => {
      alert("error");
      alert(response)
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
</style>
