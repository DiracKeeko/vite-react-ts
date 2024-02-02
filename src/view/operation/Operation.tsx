import React from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';

import TabChange from './TabOperationChange';
import TabProduction from './TabProduction';

const tabItems: {
  label: string;
  key: string;
  children: JSX.Element;
}[] = [
  {
    label: '生产',
    key: 'production',
    children: <TabProduction />
  },
  {
    label: '变更',
    key: 'operationChange',
    children: <TabChange />
  }
];

const Operation = () => {
  const [searchParams] = useSearchParams();
  const activeMenu: string = searchParams.get('activeMenu') || 'production';

  const navigate = useNavigate();
  const switchTab = (newKey: string) => {
    const params = { activeMenu: newKey };
    navigate({
      pathname: '/operation',
      search: `?${createSearchParams(params)}`
    });
  };
  return (
    <Tabs
      activeKey={activeMenu}
      onTabClick={(newKey) => {
        switchTab(newKey);
      }}
      items={tabItems}
    ></Tabs>
  );
};

export default Operation;
