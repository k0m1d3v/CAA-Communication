import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

// Pre login pages
import LandingPage from '../views/preLogIn/LandingPage.vue'
import RegistrationPage from '@/views/preLogIn/RegistrationPage.vue'
import LoginPage from '@/views/preLogIn/LoginPage.vue'
import CreditsPage from '@/views/preLogIn/CreditsPage.vue'

// Generic pages
import NotFoundPage from '../views/generic/NotFoundPage.vue'
import logoutPage from '../views/generic/logoutTransitioner.vue'

// Post login pages
import HomePage from '../views/postLogin/HomePage.vue' // Home page
import ParliamoPage from '../views/postLogin/childPages/parliamoPage.vue'
import DizionarioPage from '../views/postLogin/childPages/dizionarioPage.vue'
import GiochiPage from '../views/postLogin/childPages/giochiPage.vue'
import DictionaryPage from '../views/postLogin/childPages/dictionaryPage.vue'
import StorytellerPage from '../views/postLogin/childPages/StorytellerPage.vue'
import NologPage from '@/views/postLogin/childPages/NologPage.vue'
import ImparaPage from '@/views/postLogin/childPages/imparaPage.vue'
import RisposteRapide from '@/views/postLogin/childPages/risposteRapidePage.vue'

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
      meta: { requiresAuth: true },
    },
    {
      path: '/parliamo',
      name: 'Parliamo',
      component: ParliamoPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/dizionario',
      name: 'Dizionario',
      component: DizionarioPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/giochi',
      name: 'Giochi',
      component: GiochiPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/logout',
      name: 'logout',
      component: logoutPage,
    },
    {
      path: '/nolog',
      name: 'NologPage',
      component: NologPage,
      // Deliberately public: this page exists specifically to let people
      // explore AAC tools without registering.
    },
    {
      path: '/storyteller',
      name: 'Storyteller',
      component: StorytellerPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/credits',
      name: 'Credits',
      component: CreditsPage,
    },
    {
      path: '/dictionary',
      name: 'Dictionary',
      component: DictionaryPage,
      // Deliberately public: reachable from /nolog's "explore without
      // registration" flow. Cloud sync in backupStore is a no-op while
      // signed out; phrases still work locally for the session.
    },
    {
      path: '/risposteRapide',
      name: 'RisposteRapide',
      component: RisposteRapide,
      // Deliberately public — see /dictionary above.
    },
    {
      path: '/impara',
      name: 'Impara',
      component: ImparaPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: () => import('../views/postLogin/childPages/AnalyticsPage.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const authStore = useAuthStore()
  await authStore.waitForAuthReady()

  if (!authStore.isAuthenticated) {
    return { path: '/login' }
  }

  return true
})

export default router
