import React, { Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import menuConfig, { ConfigType } from '@/config/menuConfig';
import BaseLayout from '@/layout/BaseLayout';
import ErrorLayout from '@/layout/ErrorLayout';
import NotAuthorized from '@/view/error/403';
import NotFound from '@/view/error/404';
import ServiceError from '@/view/error/500';

const generateFromConfig = (config: ConfigType[]): RouteObject[] => {
  const routes: RouteObject[] = [];
  for (const c of config) {
    switch (c.type) {
      case 'item':
        routes.push({
          path: c.route,
          element: (
            <Suspense>
              <c.element />
            </Suspense>
          )
        });
        break;
      case 'sub':
        routes.push({
          path: c.route,
          children: generateFromConfig(c.children)
        });
        break;
      case 'group':
        routes.push(...generateFromConfig(c.children));
        break;
      default:
        break;
    }
  }
  return routes;
};

const generate = () => {
  const main: RouteObject[] = generateFromConfig(menuConfig);
  return [
    {
      path: '/',
      element: <BaseLayout />,
      children: [
        ...[
          {
            index: true,
            element: <Navigate to={'/home'} />
          }
        ],
        ...main
      ]
    },
    {
      element: <ErrorLayout />,
      children: [
        {
          path: '403',
          element: <NotAuthorized />
        },
        {
          path: '404',
          element: <NotFound />
        },
        {
          path: '500',
          element: <ServiceError />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to={'/404'} />
    }
  ];
};

const Routes = (): React.ReactElement | null => {
  return useRoutes(generate());
};

export default Routes;
