import react from 'react';
import { Row, Col, Input, Select, Radio } from 'antd';

import InputWrapper from '@/component/inputWrapper/InputWrapper';

const Wrapper = () => {
  const wapperMockData = [
    {
      label: '基金产品',
      required: true,
      type: 'Input'
    },
    {
      label: '基金公司',
      type: 'Input'
    },
    {
      label: '基金经理',
      type: 'Input'
    },
    {
      label: '负责人',
      type: 'Select'
    },
    {
      label: '收益率排行',
      type: 'Input'
    },
    {
      label: '是否外部可见',
      type: 'Radio'
    }
  ];
  const renderContent = (type: string) => {
    switch (type) {
      case 'Input':
        return <Input />;
      case 'Select':
        return (
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              {
                value: 'jack',
                label: 'Jack'
              },
              {
                value: 'lucy',
                label: 'Lucy'
              },
              {
                value: 'disabled',
                disabled: true,
                label: 'Disabled'
              },
              {
                value: 'Yiminghe',
                label: 'yiminghe'
              }
            ]}
          />
        );
      case 'Radio':
        return (
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        );
    }
  };
  return (
    <Row gutter={[24, 16]}>
      {wapperMockData.map((item, index) => {
        return (
          <Col span={6}>
            <InputWrapper label={item.label} required={item.required} key={index}>
              {renderContent(item.type)}
            </InputWrapper>
          </Col>
        );
      })}
    </Row>
  );
};

export default Wrapper;
