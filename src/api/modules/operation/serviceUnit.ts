import { cusGet } from '@/api/cusAxios';

import { operationBaseUrl, SelectorValueType } from './constant';

const moduleBaseUrl = `${operationBaseUrl}/serviceUnit`;

export function getSystem(): Promise<SelectorValueType[]> {
  return cusGet<SelectorValueType[]>(`${moduleBaseUrl}/room`);
}

export function batchGetServiceUnit(systemIds: string): Promise<SelectorValueType[]> {
  return cusGet<SelectorValueType[]>(`${moduleBaseUrl}/batch`, {
    systemIds: systemIds
  });
}
