import React from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';

import TabOperationChange from './TabOperationChange';
import TabProduction from './TabProduction';

const tabItems: {
  label: string; 
  key: string;
  children: JSX.Element | string;
}[] = [
  {
    label: '生产',
    key: 'production',
    children: <TabProduction />
  },
  {
    label: '运维变更',
    key: 'operationChange',
    children: <TabOperationChange />
  },
  {
    label: '当日UAT制品',
    key: 'uatLabel',
    children: "UAT label table"
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
