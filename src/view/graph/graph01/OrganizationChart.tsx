import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';

// 定义组织图的节点数据类型
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

const OrganizationChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 初始化图表
    if (containerRef.current) {
      const graph = new G6.TreeGraph({
        container: containerRef.current, // 挂载容器
        width: containerRef.current.offsetWidth, // 宽度
        height: containerRef.current.offsetHeight, // 高度
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
          size: [100, 40],
          shape: 'rect',
          style: {
            fill: '#9EC9FF',
            stroke: '#5B8FF9',
            lineWidth: 2
          }
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            stroke: '#A3B1BF'
          }
        },
        layout: {
          type: 'dendrogram', // 树形布局
          direction: 'TB', // 从上到下的布局
          dropCap: false, // 禁用起始节点
          nodeSep: 20, // 节点间距
          rankSep: 100 // 排列间距
        }
      });

      // 定义数据
      const data: TreeNode = {
        id: 'root',
        label: 'Root',
        children: [
          {
            id: 'node1',
            label: 'Node 1',
            children: [
              { id: 'node1-1', label: 'Node 1-1' },
              { id: 'node1-2', label: 'Node 1-2' }
            ]
          },
          {
            id: 'node2',
            label: 'Node 2',
            children: [
              { id: 'node2-1', label: 'Node 2-1' },
              { id: 'node2-2', label: 'Node 2-2' }
            ]
          }
        ]
      };

      // 设置数据并渲染图表
      graph.data(data);
      graph.render();
      graph.fitView();
    }

    // 清理图表实例
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default OrganizationChart;
