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
              <th><input type = "number" v-model.number="str" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "strWeak"></th>
            </tr>
            <tr>
              <th>CON</th>
              <th><input type = "number" v-model.number="con" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "conWeak"></th>
            </tr>
            <tr>
              <th>DEX</th>
              <th><input type = "number" v-model.number="dex" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "dexWeak"></th>
            </tr>
            <tr>
              <th>INT</th>
              <th><input type = "number" v-model.number="int" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "intWeak"></th>
            </tr>
            <tr>
              <th>WIS</th>
              <th><input type = "number" v-model.number="wis" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "wisWeak"></th>
            </tr>
            <tr>
              <th>CHA</th>
              <th><input type = "number" v-model.number="cha" min = "6" max = "18"/></th>
              <th>+0</th>
              <th> <input type = "checkbox" v-model = "chaWeak"></th>
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
            <input type="radio" name = "race" v-model = "race" value = "Human">
            Human
          </label>
          <label class="radio">
            <input type="radio" name = "race" v-model = "race" value = "Elf">
            Elf
          </label>
          <label class="radio">
            <input type="radio" name = "race" v-model = "race" value = "Dwarf">
            Dwarf
          </label>
          <label class="radio">
            <input type="radio" name = "race" v-model = "race" value = "Halfling">
            Halfling
          </label>
          <label class="radio">
            <input type="radio" name = "race" v-model = "race" value = "Other">
            Other
          </label>
          <input type = "text" v-model = "raceOther" @click="race = 'Other'"/>
        </div>
        <textarea class="textarea" placeholder="Racial Move" v-model="racialMove"></textarea>
      </div>
      


      <div class = "section">
        <div class = "title is-3">
          Alignment
        </div>
        <div class="control">
          <label class="radio">
            <input type="radio" name = "alignment" v-model = "alignment" value = "Good">
            Good
          </label>
          <label class="radio">
            <input type="radio" name = "alignment" v-model = "alignment" value = "Evil">
            Evil
          </label>
          <label class="radio">
            <input type="radio" name = "alignment" v-model = "alignment" value = "Lawful">
            Lawful
          </label>
          <label class="radio">
            <input type="radio" name = "alignment" v-model = "alignment" value = "Chaotic">
            Chaotic
          </label>
        </div>
        <textarea class="textarea" placeholder="Alignment Move" v-model="alignmentMove"></textarea>
      </div>
      
      <div class = "section">
        <div class = "title is-3">
          Bonds
        </div>
        <div v-for="(bond,index) in bonds" :key="index">
          <textarea class="textarea" placeholder="Bond" v-model="bond.text"></textarea>
        </div>
        
      </div>
      
    </div>
    
    <div class = "column">
      <div class = "control section max" >
        <input type = "text" v-model = "className" placeholder="Class Name" class = "input is-large" style = "text-align: center">
      </div>
      
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">LV</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0>
            </p>
          </div>
          <div class="field-label is-normal">
            <label class="label">XP</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0>
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
              <input class="input" type="number" min = 0>
            </p>
          </div>

          <div class="field-label is-normal">
            <label class="label">ARMOR</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input" type="number" min = 0>
            </p>
          </div>

          <div class="field-label is-normal">
            <label class="label">DAMAGE</label>
          </div>
          <div class="field">
            <p class="control is-expanded select">
              <select v-model="damage">
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

        <div class = "column is-half" v-for="move in moves" :key= "move.id">
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
            <tr v-for="item in equipment" :key = "item.id">
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

    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../../App.vue';

export default {
  name: 'DW Edit Main',
  data() { 
    return {
      token: this.$store.state.token,
      str: 10,
      strWeak: false,
      con: 10,
      conWeak: false,
      dex: 10,
      dexWeak: false,
      int: 10,
      intWeak: false,
      wis: 10,
      wisWeak: false,
      cha: 10,
      chaWeak: false,
      race: "",
      raceOther: "",
      racialMove: "",
      alignment: "",
      alignmentMove: "",
      class: "",
      level: 1,
      xp: 0,
      hp: 0,
      armor: 0,
      damage: 4,
      moves: [
        {
          id: 1,
          name: "Bend Bars, Lift Gates",
          description: `When you use pure strength to destroy an inanimate obstacle, roll+STR. 
          • On a 10+, choose 3. • On a 7-9 choose 2. • It doesn’t take a very long time • Nothing of value is damaged 
          • It doesn’t make an inordinate amount 
          of noise • You can fix the thing again without a lot 
          of effort`
        },
        {
          id: 2,
          name: "Armored",
          description: `You ignore the clumsy tag on any armor you wear.`
        },
        {
          id: 3,
          name: "Mercyless",
          description: `When you deal damage, deal +1d4 damage.`
        }

      ],
      bonds: [
        {
          text: "Test bond"
        },
        {
          text: "Test bond"
        }
      ],
      equipment: [
        {
          id: 1,
          name: "Iron sword",
          description: "It just cuts things",
          weight: 1,
          tags: "near",
          amount: 1,
        }
      ]

      }
  },
  methods: {
    newMove: function(){
      this.moves.push({});
    },
    newItem: function(){
      this.equipment.push({});
    },
    register: _.debounce(async function(){

      // It is important to check all inputs because the valid values may not have been computed yet
      if(this.username == "" || this.password == "" || this.displayName == "" || this.email == ""){
        return;
      }
      await this.checkUsername();
      if(this.nameIsTaken){
        return;
      }

      await this.checkPassword();
      if(this.passwordsNotMatching || this.passwordTooShort){
        return;
      }

      await this.checkEmail();
      if(this.emailInvalid){
        return;
      }

      requester.post('register', {
        username: this.username,
        email: this.email,
        displayName: this.displayName,
        password: this.password,
        characterSheet: this.characterSheet
      }).then(response => {
        this.userRegistered = true;
      }).catch(err => {
        this.userFailedToRegister = true;
      })
    }, 2000, {leading: true}),
    toMain: function(){
      this.userRegistered = false;
      this.$router.push('/')
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
        this.sheets = response.data;
      }).catch((response) => {
        alert("error");
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
