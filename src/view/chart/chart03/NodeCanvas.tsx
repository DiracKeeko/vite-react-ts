import React from 'react';
import { Group, Rect as GRect, Text } from '@antv/g6-extension-react';

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
    serviceUnit,
    majorManager,
    // alarmException,
    alarmTime,
    releaseLabel,
    traceRtnCode,
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
    <Group
      onClick={() => {
        clickEvent && clickEvent(serviceUnit);
      }}
    >
      {/* 顶部栏 */}
      <GRect width={containerStyle.width!} height={30} stroke={color} radius={[13, 13, 0, 0]}>
        <Text
          text={formatServiceUnit(serviceUnit)}
          fill="#fff"
          fontWeight={600}
          fontSize={18}
          x={10}
          y={6} // 垂直居中
        />
      </GRect>

      {/* 内容区域 */}
      <GRect
        width={containerStyle.width!}
        height={containerStyle.height - 30}
        fill="transparent"
        y={30}
      >
        {/* 中心内容 */}
        <Group>
          <Text
            text={`${warnText} ${productText} ${roomText}`}
            fontSize={18}
            textAlign="center"
            x={containerStyle.width / 2}
            y={10} // 上边距
          />
        </Group>
        {/* 负责人 */}
        <Group>
          <Text
            text={`负责人: ${majorManager}`}
            fill="#666"
            fontWeight={600}
            fontSize={16}
            textAlign="center"
            x={containerStyle.width / 2}
            y={50} // 根据需要调整位置
          />
        </Group>
      </GRect>
    </Group>
  );
};

export default Node;
