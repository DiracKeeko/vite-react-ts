import React from 'react';

import { createEdgeArr, createServiceNodeArr, Edge, Node } from './constant';
import { edgeDtoArr, nodeDtoArr, otherInfo } from './mockData';
import DagChart from './DagChart';

const nodesData: Node[] = createServiceNodeArr(nodeDtoArr, otherInfo);

const edgesData: Edge[] = createEdgeArr(edgeDtoArr);

const Chart03 = () => {
  return <DagChart containerId="container" nodesData={nodesData} edgesData={edgesData} />;
};

export default Chart03;
