import React, { useEffect, useRef } from 'react';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { NodeData } from "@antv/g6/lib/spec";
import { GNode } from '@antv/g6-extension-react';

import Node from './Node'; // 引入 Node 组件

register(ExtensionCategory.NODE, 'g', GNode);

// interface NodeData {
//   id: string;
//   data: any;
//   style: {
//     x: number;
//     y: number;
//   };
// }

interface OrganizationChartProps {
  containerId: string; // G6 图表容器 ID
  nodesData: NodeData[]; // 节点数据
  edgesData: { source: string; target: string }[]; // 边数据
}

const OrganizationChart: React.FC<OrganizationChartProps> = ({
  containerId,
  nodesData,
  edgesData
}) => {
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.destroy(); // 销毁之前的图表实例（防止重复渲染）
    }

    const graph = new Graph({
      container: containerId, // 容器 ID
      data: {
        nodes: nodesData,
        edges: edgesData
      },
      node: {
        type: 'g', // 使用自定义节点类型
        style: {
          size: [180, 60], // 默认节点大小
          component: (data) => <Node data={data} size={[180, 60]} /> // 自定义节点组件
        }
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'] // 启用交互
    });

    graphRef.current = graph; // 保存图表实例

    graph.render(); // 渲染图表

    return () => {
      if (graphRef.current) {
        graphRef.current.destroy(); // 清理图表实例
      }
    };
  }, [containerId, nodesData, edgesData]); // 当容器或数据变化时重新渲染

  return <div id={containerId} style={{ width: '100%', height: '500px' }}></div>;
};

export default OrganizationChart;