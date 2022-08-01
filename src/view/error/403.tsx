import { Button, Result } from 'antd';
import React from 'react';

const NotAuthorized: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle={'对不起，你没有访问权限，或登录已超时。'}
      extra={
        <Button type="primary" onClick={() => (window.location.href = '/re-login')}>
          前往登录页面
        </Button>
      }
    />
  );
};

export default NotAuthorized;
