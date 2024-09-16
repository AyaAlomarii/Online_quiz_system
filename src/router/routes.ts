import { RouteRecordRaw } from 'vue-router';
import RoutesPaths from './RoutesPaths';
const routes: RouteRecordRaw[] = [

      {
        path: RoutesPaths.HOME,
        component: () => import('pages/IndexPage.vue'),
      },


  
  {
    path: '/',
    component: () => import('../layouts/AccessLayout.vue'),
    children: [
      {
        path: RoutesPaths.LOGIN,
        component: () => import('../pages/LoginPage.vue'),
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
