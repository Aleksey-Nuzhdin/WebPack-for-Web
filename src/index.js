import scss from './assets/scss/main.scss';
import store from './store'
window.Vue = require('vue')

Vue.component('example-component', require('./modules/example.vue').default)

const app = new Vue({
  data (){
    return{
      component: false
    }
  },
  store,
  el:'#app'
})

