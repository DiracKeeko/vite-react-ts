import React from 'react';
import { Radio, Select, Space } from 'antd';

import { groupDesc, GROUPS, Perspective, ROOM, SELF } from '@/api/global/constant';

import './compoundSwitch.less';

export interface PerspectiveSwitchProps {
  value: Perspective;

  onChange(value: Perspective): void;
}

/**
 * 视角切换组件
 */
const PerspectiveSwitch: React.FC<PerspectiveSwitchProps> = ({ value, onChange }) => {
  return (
    <Space.Compact className={'switch'}>
      <Radio.Button checked={value === ROOM} onClick={() => onChange(ROOM)}>
        全室
      </Radio.Button>
      <Select
        placeholder={'组别'}
        options={GROUPS.map((group) => ({ value: group, label: groupDesc.get(group) }))}
        suffixIcon={null}
        className={GROUPS.includes(value) ? 'select-active' : undefined}
        onSelect={onChange}
      />
      <Radio.Button checked={value === SELF} onClick={() => onChange(SELF)}>
        我的
      </Radio.Button>
    </Space.Compact>
  );
};

export default PerspectiveSwitch;
