import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/g6';

import Node from './Node';

const ACTIVE_COLOR = '#f6c523';

export const PerformanceDiagnosisFlowchart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const graphInstance: Graph | null = new Graph({
      container: containerRef.current!,
      data,
      autoFit: 'view',
      node: {
        type: 'react',
        style: (d) => {
          const style = {
            component: <Node data={d} />,
            ports: [{ placement: 'top' }, { placement: 'bottom' }]
          };

          const size = {
            'pre-inspection': [240, 120],
            problem: [200, 120],
            inspection: [330, 100],
            solution: [200, 120]
          }[d.data.type] || [200, 80];

          Object.assign(style, {
            size,
            dx: -size[0] / 2,
            dy: -size[1] / 2
          });
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

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default PerformanceDiagnosisFlowchart;
