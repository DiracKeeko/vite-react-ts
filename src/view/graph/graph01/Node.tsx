import React from 'react';
import { Group, Image, Rect, Text } from '@antv/g6-extension-react';

import pngModule from '@/asset/node_module.png';
import pngProcess from '@/asset/node_module.png';

type DataItem = {
  id: string;
  data: {
    name: string;
    type: string;
    status: string;
    success: number;
    time: number;
    failure: number;
  };
  style: {
    x: number;
    y: number;
  };
};

interface NodeProps {
  data: DataItem;
  size: [number, number];
}

type TitleMap = {
  [key: string]: string;
  success: string;
  time: string;
  failure: string;
};

const Node: React.FC<NodeProps> = ({ data, size }) => {
  const [width, height] = size;

  const { name, status, type, success, time, failure } = data.data;
  const color = status === 'success' ? '#30BF78' : '#F4664A';
  const radius = 4;

  const titleMap: TitleMap = {
    success: 'Success',
    time: 'Time',
    failure: 'Failure'
  };

  const format = (category: string, value: any) => {
    if (category === 'success') return `${value}%`;
    if (category === 'time') return `${value}min`;
    return value.toString();
  };

  const highlight = (category: string, value: any) => {
    if (category === 'success') {
      if (value >= 90) return 'green';
      if (value < 60) return 'red';
      return 'gray';
    }
    if (category === 'time') {
      if (value <= 10) return 'green';
      if (value >= 30) return 'red';
      return 'gray';
    }
    if (value >= 20) return 'red';
    if (value >= 5) return 'orange';
    return 'gray';
  };

  return (
    <Group>
      <Rect width={width} height={height} stroke={color} fill={'white'} radius={radius}>
        <Rect width={width} height={20} fill={color} radius={[radius, radius, 0, 0]}>
          <Image
            src={type === 'module' ? pngModule : pngProcess}
            x={2}
            y={2}
            width={16}
            height={16}
          />
          <Text text={name} textBaseline="top" fill="#fff" fontSize={14} dx={20} dy={2} />
        </Rect>
        <Group transform="translate(5,40)">
          {Object.entries({ success, time, failure }).map(([key, value], index) => (
            <Group key={index} transform={`translate(${(index * width) / 3}, 0)`}>
              <Text text={titleMap[key]} fontSize={12} fill="gray" />
              <Text text={format(key, value)} fontSize={12} dy={16} fill={highlight(key, value)} />
            </Group>
          ))}
        </Group>
      </Rect>
    </Group>
  );
};

export default Node;
