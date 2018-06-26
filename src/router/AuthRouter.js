// import { auth } from '@/firebase';

export const AuthRouter = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import('pages/signin'),
    meta: {
      isPublic: true
    }
  },

  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/signup'),
    meta: {
      isPublic: true
    }
  }
];

export const AuthFilter = (to, from, next) => {
  // let isPublic = to.matched.some(record => record.meta.isPublic);

  // auth.onAuthStateChanged(user => {
  //   if (!isPublic && !user) {
  //     // Require authentication, user not yet sign in
  //     next({name: 'signin'});
  //   } else if (isPublic && user) {
  //     // Does not require authentication but user already sign in
  //     next({name: 'home'});
  //   } else {
  //     next(); // Landing Page (Does not require authentication)
  //   }
  // });
  next();
};
