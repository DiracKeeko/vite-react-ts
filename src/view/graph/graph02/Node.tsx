// src/components/Node.tsx

import React from 'react';
import { BugOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

const { Text } = Typography;

const ACTIVE_COLOR = '#f6c523';
const COLOR_MAP: Record<string, string> = {
  'pre-inspection': '#3fc1c9',
  problem: '#8983f3',
  inspection: '#f48db4',
  solution: '#ffaa64',
};

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
    cursor: 'pointer',
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid #000` });
  }

  return (
    <Flex style={containerStyle} align="center" justify="center">
      <Flex vertical style={{ padding: '8px 16px', textAlign: 'center' }} align="center" justify="center">
        {type === 'problem' && <BugOutlined style={{ color: '#fff', fontSize: 24, marginBottom: 8 }} />}
        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{text}</Text>
      </Flex>
    </Flex>
  );
};

export default Node;
