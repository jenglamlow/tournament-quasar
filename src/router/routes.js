import { AuthRouter } from './AuthRouter';

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  AuthRouter,

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];
