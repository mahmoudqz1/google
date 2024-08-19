import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebaseConfig'

const isAuthenticated = () => {
  return !!auth.currentUser
}

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-settings',
        component: () => import('../pages/account-settings.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'AddLead',
        component: () => import('../pages/AddLead.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'Lead',
        component: () => import('../pages/Lead.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ReceivedLead',
        component: () => import('../pages/ReceivedLead.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'devoirs',
        component: () => import('../pages/devoirs.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'contracts',
        component: () => import('../pages/contracts.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'MyForm',
        component: () => import('../pages/MyForm.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs',
        component: () => import('../pages/utilisateur.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'aircall',
        component: () => import('../pages/aircall.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'typography',
        component: () => import('../pages/typography.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'icons',
        component: () => import('../pages/icons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cards',
        component: () => import('../pages/cards.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tables',
        component: () => import('../pages/tables.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'form-layouts',
        component: () => import('../pages/form-layouts.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('../pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/[...all].vue'),
      },
    ],
  },
  {
    path: '/error',
    name: 'ErrorHeader',
    component: () => import('../pages/ErrorHeader.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated())
      next({ name: 'ErrorHeader' })
    else
      next()
  }
  else {
    next()
  }
})

export default router
