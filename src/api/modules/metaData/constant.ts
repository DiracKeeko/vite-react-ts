// dict
type TreeDataReq = {
  dictId: number;
}

type TableInfoItem = {
  connectId: number;
  tableName: string;
  syncTime: string;
};

type DbInfoItem = {
  [key: string]: number | string | boolean | TableInfoItem[];
  dictId: number;
  connectId: number;
  connectName: string;
  connectDesc: string;
  dbName: string;
  userName: string;
  password: string;
  hostName: string;
  port: string;
  type: number;
  creator: string;
  dept: string; // 部门id
  tableInfos: TableInfoItem[];
};

type TreeDataRes = {
  [key: string]: number | string | boolean | DbInfoItem[];
  id: number;
  dictName: string;
  dictDesc: string;
  isOpen: boolean;
  createTime: string;
  updateTime: string;
  deleted: boolean;
  dbInfoList: DbInfoItem[];
};

type DictListReq = {
  input?: string;
};

type MemberItem = {
  userId: string;
  userName: string;
};

type DictListRes = {
  dictId: number;
  dictName: string;
  dictDesc: string;
  isOpen: boolean;
  members: MemberItem[];
};

type AddDictInfoReq = {
  dictName: string;
  dictDesc: string;
  isOpen: boolean;
};

type DictInfoReq = {
  dictId: number;
  dictName: string;
  dictDesc: string;
  isOpen: boolean;
};

type DictMemberReq = {
  dictId: number;
  userId: string;
  userName: string;
};

type DeleteDictMemberReq = {
  dictId: number;
  userId: string;
};


export type {
  TreeDataReq,
  TableInfoItem,
  DbInfoItem,
  TreeDataRes,
  MemberItem,
  DictListReq,
  DictListRes,
  AddDictInfoReq,
  DictInfoReq,
  DictMemberReq,
  DeleteDictMemberReq
};
