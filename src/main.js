// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store';

// Bulma CSS Framework
import './../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false


// Custom directive that triggers an event if you click outside of the element that has it (perfect for popups!)
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

/* eslint-disable no-new */
/*new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})*/

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')

