import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import N5View from '@/views/N5View.vue'
import N4View from '@/views/N4View.vue'
import RegisterView from '@/views/RegisterView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/n5',
      name: 'n5',
      component: N5View,
    },
    {
      path: '/n4',
      name: 'n4',
      component: N4View,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }
  ],
})

export default router
