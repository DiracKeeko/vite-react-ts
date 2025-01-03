import React, { useEffect } from 'react';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { NodeData } from '@antv/g6/lib/spec';
import { ReactNode } from '@antv/g6-extension-react';

import Node from './Node';

const ACTIVE_COLOR = '#f6c523';

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

register(ExtensionCategory.NODE, 'react', ReactNode);
register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

type SizeMap = {
  [key: string]: [number, number];
  preInspection: [number, number];
  problem: [number, number];
  inspection: [number, number];
  solution: [number, number];
  default: [number, number];
};

interface DagChartProps {
  containerId: string; // G6 图表容器 ID
  nodesData: NodeData[]; // 节点数据
  edgesData: { source: string; target: string }[]; // 边数据
}

const DagChart = ({ containerId, nodesData, edgesData }: DagChartProps) => {
  useEffect(() => {
    const graphInstance: Graph | null = new Graph({
      container: containerId,
      data: {
        nodes: nodesData,
        edges: edgesData
      },
      autoFit: 'view',
      node: {
        type: 'react',
        style: (d: NodeData) => {
          const curType: string = (d.data?.type as string) || 'default';
          const sizeMap: SizeMap = {
            preInspection: [240, 120],
            problem: [200, 120],
            inspection: [330, 100],
            solution: [200, 120],
            default: [200, 80]
          };
          const size = sizeMap[curType];

          const style = {
            component: <Node data={d} />,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
            size,
            dx: -size[0] / 2,
            dy: -size[1] / 2
          };
          return style;
        },
        state: {
          active: {
            halo: false
          },
          selected: {
            halo: false
          }
        }
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 3,
          radius: 20,
          stroke: '#8b9baf',
          endArrow: true,
          labelText: (d) => d.data.text,
          labelFill: '#8b9baf',
          labelFontWeight: 600,
          labelBackground: true,
          labelBackgroundFill: '#f8f8f8',
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 3,
          labelBackgroundStroke: '#8b9baf',
          labelPadding: [1, 10],
          labelBackgroundRadius: 4,
          router: {
            type: 'orth'
          }
        },
        state: {
          active: {
            stroke: ACTIVE_COLOR,
            labelBackgroundStroke: ACTIVE_COLOR,
            halo: false
          }
        }
      },
      layout: {
        type: 'antv-dagre'
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'hover-element', 'click-select']
    });

    graphInstance.render();

    // 清理图表
    return () => {
      graphInstance && graphInstance.destroy(); // 清理图表实例
    };
  }, []);

  return <div id={containerId} style={{ width: '100%', height: '100%' }}></div>;
};

export default DagChart;
