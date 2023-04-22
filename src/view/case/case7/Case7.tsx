import { Row, Col } from 'antd';

import ButtonSwitch from '@/component/buttonSwitch/ButtonSwitch';

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
    </>
  );
};

export default Case7;
