import { ApiOutlined, DashboardOutlined, FallOutlined } from '@ant-design/icons';
import { MenuDividerProps, MenuItemGroupProps, MenuItemProps, SubMenuProps } from 'antd/lib/menu';
import React, { lazy } from 'react';

const menuConfig: ConfigType[] = [
  {
    type: 'item',
    title: '首页',
    route: '/home',
    icon: <DashboardOutlined />,
    element: lazy(() => import('@/view/home/Home'))
  },
  {
    type: 'sub',
    title: '数据管理',
    route: '/metaData',
    icon: <ApiOutlined />,
    children: [
      {
        type: 'item',
        title: '数据资产',
        route: '/metaData/assets',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/home/Home'))
      },
      {
        type: 'item',
        title: '数据字典',
        route: '/metaData/dict',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/metaData/dataDict/DataDict'))
      },
      {
        type: 'item',
        title: '链接关系',
        route: '/metaData/dictConnect',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/metaData/dictConnect/DictConnect'))
      },
      {
        type: 'item',
        title: '字典详情',
        route: '/metaData/dictDetail',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/metaData/dictDetail/DictDetail'))
      }
    ]
  },
  {
    type: 'sub',
    title: '案例展示',
    route: '/case',
    icon: <ApiOutlined />,
    children: [
      {
        type: 'item',
        title: '类型问题',
        route: '/case/case1',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case1/Case1'))
      },
      {
        type: 'item',
        title: 'js-financial-tools使用',
        route: '/case/case2',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case2/Case2'))
      },
      {
        type: 'item',
        title: 'context使用',
        route: '/case/case3',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case3/Case3'))
      },
      {
        type: 'item',
        title: 'Tree的报错举例',
        route: '/case/case4',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case4/Case4'))
      },
      {
        type: 'item',
        title: 'Card组件',
        route: '/case/case5',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case5/Case5'))
      },
      {
        type: 'item',
        title: '优雅使用svg',
        route: '/case/case6',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case6/Case6'))
      },
      {
        type: 'item',
        title: '交互组件',
        route: '/case/case7',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case7/Case7'))
      },
      {
        type: 'item',
        title: 'NoContent组件',
        route: '/case/case8',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/case/case8/Case8'))
      }
    ]
  }
];

interface ItemProps extends Omit<MenuItemProps, 'children'> {
  type: 'item';
  title: string;
  route: string;
  element: React.LazyExoticComponent<any>;
}

interface SubProps extends Omit<SubMenuProps, 'children'> {
  type: 'sub';
  title: string;
  route: string;
  children: (ItemProps | SubProps | GroupProps | DividerProps)[];
}

interface GroupProps extends Omit<MenuItemGroupProps, 'children'> {
  type: 'group';
  title: string;
  children: (ItemProps | SubProps)[];
}

interface DividerProps extends MenuDividerProps {
  type: 'divider';
}

export type ConfigType = ItemProps | SubProps | GroupProps | DividerProps;

export default menuConfig;
