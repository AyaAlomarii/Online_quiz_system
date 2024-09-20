import { RouteRecordRaw } from 'vue-router';
import RoutesPaths from './RoutesPaths';
const routes: RouteRecordRaw[] = [

  {
    path: '',
    component: () => import('../layouts/AccessLayout.vue'),
    children: [
      {
        path: RoutesPaths.LOGIN,
        component: () => import('../pages/LoginPage.vue'),
      },

    ],
  },

  {
    path: '',
    component: () => import('../layouts/StudentLayout.vue'),
    children: [
      {
        path: RoutesPaths.STUDENT,
        component: () => import('../pages/StudentPage.vue'),
        children:[
          {
            path: RoutesPaths.QUIZ,
            component: () => import('src/components/student/QuizComp.vue'),
          }, {
            path: RoutesPaths.RESULT,
            component: () => import('src/components/student/ResultComp.vue'),
          },
        ]
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
