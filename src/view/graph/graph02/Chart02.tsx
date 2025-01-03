import React from 'react';

import DagChart from './DagChart';

const nodesData = [
  {
    id: '0',
    data: {
      type: 'pre-inspection',
      text: 'Check I/O wait (top)'
    }
  },
  {
    id: '1',
    data: {
      type: 'pre-inspection',
      text: 'Check swap (free-m)'
    }
  },
  {
    id: '2',
    data: {
      type: 'pre-inspection',
      text: 'Check % CPU (top)'
    }
  },
  {
    id: '3',
    data: {
      type: 'problem',
      text: 'RAM PROBLEM'
    }
  },
  {
    id: '4',
    data: {
      type: 'problem',
      text: 'I/O'
    }
  },
  {
    id: '5',
    data: {
      type: 'problem',
      text: 'APP PROBLEM'
    }
  },
  {
    id: '6',
    data: {
      type: 'problem',
      text: 'CPU PROBLEM'
    }
  },
  {
    id: '7',
    data: {
      type: 'inspection',
      text: "What's hogging RAM? (top)"
    }
  },
  {
    id: '8',
    data: {
      type: 'inspection',
      text: 'Check history - Is the usage an anomaly?'
    }
  },
  {
    id: '9',
    data: {
      type: 'solution',
      text: 'Kill processes'
    }
  },
  {
    id: '10',
    data: {
      type: 'solution',
      text: 'Infrastructure problem - add RAM'
    }
  },
  {
    id: '11',
    data: {
      type: 'inspection',
      text: "What's hogging IO? (lotop)"
    }
  },
  {
    id: '12',
    data: {
      type: 'inspection',
      text: 'Look for an external dependency. Use strace and Iso to track down issues'
    }
  },
  {
    id: '13',
    data: {
      type: 'inspection',
      text: 'Confirm by checking CPU % user time (top) expect it to be high'
    }
  },
  {
    id: '14',
    data: {
      type: 'inspection',
      text: 'Check list of processes (top) - which are using CPU?'
    }
  },
  {
    id: '15',
    data: {
      type: 'inspection',
      text: 'Check-history - Is the usage an anomaly?'
    }
  },
  {
    id: '16',
    data: {
      type: 'solution',
      text: 'Kill processes'
    }
  },
  {
    id: '17',
    data: {
      type: 'solution',
      text: 'Infrastructure problem - add cores'
    }
  }
];
const edgesData = [
  {
    source: '0',
    target: '1',
    data: {
      text: 'HIGH'
    }
  },
  {
    source: '0',
    target: '2',
    data: {
      text: 'LOW'
    }
  },
  {
    source: '1',
    target: '3',
    data: {
      text: 'HIGH'
    }
  },
  {
    source: '1',
    target: '4',
    data: {
      text: 'LOW'
    }
  },
  {
    source: '2',
    target: '5',
    data: {
      text: 'HIGH'
    }
  },
  {
    source: '2',
    target: '6',
    data: {
      text: 'LOW'
    }
  },
  {
    source: '3',
    target: '7',
    data: {}
  },
  {
    source: '7',
    target: '8',
    data: {}
  },
  {
    source: '8',
    target: '9',
    data: {
      text: 'YES'
    }
  },
  {
    source: '8',
    target: '10',
    data: {
      text: 'NO'
    }
  },
  {
    source: '4',
    target: '11',
    data: {}
  },
  {
    source: '5',
    target: '12',
    data: {}
  },
  {
    source: '6',
    target: '13',
    data: {}
  },
  {
    source: '13',
    target: '14',
    data: {}
  },
  {
    source: '14',
    target: '15',
    data: {}
  },
  {
    source: '15',
    target: '16',
    data: {
      text: 'YES'
    }
  },
  {
    source: '15',
    target: '17',
    data: {
      text: 'NO'
    }
  }
];

const Chart02 = () => {
  return <DagChart containerId="container" nodesData={nodesData} edgesData={edgesData} />;
};

export default Chart02;
