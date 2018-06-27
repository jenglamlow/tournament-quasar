// import { AuthRouter } from './AuthRouter';

export default [
  {
    path: '/',
    component: () => import('layouts/dashboard'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/home')
      },
      {
        path: '/tournament',
        name: 'tournament',
        component: () => import('pages/tournament')
      },
      {
        path: '/team',
        name: 'team',
        component: () => import('pages/team')
      },
      {
        path: '/tournament/:id',
        name: 'tournament',
        component: () => import('pages/tournament')
      }
    ]
  },

  // ...AuthRouter,

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];
