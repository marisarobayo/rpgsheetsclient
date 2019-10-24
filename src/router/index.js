import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import MainScreen from '@/components/MainScreen'
import SheetList from '@/components/SheetList'
import EditCharacterSheet from '@/components/edit/EditCharacterSheet'
import DWEditMain from '@/components/edit/DWEditMain'
import DWEditMenu from '@/components/edit/DWEditMenu'
import InvitePlayers from '@/components/InvitePlayers.vue';

import {store} from '../store.js'
import {requester} from '../App.vue';

Vue.use(Router)

function checkLoginGuard(to, from, next){
  let token = store.state.token;
  if(!token){
    next(false);
  } else {
    next();
  }
}

function ifLoginRedirect(to, from, next){
  let token = store.state.token;
  if(token){
    next('/main');
  } else {
    next();
  }
}

//Yes, we handle verification in the guard, because it's outside of the user interface
function verifyUser(to, from, next){
  let token = to.params.token;
  let uid = to.params.uid;
  alert(token);
  requester.post('verify/' + token + "/" + uid , {},
  ).then(response => {
    next();
  }).catch(err => {
    next();
    alert(err);
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
      beforeEnter: ifLoginRedirect
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/verify/:token/:uid',
      name: "Verify",
      component: LoginPage,
      beforeEnter: verifyUser
    },
    {
      path: '/main',
      name: 'MainScreen',
      component: MainScreen,
      beforeEnter: checkLoginGuard,
      children: [
      {
        path: "",
        name: "Sheet List",
        component: SheetList,
        children: [
          {
            path: "invitePlayers",
            name: "InvitePlayers",
            component: InvitePlayers
          }
        ]
      },
      {
        path: ":sheetId",
        component: EditCharacterSheet,
        props: true,
        children: [
          {
            path: "main",
            name: "DW Edit Main",
            components: {
              default: DWEditMain,
              menu: DWEditMenu
            }
          }
        ]
      }
        
      ]
    }
  ]
})
