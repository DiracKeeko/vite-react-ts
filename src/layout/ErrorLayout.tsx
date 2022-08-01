import { Row } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ErrorLayout: React.FC = () => {
  return (
    <Row style={{ height: '100%' }} align={'middle'} justify={'center'}>
      <Outlet />
    </Row>
  );
};

export default ErrorLayout;
