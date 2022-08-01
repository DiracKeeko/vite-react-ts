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
    title: '元数据',
    route: '/meta-data',
    icon: <ApiOutlined />,
    children: [
      {
        type: 'item',
        title: '数据资产',
        route: '/meta-data/assets',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/test/Test'))
      },
      {
        type: 'item',
        title: '数据字典',
        route: '/meta-data/dict',
        icon: <ApiOutlined />,
        element: lazy(() => import('@/view/test/Test'))
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
