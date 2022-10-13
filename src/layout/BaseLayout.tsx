import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Outlet } from 'react-router-dom';
import '@/style/global.less';

import { UserInfo } from '@/api/global/constant';
import CusHeader from '@/component/CusHeader';

const { Content, Footer } = Layout;

export const UserContext = React.createContext<UserInfo | undefined>(undefined);

const BaseLayout: React.FC = () => {
  const [user, setUser] = useState<UserInfo>();
  useEffect(() => {
    const oneUserInfo: UserInfo = {
      userId: '007',
      userName: '法外狂徒张三',
      userAuthority: '1'
    };
    setUser(oneUserInfo);
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <UserContext.Provider value={user}>
          <CusHeader
            icon={import.meta.env.VITE_APP_ICON}
            title={import.meta.env.VITE_APP_TITLE}
            user={`${user?.userId}/${user?.userName}`}
          />
          <Layout className={'main'}>
            <Content className={'content'}>
              <Outlet />
            </Content>
            <Footer>{import.meta.env.VITE_FOOTER_TEXT}</Footer>
          </Layout>
        </UserContext.Provider>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
