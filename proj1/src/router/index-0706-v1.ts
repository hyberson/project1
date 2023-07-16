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
    const { isLoggedIn } = useAuthUser() */
    Router.beforeEach((to) => {
      const isLoggedIn = useAuthProvider()

    if (
      !isLoggedIn &&
      to.meta.requiresAuth
    ) {
      return { name: 'SignIn' }
    }

    /*

    Router.beforeEach((to, from, next) => {
      // isLoggedIn is a function you need to implement yourself, that checks whether a user is logged in or not.
      if (!isLoggedIn && to.meta.requiresAuth) { // should be !IsLoggedIn()
        // This line redirects the user to a route named 'login' if the user isn't logged in and the route requires authentication.
        next({ name: 'SignIn' });
      } else {
        // This line allows the navigation to proceed as normal.
        next();
      }
    }) */




  })

  return Router;
});
