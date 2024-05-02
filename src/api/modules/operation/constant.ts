type OperationRecordReq = {
  start: string; // 起始日期
  end: string; // 终止日期
  filter?: boolean;
  states?: string[]; // 状态
  systemIds?: string[];
  serviceLabels?: string[];
  action?: string[];
  perspective?: string;
};

type SelectorValueType = {
  label: string;
  value: string;
};

const operationBaseUrl = '/operation';

export type { OperationRecordReq, SelectorValueType };
export { operationBaseUrl };
