import React from 'react';
import { BugOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { ACTIVE_COLOR, COLOR_MAP } from './constant';

const { Text } = Typography;

interface NodeProps {
  data: any;
}

const Node: React.FC<NodeProps> = ({ data }) => {
  const { text, type } = data.data;
  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const color = isHovered ? ACTIVE_COLOR : COLOR_MAP[type];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: color,
    border: `3px solid ${color}`,
    borderRadius: 16,
    cursor: 'pointer'
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid #000` });
  }

  return (
    <div className="d-flex jc-center ai-center" style={containerStyle}>
      <div
        className="d-flex jc-center ai-center"
        style={{ padding: '8px 16px', textAlign: 'center' }}
      >
        {type === 'problem' && (
          <BugOutlined style={{ color: '#fff', fontSize: 24, marginBottom: 8 }} />
        )}
        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{text}</Text>
      </div>
    </div>
  );
};

export default Node;
