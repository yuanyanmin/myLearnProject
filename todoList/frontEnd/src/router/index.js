import Vue from 'vue'
import Router from 'vue-router'
import todoList from '../page/todoList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    }
  ]
})