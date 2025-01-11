import React, { useEffect } from 'react';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { NodeData } from '@antv/g6/lib/spec';
import { NodeStyle } from '@antv/g6/lib/spec/element/node';
import { ReactNode } from '@antv/g6-extension-react';

import { COLOR_MAP, Edge, Node, TYPE_SIZE_MAP } from './constant';
import G6Node from './Node';

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
  clickEvent?: (id: string) => void;
}

const DagChart = ({ containerId, nodesData, edgesData, clickEvent }: DagChartProps) => {
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
            component: <G6Node data={d} clickEvent={clickEvent} />,
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
        type: 'antv-dagre' // 'antv-drage' 支持跨层级连接 (A->B->C 同时A->C), 在复杂的节点关系中，跨层级连接可能会导致整图报错，表现为无法渲染，控制台输出targetId找不到
        // 'antv-dagre' 不支持tree布局的节点折叠。
        // type: 'antv-dagre' | 'dagre'
      },
      plugins: [
        {
          type: 'tooltip',
          trigger: 'hover', // 默认值hover;  'hover' || 'click'
          getContent: (e: any, items: any[]) => {
            let res = '';
            items.forEach((item) => {
              const node = item as Node;
              const {
                serviceName,
                serviceUnit,
                majorManager,
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
                traceRtnCode
              } = node.data;
              const warnColor = COLOR_MAP.warn;
              res += `
                <p style="font-size:12px; color:'#333'; font-weight: bold;">
                  ${serviceUnit} <br>
                  (${serviceName})
                </p>
              `;
              res += `
                <span>负责人: </span>
                <span>${majorManager}</span><br>
              `;
              if (alarmTime) {
                res += `
                  <span>云哨告警时间: </span>
                  <span style="color:${warnColor};">${alarmTime}</span><br>
                `;
              }
              if (releaseTime) {
                res += `
                  <span>变更时间: ${releaseTime}</span><br>
                  <span style="word-wrap: break-word;">制品: ${releaseLabel}</span><br>
                  <span>操作人: ${releaseOperator}</span><br>
                `;
              }
              if (functionCode) {
                res += `
                  <span>接口编码: ${functionCode}</span><br>
                  <span>接口路径: ${interfacePath}</span><br>
                  <span>接口描述: ${interfaceDesc}</span><br>
                `;
              }
              if (traceId && traceRtnCode !== 'SUC0000') {
                res += `
                  <span>北斗告警信息: ${traceErrorDesc}</span><br>
                `;
              }
              res += `
                <span>北斗接口信息: ${traceApi}</span><br>
                <span>北斗返回码: ${traceRtnCode}</span><br>
              `;
            });
            return res;
          }
        },
        {
          type: 'minimap',
          size: [240, 160]
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
