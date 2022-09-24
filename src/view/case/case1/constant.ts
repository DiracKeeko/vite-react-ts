const dictInfoArr = ['dictId', 'dictName'];

const dictInfoKeyToNameMap: { [key: string]: string } = {
  dictId: '字典Id',
  dictName: '字典名称'
};

type ContentInfo = {
  [key: string]: string | number;
  dictId: number;
  dictName: string;
}

export type { ContentInfo };

export { dictInfoArr, dictInfoKeyToNameMap };
