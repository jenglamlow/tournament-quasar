import { AuthFilter } from '@/router/AuthRouter';

export default ({ router, store, Vue }) => {
  router.beforeEach(AuthFilter);
};
