import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Root/TestPage.vue') },
      { path: 'sign-in', component: () => import('pages/Root/SignInPage.vue') },
      { path: 'index-example', component: () => import('pages/Root/IndexExamplePage.vue') },

      { path: 'provider-profile', component: () => import('pages/Root/ProviderProfilePage.vue') },
      { path: 'dyn-styled', component: () => import('pages/Root/DynStyledPage.vue') },
      { path: 'appointment', component: () => import('pages/Root/ChipClick.vue') }
/* { path: 'appointment', component: () => import('pages/Root/AppointmentPage.vue') } */
/* { path: 'appointment', component: () => import('pages/Root/TimeSlotSelector.vue') } */
    ]
  },

  {
    path: '/unregistered',
    component: () => import('layouts/UnregisteredLayout.vue'),
    children: [
      { path: 'agendamento', component: () => import('pages/Unregistered/AgendamentoPage.vue') },
      { path: 'sign-up', component: () => import('pages/Unregistered/SignUpPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

/*

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'cadastro-finalizado', component: () => import('pages/CadastroFinalizado.vue') }
    ]
  },

  ---------------------

import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// navigation guards
router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth()
  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if (storeAuth.user.id && to.name === 'auth') {
    return false
  }
})

export default router */
