import React, { useEffect } from 'react';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { NodeData } from '@antv/g6/lib/spec';
import { GNode } from '@antv/g6-extension-react';

import Node, { DataItem } from './Node'; // 引入 Node 组件

// 定义 hoverElement 行为
class HoverElement extends HoverActivate {
  getActiveIds(event: any) {
    const { model, graph } = this.context;
    const { targetType, target } = event;
    const targetId = target.id;

    const ids = [targetId];
    if (targetType === 'edge') {
      const edge = model.getEdgeDatum(targetId);
      ids.push(edge.source, edge.target);
    } else if (targetType === 'node') {
      ids.push(...model.getRelatedEdgesData(targetId).map(idOf));
    }

    graph.frontElement(ids);

    return ids;
  }
}

register(ExtensionCategory.NODE, 'g', GNode);
register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

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
  useEffect(() => {
    const graphInstance: Graph | null = new Graph({
      container: containerId, // 容器 ID
      data: {
        nodes: nodesData,
        edges: edgesData
      },
      node: {
        type: 'g', // 使用自定义节点类型
        style: {
          size: [180, 60], // 默认节点大小
          component: (data: DataItem) => <Node data={data} size={[180, 60]} /> // 自定义节点组件
        }
      },
      edge: {
        // type: 'polyline', // 'polyline' 线条为 两边垂直 + 圆形过渡
        style: {
          lineWidth: 2,
          radius: 20,
          stroke: '#8b9baf',
          endArrow: true,
          endArrowSize: 9,
          labelFill: '#8b9baf',
          labelFontWeight: 600,
          labelBackground: true,
          labelBackgroundFill: '#f8f8f8',
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 2,
          labelBackgroundStroke: '#8b9baf',
          labelPadding: [1, 10],
          labelBackgroundRadius: 4,
          router: {
            type: 'orth'
          }
        },
        state: {
          // ↓ 激活状态配置
          active: {
            stroke: '#f6c523', // ACTIVE_COLOR,
            labelBackgroundStroke: '#f6c523',
            halo: false
          }
        }
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas', 'hover-element'] // 启用交互
    });

    graphInstance.render(); // 渲染图表

    return () => {
      graphInstance && graphInstance.destroy(); // 清理图表实例
    };
  }, [containerId, nodesData, edgesData]); // 当容器或数据变化时重新渲染

  return (
    <div
      id={containerId}
      style={{ width: '90vw', height: '500px', border: '1px solid #cccccc' }}
    ></div>
  );
};

export default OrganizationChart;
