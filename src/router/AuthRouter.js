export const AuthRouter = {
  path: '/signin',
  name: 'SignIn',
  component: () => import('pages/signin')
  // {
  //   path: 'signup',
  //   name: 'auth_SignUp',
  //   component: () => import('pages/signup')
  // },
  // {
  //   path: 'signOut',
  //   name: 'auth_SignOut',
  //   component: Components.SignOut
  // }
  // {
  //   path: 'confirmsignup',
  //   name: 'auth_ConfirmSignUp',
  //   component: () => import('pages/confirmSignUp')
  // }
  // {
  //   path: 'verifyContact',
  //   name: 'auth_VerifyContact',
  //   component: Components.VerifyContact
  // },
  // {
  //   path: 'forgotPassword',
  //   name: 'auth_ForgotPassword',
  //   component: Components.ForgotPassword
  // }
};

export const AuthFilter = (to, from, next) => {
  next();
};
