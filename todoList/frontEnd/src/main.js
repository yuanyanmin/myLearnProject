import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './plugins/toast'

Vue.use(Toast)

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