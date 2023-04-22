import { Row, Col } from 'antd';

import ButtonSwitch from '@/component/buttonSwitch/ButtonSwitch';
import BorderSwitch from '@/component/borderSwitch/BorderSwitch';

const Case7 = () => {
  const tabItemList = [
    { key: 'incomeRate', label: '收益走势' },
    { key: 'nav', label: '净值走势' }
  ];
  return (
    <>
      <Row>
        <Col span={16}>
          <ButtonSwitch
            tabItemList={tabItemList}
            curSelectKey="nav"
            onTabChange={(item, index) => {
              console.log('item->', item);
              console.log('index->', index);
            }}
          ></ButtonSwitch>
        </Col>
      </Row>
      <Row style={{"margin": "10px 0"}}>
        <Col span={16}>
          <BorderSwitch
            tabItemList={tabItemList}
            curSelectKey="nav"
            onTabChange={(item, index) => {
              console.log('item->', item);
              console.log('index->', index);
            }}
          ></BorderSwitch>
        </Col>
      </Row>
    </>
  );
};

export default Case7;
