import React from 'react';

import { createServiceNodeArr, Node, OtherInfo, ServiceNodeDTO } from './constant';
import DagChart from './DagChart';

const otherInfo: OtherInfo = {
  traceId: '',
  room: '开发一室(地区A)',
  coreServiceUnit: 'service_unit_001',
  coreInterfaceCode: ''
};

const nodeDtoArr: ServiceNodeDTO[] = [
  {
    id: '193bb6b6-f99c-48e8-aa40-3d026ffa433e',
    detail: {
      deployType: 'Kubernetes',
      systemId: 'LS99',
      systemName: '平台A',
      systemImportanceLevel: 'A',
      subSystemId: 'LS99.02',
      subSystemName: '数据处理模块',
      subSystemImportanceLevel: 'C',
      serviceUnit: 'service_unit_001',
      serviceName: '服务单元001',
      serviceImportanceLevel: '1',
      ownRoom: '开发一室(地区A)',
      majorManager: '张明',
      analysisImportance: 'High',
      analysisScores: '92',
      alarmException: '连接异常',
      alarmTime: '',
      alarmCount: '4',
      releaseLabel: 'CS_LS99.02_service_unit_001_master_UAT_C91_20250105_01',
      releaseTime: '2025-01-04 16:00:00',
      releaseOperator: '李辉',
      traceId: 'a1b2c3d4e5f6',
      traceErrorDesc: '请求超时',
      traceApi: '/api/v1/fetch-data',
      traceRtnCode: ''
    }
  },
  {
    id: 'fbc92b72-6eb4-42d1-b183-5e941cb59eb0',
    detail: {
      deployType: 'Docker',
      systemId: 'LS77',
      systemName: '平台B',
      systemImportanceLevel: 'B',
      subSystemId: 'LS77.03',
      subSystemName: '业务处理子系统',
      subSystemImportanceLevel: 'A',
      serviceUnit: 'service_unit_002',
      serviceName: '服务单元002',
      serviceImportanceLevel: '2',
      ownRoom: '技术开发一室(地区B)',
      majorManager: '王涛',
      analysisImportance: 'Medium',
      analysisScores: '85',
      alarmException: '数据库超载',
      alarmTime: '2025-01-07 11:00:00',
      alarmCount: '3',
      releaseLabel: 'CS_LS77.03_service_unit_002_master_UAT_C88_20250106_02',
      releaseTime: '2025-01-05 18:00:00',
      releaseOperator: '赵强',
      traceId: 'f7g8h9i0j1k2',
      traceErrorDesc: '数据库连接失败',
      traceApi: '/api/v1/data-query',
      traceRtnCode: '500'
    }
  },
  {
    id: '65819c24-364a-4d3e-8404-dff7e6d19d63',
    detail: {
      deployType: 'Kubernetes',
      systemId: 'LQ99',
      systemName: '数据平台',
      systemImportanceLevel: 'A',
      subSystemId: 'LQ99.04',
      subSystemName: '分析服务模块',
      subSystemImportanceLevel: 'B',
      serviceUnit: 'service_unit_003',
      serviceName: '分析服务单元003',
      serviceImportanceLevel: '1',
      ownRoom: '技术研发二室(地区C)',
      majorManager: '李浩',
      analysisImportance: 'High',
      analysisScores: '95',
      alarmException: '服务中断',
      alarmTime: '2025-01-07 14:15:00',
      alarmCount: '2',
      releaseLabel: 'CS_LQ99.04_service_unit_003_master_UAT_C89_20250107_03',
      releaseTime: '2025-01-06 20:45:00',
      releaseOperator: '陈杰',
      traceId: 'm9n8o7p6q5r4',
      traceErrorDesc: '服务停止',
      traceApi: '/api/v1/processing',
      traceRtnCode: '503'
    }
  },
  {
    id: '1e12c880-76d6-407b-b5b7-825eedcfbbcd',
    detail: {
      deployType: 'Docker',
      systemId: 'LD99',
      systemName: '平台C',
      systemImportanceLevel: 'C',
      subSystemId: 'LD99.06',
      subSystemName: '服务平台',
      subSystemImportanceLevel: 'B',
      serviceUnit: 'service_unit_004',
      serviceName: '服务单元004',
      serviceImportanceLevel: '2',
      ownRoom: '产品开发四室(地区D)',
      majorManager: '郑磊',
      analysisImportance: 'Low',
      analysisScores: '80',
      alarmException: '系统崩溃',
      alarmTime: '2025-01-07 13:45:00',
      alarmCount: '3',
      releaseLabel: '',
      releaseTime: '2025-01-06 17:30:00',
      releaseOperator: '张颖',
      traceId: 's1t2u3v4w5x6',
      traceErrorDesc: '内部服务错误',
      traceApi: '/api/v1/system-log',
      traceRtnCode: '500'
    }
  },
  {
    id: '3951a70a-d0d8-46d9-a4bf-77da5c083121',
    detail: {
      deployType: 'Kubernetes',
      systemId: 'LS44',
      systemName: '平台D',
      systemImportanceLevel: 'B',
      subSystemId: 'LS44.02',
      subSystemName: '数据服务模块',
      subSystemImportanceLevel: 'C',
      serviceUnit: 'service_unit_005',
      serviceName: '服务单元005',
      serviceImportanceLevel: '3',
      ownRoom: '产品设计二室(地区E)',
      majorManager: '赵云',
      analysisImportance: 'Medium',
      analysisScores: '88',
      alarmException: '接口超时',
      alarmTime: '2025-01-07 09:50:00',
      alarmCount: '2',
      releaseLabel: 'CS_LS44.02_service_unit_005_master_UAT_C91_20250103_06',
      releaseTime: '2025-01-03 21:30:00',
      releaseOperator: '陈杰',
      traceId: 'y1z2a3b4c5d6',
      traceErrorDesc: '接口调用失败',
      traceApi: '/api/v1/fetch-data',
      traceRtnCode: '408'
    }
  }
];
const nodesData: Node[] = createServiceNodeArr(nodeDtoArr, otherInfo);

const edgesData = [
  {
    id: '3b55c046-4dd5-4dd7-8c6b-0554e53e1d93',
    sourceId: 'fbc92b72-6eb4-42d1-b183-5e941cb59eb0',
    targetId: '1e12c880-76d6-407b-b5b7-825eedcfbbcd',
    detail: null
  },
  {
    id: 'eb2ae38c-cccf-431c-ad12-8a7f815d4736',
    sourceId: '193bb6b6-f99c-48e8-aa40-3d026ffa433e',
    targetId: 'fbc92b72-6eb4-42d1-b183-5e941cb59eb0',
    detail: null
  },
  {
    id: '05ed9aee-750a-46d3-b539-266af7cfafb3',
    sourceId: '3951a70a-d0d8-46d9-a4bf-77da5c083121',
    targetId: '193bb6b6-f99c-48e8-aa40-3d026ffa433e',
    detail: null
  },
  {
    id: 'd90954d9-dcee-4587-9ea1-bb36de0e6453',
    sourceId: '65819c24-364a-4d3e-8404-dff7e6d19d63',
    targetId: '193bb6b6-f99c-48e8-aa40-3d026ffa433e',
    detail: null
  }
].map(({ sourceId, targetId }) => {
  return {
    source: sourceId,
    target: targetId
  };
});

const Chart03 = () => {
  return <DagChart containerId="container" nodesData={nodesData} edgesData={edgesData} />;
};

export default Chart03;
