import Vue from 'vue'
import App from './App.vue'
import router from './src/router'
import store from './store'

new Vue({
  el: "#app", 
  router,
  store,
  components: { App },
  template: '<App/>'
})

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app")