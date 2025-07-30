import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tutorials from '../views/Tutorials.vue'
import About from '../views/About.vue'
import TutorialDetail from '../views/TutorialDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials
  },
  {
    path: '/tutorial/:id',
    name: 'TutorialDetail',
    component: TutorialDetail,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
