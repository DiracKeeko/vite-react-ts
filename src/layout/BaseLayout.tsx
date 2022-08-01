import '@/style/global.less';

import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
import { Outlet } from 'react-router-dom';

import CusHeader from '@/component/CusHeader';

const { Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <CusHeader
          icon={import.meta.env.VITE_APP_ICON}
          title={import.meta.env.VITE_APP_TITLE}
          user={'宣凯洲/291465'}
        />
        <Layout className={'main'}>
          <Content className={'content'}>
            <Outlet />
          </Content>
          <Footer>{import.meta.env.VITE_FOOTER_TEXT}</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
