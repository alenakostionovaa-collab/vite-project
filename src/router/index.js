import { createRouter, createWebHistory } from 'vue-router'
import todo from '../todo.vue'
import Child from '../child.vue'

const routes = [
  { path: '/', component: todo },
  { path: '/child', component: Child }
]

export default createRouter({
  history: createWebHistory(),
  routes
})