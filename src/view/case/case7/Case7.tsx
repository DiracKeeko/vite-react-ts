import React, { useState } from 'react';
import { Row, Col } from 'antd';

import ButtonSwitch from '@/component/buttonSwitch/ButtonSwitch';
import BorderSwitch from '@/component/borderSwitch/BorderSwitch';
import QuarterSelect from '@/component/quarterSelect/QuarterSelect';

// Switch
const tabItemList = [
  { key: 'incomeRate', label: '收益走势' },
  { key: 'nav', label: '净值走势' }
];

// QuarterSelect
const quarterArr = [
  '2022Q3',
  '2022Q2',
  '2022Q1',
  '2021Q4',
  '2021Q3',
  '2021Q2',
  '2021Q1',
  '2020Q4',
  '2020Q3',
  '2020Q2',
  '2020Q1'
];
const Case7 = () => {
  const [quarterIndex, setQuarterIndex] = useState<number>(0);
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
      <Row style={{ margin: '10px 0' }}>
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

      <div style={{ padding: '0 0 0 60%' }}>
        <QuarterSelect
          quarterIndex={quarterIndex}
          quarterArr={quarterArr}
          onChange={(index) => {
            console.log('index->', index);
            setQuarterIndex(index);
          }}
        ></QuarterSelect>
      </div>
    </>
  );
};

export default Case7;
