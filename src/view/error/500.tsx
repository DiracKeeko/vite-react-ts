import { Result } from 'antd';
import React from 'react';

const ServiceError: React.FC = () => {
  return <Result status="500" title="500" subTitle="对不起，服务异常，请稍后再试。" />;
};

export default ServiceError;
