type TypeEnum = 'core' | 'base' | 'trace';

type Reassign<T> = {
  [K in keyof T]: T[K];
};

type ColorMap = Reassign<Record<TypeEnum, string> & { [key: string]: string }>;

type SizeMap = Reassign<Record<TypeEnum, [number, number]> & { [key: string]: [number, number] }>;

const TYPE_COLOR_MAP: ColorMap = {
  core: '#6b705c', // 核心 蓝铁
  base: '#11bb55', // 基础 绿
  trace: '#ffaa64' // 追踪 橙
};

const TYPE_SIZE_MAP: SizeMap = {
  core: [220, 130],
  base: [220, 130],
  trace: [220, 130]
};

const COLOR_MAP: { [key: string]: string } = {
  warn: '#EC4234',
  active: '#f6c523',
  innerRoom: '#2d2686',
  outerRoom: '#FFD700',
  isProduction: '#1E90FF',
  isSelected: '#f57384',
  edge: '#8b9baf'
};

type CommonNodeDetail = {
  deployType: string;
  systemId: string;
  systemName: string;
  systemImportanceLevel: string;
  subSystemId: string;
  subSystemName: string;
  subSystemImportanceLevel: string;
  serviceUnit: string; // 一定有
  serviceName: string;
  serviceImportanceLevel: string;
  ownRoom: string;
  majorManager: string;
  analysisImportance: string;
  analysisScores: string;
  alarmException: string;
  alarmTime: string;
  alarmCount: string;
  traceId: string;
  traceRtnCode: string;
  traceErrorDesc: string;
  traceApi: string;
};

type ServiceNodeDTO = {
  id: string; // 一定有
  detail: CommonNodeDetail & {
    releaseLabel: string;
    releaseTime: string;
    releaseOperator: string;
  };
};

type EdgeDTO = {
  id: string;
  sourceId: string;
  targetId: string;
  detail?: Record<string, string>;
};

type OtherInfo = {
  traceId: string;
  room: string;
  coreServiceUnit: string;
  coreInterfaceCode: string;
};

type Node = {
  id: string;
  data: CommonNodeDetail & {
    releaseLabel: string;
    releaseTime: string;
    releaseOperator: string;
  } & {
    nodeType: TypeEnum;
    isInnerRoom: boolean;
    functionCode?: string;
    interfacePath?: string;
    interfaceDesc?: string;
  };
};

type Edge = {
  source: string;
  target: string;
};

const createServiceNodeArr = (nodeArr: ServiceNodeDTO[], otherInfo: OtherInfo): Node[] => {
  return nodeArr.map(({ id, detail }) => {
    let nodeType: TypeEnum = 'base';
    if (otherInfo.traceId === detail.traceId) {
      nodeType = 'trace';
    }
    if (otherInfo.coreServiceUnit === detail.serviceUnit) {
      nodeType = 'core';
    }
    const isInnerRoom = otherInfo.room === detail.ownRoom;
    const res = {
      id,
      data: {
        ...detail,
        nodeType,
        isInnerRoom
      }
    };
    return res;
  });
};

const createEdgeArr = (edgeArr: EdgeDTO[]): Edge[] => {
  return edgeArr.map(({ sourceId, targetId }) => {
    return {
      source: sourceId,
      target: targetId
    };
  });
};

export type { Edge, Node, OtherInfo, ServiceNodeDTO };
export { COLOR_MAP, createEdgeArr, createServiceNodeArr, TYPE_COLOR_MAP, TYPE_SIZE_MAP };
