import { lazy } from 'react';

/**
 * dataTreating module
 */
export default {
  'views/dataTreating/list': lazy(() => import('@/views/dataTreating/list')),
  'views/dataTreating/group': lazy(() => import('@/views/dataTreating/group'))
};
