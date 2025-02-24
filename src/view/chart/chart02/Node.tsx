import React from 'react';
import { BugOutlined } from '@ant-design/icons';

import { ACTIVE_COLOR, COLOR_MAP } from './constant';

interface NodeProps {
  data: any;
}

const Node: React.FC<NodeProps> = ({ data }) => {
  const { text, type } = data.data;
  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const curType: string = type || 'default';
  const color = isHovered ? ACTIVE_COLOR : COLOR_MAP[curType];

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
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{text}</span>
      </div>
    </div>
  );
};

export default Node;
