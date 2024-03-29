import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes.ts';

function useAuthProvider() { // deveria ser aqui?
  return true // false // true
};

function isLoggedIn() { // deveria ser aqui?
  return useAuthProvider()
};


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

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

/*  Router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser() 

    Router.beforeEach((to) => {
      const isLoggedIn = useAuthProvider()
*/

    Router.beforeEach((to, from, next) => {
      console.log('beforeEach ------------ to: ', to);
   //  const isLoggedIn = useAuthProvider();  // useAuthProvider() // useAuthUser()
    if (!isLoggedIn() && to.meta.requiresAuth) { // !isLoggedIn()
// if ( to.meta.requiresAuth) { // !isLoggedIn()
        next({
          name: 'login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    });

  return Router;
});
