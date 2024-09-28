import { RouteRecordRaw } from 'vue-router';
import RoutesPaths from './RoutesPaths';
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('../layouts/AccessLayout.vue'),
    children: [
      {
        path: RoutesPaths.LOGIN,
        component: () => import('../pages/access/LoginPage.vue'),
      },
    ],
  },

  {
    path: '',
    component: () => import('../layouts/StudentLayout.vue'),
    children: [
      {
        path: RoutesPaths.STUDENT,
        component: () => import('../pages/student/StudentPage.vue'),
        children: [
          {
            path: RoutesPaths.QUIZ,
            component: () => import('src/components/student/QuizComp.vue'),
          },
          {
            path: RoutesPaths.RESULT,
            component: () => import('src/components/student/ResultComp.vue'),
          },
        ],
      },
      {
        path: RoutesPaths.QUESTIONS,
        component: () => import('pages/student/QuestionsPage.vue'),
        props: true,
      },
      {
        path: RoutesPaths.RESULT_PAGE,
        component: () => import('pages/student/QuizResult.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('src/layouts/TeacherLayout.vue'),
    children: [
      {
        path: RoutesPaths.TEACHER,
        component: () => import('src/pages/teacher/TeacherPage.vue'),
        children: [
          {
            path: RoutesPaths.TEACHER_QUIZ,
            component: () => import('src/components/teacher/QuizCompTeach.vue'),
          },
          {
            path: RoutesPaths.TEACHER_Result,
            component: () =>
              import('src/components/teacher/ResultCompTeach.vue'),
          },
        ],
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
