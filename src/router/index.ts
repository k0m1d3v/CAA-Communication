import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landingPage',
      name: 'landingPage',
      component: LandingPage,
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: LoginPage,
    },
    {
      path: '/registrationPage',
      name: 'registrationPage',
      component: RegistrationPage,
    },
  ],
})

export default router
