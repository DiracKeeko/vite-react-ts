import React from 'react';

import { createEdgeArr, createServiceNodeArr, Edge, Node } from './constant';
import DagChart from './DagChart';
import { edgeDtoArr, nodeDtoArr, otherInfo } from './mockData';

const nodesData: Node[] = createServiceNodeArr(nodeDtoArr, otherInfo);

const edgesData: Edge[] = createEdgeArr(edgeDtoArr);

const Chart03 = () => {
  return <DagChart containerId="container" nodesData={nodesData} edgesData={edgesData} />;
};

export default Chart03;
