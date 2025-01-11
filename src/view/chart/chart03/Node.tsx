import React from 'react';

import { COLOR_MAP, TYPE_COLOR_MAP } from './constant';

interface NodeProps {
  data: any;
  clickEvent?: (id: string) => void;
}

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

const Node = ({ data, clickEvent }: NodeProps) => {
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
    isInnerRoom,
    nodeType
  } = data.data;

  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const curType: string = nodeType || 'base';
  const color = isHovered ? COLOR_MAP.active : TYPE_COLOR_MAP[curType];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: '#fff',
    border: `3px solid ${color}`,
    borderRadius: 16,
    cursor: 'pointer'
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid ${COLOR_MAP.isSelected}` });
  }

  let warnText: JSX.Element = <></>;
  let productText: JSX.Element = <></>;
  let roomText: JSX.Element = <></>;

  if (alarmTime || (traceRtnCode && traceRtnCode != 'SUC0000')) {
    warnText = <span style={{ color: COLOR_MAP.warn }}>[告警]</span>;
  }

  if (releaseLabel) {
    productText = <span style={{ color: COLOR_MAP.isProduction }}>[投产]</span>;
  }

  if (isInnerRoom) {
    roomText = <span style={{ color: COLOR_MAP.innerRoom }}>[室内]</span>;
  } else {
    roomText = <span style={{ color: COLOR_MAP.outerRoom }}>[室外]</span>;
  }

  return (
    <div
      style={containerStyle}
      onClick={() => {
        clickEvent && clickEvent(serviceUnit);
      }}
    >
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
      <div style={{ width: '100%', padding: '10px 5px 0px', textAlign: 'center' }}>
        <div style={{ fontSize: 18 }}>
          {warnText} {productText} {roomText}
        </div>
        <span style={{ color: '#666', fontWeight: 600, fontSize: 16, margin: '8px 0 0 0' }}>
          负责人:&nbsp;{majorManager}
        </span>
      </div>
    </div>
  );
};

export default Node;
