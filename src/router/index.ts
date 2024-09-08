import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartScreen from '../views/StartScreen.vue'
import CreationGuide from '../views/CreationGuide.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start',
  },
  {
    path: '/app',
    name: 'app',
    component: HomeView,
  },
  {
    path: '/guide',
    name: 'guide',
    component: CreationGuide,
  },
  {
    path: '/start',
    name: 'start',
    component: StartScreen,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
