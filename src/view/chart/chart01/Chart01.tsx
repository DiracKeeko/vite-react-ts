import React from 'react';

import OrganizationChart from './OrganizationChart';

const nodesData = [
  {
    id: 'node-1',
    data: { name: 'Module', type: 'module', status: 'success', success: 90, time: 58, failure: 8 },
    style: { x: 100, y: 100 }
  },
  {
    id: 'node-2',
    data: { name: 'Process', type: 'process', status: 'error', success: 11, time: 12, failure: 26 },
    style: { x: 500, y: 200 }
  },
  {
    id: 'node-3',
    data: { name: 'Process', type: 'process', status: 'success', success: 88, time: 11, failure: 5 },
    style: { x: 900, y: 300 }
  }
];
const edgesData = [{ source: 'node-1', target: 'node-2' }, { source: 'node-2', target: 'node-3' }];

const Chart01 = () => {
  return <OrganizationChart containerId="container" nodesData={nodesData} edgesData={edgesData} />;
};

export default Chart01;
