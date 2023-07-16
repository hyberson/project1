import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

 import { useAuthStore } from 'stores/auth'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

Router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  console.log(' ----- router beforeeach ---- auth.$state.user ' , auth.$state.user)

  // if (to.matched.some(record => record.meta.requiresAuth) && !auth.$state.user) {
    if (to.matched.some(record => record.meta.requiresAuth) && auth.$state.user) {
    // Redirect to login page
    console.log('Router.beforeEach ---- redirect: to.fullPath ', to.fullPath)
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    console.log('Router.beforeEach ---- next ')
    next()
  }
})

  return Router;
  
});
