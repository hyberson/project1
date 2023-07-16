import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: 'jhehjejej',
        name: 'Test', 
        component: () => import('pages/TestOne.vue')
      },

      { path: '',
        name: 'default',// -----------------------------------------> Profile
        component: () => import('pages/ProfilePage.vue')
      },

      { path: 'slot-selection', 
        name: 'SlotSelection', 
        component: () => import('pages/SlotSelection.vue') 
      },

      { path: 'appointment-one/:appointmentDateTime', 
        name: 'AppointmentOne', 
        component: () => import('pages/AppointmentOne.vue') 
      },

      
      { path: 'appointment-two/:appointmentDateTime', 
        name: 'AppointmentTwo', 
        component: () => import('pages/AppointmentTwo.vue'),
        meta: { requiresAuth: true },
    
      },

      { path: 'instructions', 
        name: 'Instructions', 
        component: () => import('pages/InstructionsPage.vue') 
      },
      
      { path: 'sign-in',  
        name: 'SignIn', // -----------------------------------------> SignIn
        component: () => import('pages/SignIn.vue')
      },

      { path: 'login',  
        name: 'Login', // -----------------------------------------> SignIn
        component: () => import('pages/LoginPage.vue')
      },
    ]
  },

  {
    path: '/root',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index-example', component: () => import('pages/Root/IndexExamplePage.vue') },
      { path: 'dyn-styled', component: () => import('pages/Root/DynStyledPage.vue') },
    ]
  },

  /*
  const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/professional-profile/:id', name: 'ProfessionalProfile', component: ProfessionalProfile },
  // other routes...
]
*/

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
    name: 'NotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
