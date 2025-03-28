import { createRouter, createWebHistory } from 'vue-router'

// Pre login pages
import LandingPage from '../views/preLogIn/LandingPage.vue'
import RegistrationPage from '@/views/preLogIn/RegistrationPage.vue'
import LoginPage from '@/views/preLogIn/LoginPage.vue'

// Generic pages
import NotFoundPage from '../views/generic/NotFoundPage.vue'
import logoutPage from '../views/generic/logoutTransitioner.vue'

// Post login pages
import HomePage from '../views/postLogin/HomePage.vue' // Home page
import ParliamoPage from '../views/postLogin/childPages/parliamoPage.vue'
import DizionarioPage from '../views/postLogin/childPages/dizionarioPage.vue'
import GiochiPage from '../views/postLogin/childPages/giochiPage.vue'

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
    {
      path: '/parliamo',
      name: 'Parliamo',
      component: ParliamoPage,
    },
    {
      path: '/dizionario',
      name: 'Dizionario',
      component: DizionarioPage,
    },
    {
      path: '/giochi',
      name: 'Giochi',
      component: GiochiPage,
    },
    {
      path: '/logout',
      name: 'logout',
      component: logoutPage,
    },
  ],
})

export default router
