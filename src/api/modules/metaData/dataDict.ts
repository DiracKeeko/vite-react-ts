import { cusGet, cusPost } from '@/api/cusAxios';
import {
  TreeDataReq,
  TreeDataRes,
  DictListReq,
  DictListRes,
  AddDictInfoReq,
  DictInfoReq,
  DictMemberReq,
  DeleteDictMemberReq
} from './constant';
const moduleBaseUrl: string = '/dict';

export function getTreeData(req: TreeDataReq): Promise<TreeDataRes> {
  return cusGet<TreeDataRes>(`${moduleBaseUrl}/tree/list`, req);
}

export function getDictList(req: DictListReq): Promise<DictListRes[]> {
  return cusGet<DictListRes[]>(`${moduleBaseUrl}/list`, req);
}

export function addDictInfo(req: AddDictInfoReq): Promise<boolean> {
  return cusPost<boolean>(`${moduleBaseUrl}/add`, req);
}

export function editDictInfo(req: DictInfoReq): Promise<boolean> {
  return cusPost<boolean>(`${moduleBaseUrl}/update`, req);
}

export function editDictMember(req: DictMemberReq): Promise<boolean> {
  return cusGet<boolean>(`${moduleBaseUrl}/member/add`, req);
}

export function deleteDictMember(req: DeleteDictMemberReq): Promise<boolean> {
  return cusGet<boolean>(`${moduleBaseUrl}/member/delete`, req);
}
