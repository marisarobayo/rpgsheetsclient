<template>
  <div>
    <title-bar></title-bar>
    <app-description> </app-description>

    <div class="modal" :class="{'is-active': verifySuccess}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <section class="modal-card-body">
          <span> Now you can log in and start creating content! </span>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success"  @click="verifySuccess = false">OK</button>
        </footer>
      </div>
      <button class="modal-close is-large"></button>
    </div>

    <div class="modal" :class="{'is-active': verifyFailure}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <section class="modal-card-body">
          <span> We have found an error in your verification process </span>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger"  @click="verifyFailure = false">OK</button>
        </footer>
      </div>
      <button class="modal-close is-large"></button>
    </div>

  </div>
</template>

<script>
import TitleBar from './TitleBar.vue'
import AppDescription from './AppDescription.vue'
import {requester} from '../App.vue'

export default {
  name: 'LoginPage',
  components: {
    TitleBar,
    AppDescription
  },
  data() {
    return {
      verifySuccess: false,
      verifyFailure: false
    }
  },
  
  beforeRouteEnter (to, from, next) {
    let token = to.params.token;
    let uid = to.params.uid;
    if(to.name == "Verify"){
      requester.post('verify/' + token + "/" + uid , {},
      ).then(() => {
        next( (vm => {
          vm.verifySuccess = true;
        }));
      }).catch(() => {
        next( (vm => {
          vm.verifyFailure = true;
        }));
      })
    } else {
      next();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
