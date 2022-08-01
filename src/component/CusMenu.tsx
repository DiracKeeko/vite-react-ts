import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

import menuConfig, { ConfigType } from '@/config/menuConfig';

const generateMenuItems = (config: ConfigType[]): ItemType[] => {
  const items: ItemType[] = [];
  for (const c of config) {
    switch (c.type) {
      case 'item':
        items.push({
          title: c.title,
          label: c.title,
          icon: c.icon,
          key: c.route
        });
        break;
      case 'sub':
        items.push({
          title: c.title,
          label: c.title,
          icon: c.icon,
          key: c.route,
          children: generateMenuItems(c.children)
        });
        break;
      case 'group':
        items.push({
          type: 'group',
          label: c.title,
          children: generateMenuItems(c.children)
        });
        break;
      case 'divider':
        items.push({
          type: 'divider',
          dashed: c.dashed
        });
        break;
      default:
        break;
    }
  }
  return items;
};

export interface CusMenuProps extends Omit<MenuProps, 'onClick' | 'items'> {
  onClick(key: string): void;
}

const CusMenu: React.FC<CusMenuProps> = ({ onClick, ...others }: CusMenuProps) => {
  const items = generateMenuItems(menuConfig);

  return <Menu items={items} onClick={({ key }) => onClick(key)} {...others} />;
};

export default CusMenu;
