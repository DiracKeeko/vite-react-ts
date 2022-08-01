import { UserOutlined } from '@ant-design/icons';
import { Col, Image, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CusMenu from '@/component/CusMenu';

const { Text } = Typography;
const { Header } = Layout;

interface CusHeaderProps {
  icon: string;
  title: string;
  user: string;
}

const CusHeader: React.FC<CusHeaderProps> = (props: CusHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Header>
      <Row align={'middle'} justify={'space-between'} wrap={false} style={{ width: '100%' }}>
        <Col flex="0 1 240px" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={props.icon} width={46} preview={false} />
          <Text style={{ color: '#f0f2f5', marginLeft: 8, fontSize: 20 }}>{props.title}</Text>
        </Col>
        <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
          <CusMenu
            onClick={navigate}
            style={{ width: '100%' }}
            theme={'dark'}
            mode={'horizontal'}
            selectedKeys={[location.pathname]}
          />
        </Col>
        <Col flex="0 1 340px" style={{ textAlign: 'right', color: '#f0f2f5' }}>
          <div>
            <UserOutlined />
            <Text style={{ color: '#f0f2f5', marginLeft: 8, fontSize: 14 }}>{props.user}</Text>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default CusHeader;
