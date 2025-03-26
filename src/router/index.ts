import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/preLogIn/LandingPage.vue'
import RegistrationPage from '@/views/preLogIn/RegistrationPage.vue'
import LoginPage from '@/views/preLogIn/LoginPage.vue'
import NotFoundPage from '../views/generic/NotFoundPage.vue'
import HomePage from '../views/postLogin/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'registrationPage',
      component: RegistrationPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPage,
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
    },
  ],
})

export default router
