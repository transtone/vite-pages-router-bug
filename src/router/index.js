import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const routers = createRouter({
  history: createWebHistory(),
  routes,
})

export default routers
