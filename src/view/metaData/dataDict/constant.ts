import { DictListRes } from '@/api/modules/metaData/constant';

type DictAddType = {
  isVisible: boolean;
};

type DictFormType = {
  dictName: string;
  dictDesc: string;
  isOpen: boolean;
}

type DictListType = DictListRes & {
  isDictMember: boolean;
};

type DictItemType = DictListRes & {
  isVisible: boolean;
};

export type { DictAddType, DictFormType, DictListType, DictItemType };