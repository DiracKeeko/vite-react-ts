import React from 'react';

import { ACTIVE_COLOR, COLOR_MAP } from './constant';


type OtherInfo = {
  traceId: string;
  room: string;
  coreServiceUnit: string;
  coreInterfaceCode: string;
};

interface NodeProps {
  data: any;
  otherInfo: OtherInfo;
}

const colorMap = {
  succ: '#99e98e',
  warn: '#EC4234',
  innerLink: '#B0ACA2', // 基础
  outerTrace: '#6B705C', // 北斗链路
  innerRoom: '#2d2686',
  outerRoom: '#FFD700',
  isProduction: '#1E90FF',
  core: '#DD7D23'
};

function formatServiceUnit(serviceUnit: string): string {
  let res = serviceUnit;
  if (res.length > 18) {
    res = serviceUnit.split('_')[0];
  }
  if (res.length > 18) {
    res = `${res.slice(0, 15)}...`;
  }
  return res;
}

const Node = ({ data, otherInfo }: NodeProps) => {
  const {
    serviceName,
    serviceUnit,
    majorManager,
    ownRoom,
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
    traceRtnCode,
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

  let warnText: JSX.Element = <></>;
  let productText: JSX.Element = <></>;
  let roomText: JSX.Element = <></>;

  if (alarmTime || (traceRtnCode && traceRtnCode != 'SUC0000')) {
    warnText = <span style={{ color: colorMap.warn }}>[告警]</span>;
  }

  if (releaseLabel) {
    productText = <span style={{ color: colorMap.isProduction }}>[投产]</span>;
  }

  if (otherInfo && otherInfo.room === ownRoom) {
    roomText = <span style={{ color: colorMap.innerRoom }}>[室内]</span>;
  } else {
    roomText = <span style={{ color: colorMap.outerRoom }}>[室外]</span>;
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          backgroundColor: color,
          width: '100%',
          height: '30px',
          padding: '0 0 0 10px',
          textAlign: 'left',
          borderRadius: '13px 13px 0 0'
        }}
      >
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>
          {formatServiceUnit(serviceUnit)}
        </span>
      </div>
      <div
        style={{ width: '100%', padding: '10px 5px 0px', textAlign: 'center' }}
      >
        <div style={{ fontSize: 18 }}>
          {warnText} {productText} {roomText}
        </div>
        <span style={{ color: '#666', fontWeight: 600, fontSize: 16, margin: '8px 0 0 0' }}>负责人:&nbsp;{majorManager}</span>
      </div>
    </div>
  );
};

export default Node;
