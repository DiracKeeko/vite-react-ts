import React from 'react';
import { Typography } from 'antd';

import { ACTIVE_COLOR, COLOR_MAP } from './constant';

const { Text } = Typography;

interface NodeProps {
  data: any;
}

const Node = ({ data }: NodeProps) => {
  const {
    serviceName,
    serviceUnit,
    majorManager,
    // alarmException,
    alarmTime,
    releaseTime,
    releaseLabel,
    releaseOperator,
    functionCode,
    interfacePath,
    interfaceDesc,
    traceId,
    traceErrorDesc,
    traceApi,
    traceRtnCodetype,
    type
  } = data.detail;

  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const curType: string = type || 'default';
  const color = isHovered ? ACTIVE_COLOR : COLOR_MAP[curType];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: '#fff',
    border: `3px solid ${color}`,
    borderRadius: 16,
    cursor: 'pointer'
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid #000` });
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          backgroundColor: color,
          width: '100%',
          height: '60px',
          padding: '0 0 0 5px',
          textAlign: 'left',
          borderRadius: '13px 13px 0 0'
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{serviceUnit}</Text>
      </div>
      <div
        className="d-flex jc-center ai-center"
        style={{ width: '100%', padding: '8px 16px', textAlign: 'center' }}
      >
        <Text style={{ color: '#000', fontWeight: 600, fontSize: 16 }}>{serviceName}</Text>
      </div>
    </div>
  );
};

export default Node;
