<template>
  <div>
    <section class = "title is-2 section"> Sign up </section>

    <form class = "container max">
      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for = "usernameB" class = "label"> Username</label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id ="usernameB" class = "input"  :class = "{ 'is-danger' : nameIsTaken, 'is-success' : nameIsNotTaken }"  type = "text" placeholder="Username" v-model = "username"  @change="dCheckUsername()"/>
            </div>
          <p class = "help is-success left" v-show="nameIsNotTaken"> This username is available </p>
          <p class = "help is-danger left" v-show="nameIsTaken"> This username is not available </p>
          </div>
        </div>
        
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for = "passwordF" class = "label"> Password</label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id = "passwordF" class = "input" :class = "{'is-danger' : passwordsNotMatching}" type = "password" v-model = "password" @change = "dCheckPassword()"/>
            </div>
            <p class = "help is-danger left" v-show="passwordsNotMatching"> Passwords do not match </p>
            <p class = "help is-danger left" v-show="passwordTooShort"> Passwords must be longer than 8 characters </p>
          </div>

        </div>
        
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for= "password2" class = "label"> Repeat Password</label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id = "password2" class = "input" :class = "{'is-danger' : passwordsNotMatching}" type = "password" v-model = "password2" @change = "dCheckPassword()"/>
            </div>
            <p class = "help is-danger left" v-show="passwordsNotMatching"> Passwords do not match </p>
          </div>
        </div>
        
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for = "displayName" class = "label"> Display Name</label>
        </div>
        <div class = "field-body">
          <div class = "control field">
            <input id ="displayName" class = "input" type = "text" placeholder="Display Name" v-model = "displayName"/>
          </div>
        </div>
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for= "email" class = "label"> Email</label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id = "email" class = "input" :class = "{'is-danger' : emailInvalid}" type = "text" placeholder="Email" v-model = "email" @change = "dCheckEmail"/>
            </div>
            <p class = "help is-danger left" v-show="emailInvalid"> You must input a valid email address </p>
          </div>
        </div>
        
      </div>

      <div class = "field is-horizontal">
        <div class = "field-label is-normal">
          <label for= "characterSheet" class = "label"> Referral Token </label>
        </div>
        <div class = "field-body">
          <div class = "field">
            <div class = "control">
              <input id = "characterSheet" class = "input" type = "text" placeholder="Referral token" v-model = "characterSheet"/>
            </div>
            <p class = "help is-danger left" v-show="characterSheetInvalid"> You must input a valid token, or none </p>
          </div>
        </div>
      </div>

      <div class="field">
        <a class="button is-link" @click="register()" >Sign up!</a>
      </div>
    </form>
    
    <div class="modal" :class="{'is-active': userRegistered}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p class="modal-card-title">You are now signed up!</p>
          <button class="delete" @click="toMain"></button>
        </header>
        <section class="modal-card-body">
          For security reasons, we have sent a validation email to your address. If you don't see it, check up your spam folder.
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success"  @click="toMain">OK</button>
        </footer>
      </div>
      <button class="modal-close is-large"></button>
    </div>

    <div class="modal" :class="{'is-active': userFailedToRegister}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p class="modal-card-title">There was a problem with your registration</p>
          <button class="delete" @click="userFailedToRegister = false"></button>
        </header>
        <section class="modal-card-body">
          Please try again. If the problem persists, contact an administrator.
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success"  @click="userFailedToRegister = false">OK</button>
        </footer>
      </div>
      <button class="modal-close is-large"></button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {requester} from '../App.vue';

export default {
  name: 'RegisterForm',
  data() { 
    return {
      nameIsTaken: false,
      nameIsNotTaken: false, //we have both variables to exclude the case where user did not input a name yet
      passwordsNotMatching: false,
      emailInvalid: false,
      username: "",
      password: "",
      password2: "",
      displayName: "",
      email: "",
      characterSheet: "",
      characterSheetInvalid: false,
      userRegistered: false,
      userFailedToRegister: false,
      passwordTooShort: false
    }
  },
  methods: {
    checkUsername: async function() {
      requester.get('username/' + this.username).then(response => {
        this.nameIsTaken = response.data;
        this.nameIsNotTaken = !this.nameIsTaken;
      });
    },
    dCheckUsername: _.debounce(function(){
      this.checkUsername();
    }, 2000, {leading: true}),
    checkPassword: async function(){
      if(this.password != "" && this.password2 != ""){
        this.passwordsNotMatching = ((this.password != this.password2));
        this.passwordTooShort = this.password.length < 8;
      }
    },
    dCheckPassword: _.debounce(function(){
      this.checkPassword();
    }, 200, {leading: true}),
    checkEmail: async function(){
      var emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      this.emailInvalid = !emailPattern.test(this.email);
    },
    dCheckEmail: _.debounce(function(){
      this.checkEmail();
    }, 200, {leading: true}),
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
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.max {
  max-width: 900px;
}
.left {
  text-align: left;
}
</style>
