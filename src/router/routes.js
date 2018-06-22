import { AuthRouter } from './AuthRouter';

export default [
  {
    path: '/',
    component: () => import('layouts/dashboard'),
    children: [
      {
        path: '',
        component: () => import('pages/home'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  ...AuthRouter,

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];
