import { lazy } from 'react';

/**
 * dataDictionary module
 */
export default {
  'views/dataDictionary/list': lazy(() => import('@/views/dataDictionary/list')),
  'views/dataDictionary/group': lazy(() => import('@/views/dataDictionary/group'))
};
