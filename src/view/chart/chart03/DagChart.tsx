import React, { useEffect } from 'react';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { NodeData } from '@antv/g6/lib/spec';
import { NodeStyle } from '@antv/g6/lib/spec/element/node';
import { ReactNode } from '@antv/g6-extension-react';

import { COLOR_MAP, Edge, TYPE_SIZE_MAP } from './constant';
import Node from './Node';

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

interface DagChartProps {
  containerId: string; // G6 图表容器 ID
  nodesData: NodeData[]; // 节点数据
  edgesData: Edge[]; // 边数据
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
        style: (d: NodeData): NodeStyle => {
          const curType: string = (d.data?.nodeType as string) || 'base';
          const size = TYPE_SIZE_MAP[curType];

          const style = {
            component: <Node data={d} />,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
            size,
            dx: -size[0] / 2,
            dy: -size[1] / 2
          };
          return style as NodeStyle;
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
          stroke: COLOR_MAP.edge,
          endArrow: true,
          labelText: (d) => (d.data?.text as string) || '',
          labelFill: COLOR_MAP.edge,
          labelFontWeight: 600,
          labelBackground: true,
          labelBackgroundFill: '#f8f8f8',
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 3,
          labelBackgroundStroke: COLOR_MAP.edge,
          labelPadding: [1, 10],
          labelBackgroundRadius: 4,
          router: {
            type: 'orth'
          }
        },
        state: {
          active: {
            stroke: COLOR_MAP.active,
            labelBackgroundStroke: COLOR_MAP.active,
            halo: false
          }
        }
      },
      layout: {
        type: 'antv-dagre'
      },
      plugins: [
        {
          type: 'tooltip',
          trigger: 'hover', // 默认值hover;  'hover' || 'click'
          getContent: (e: any, items: any[]) => {
            let result = `<h4>tooltip content</h4>`;
            items.forEach((item) => {
              result += `<span>Type: ${item.data.nodeType}</span></br>`;
              result += `<span>Content: ${item.data.text}</span>`;
            });
            return result;
          }
        }
      ],
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
