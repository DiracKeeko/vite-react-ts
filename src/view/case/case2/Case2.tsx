import React, { useEffect, useState } from 'react';
// import jsFinancialTools from 'jsFinancialTools'; // vite 不支持 cjs以及umd格式 的编译产物
import { formatToPercent } from 'js-financial-tools/modules/formatter'; // esm格式的编译产物没有问题
import { isRealNumber } from 'js-financial-tools/modules/number';

type ContentInfo = {
  name: string;
  age: number;
  rank: number;
};

const Case2 = () => {
  const [contentInfo, setContentInfo] = useState<ContentInfo>({} as ContentInfo);

  useEffect(() => {
    setContentInfo({ age: 123, name: '456', rank: 10 });
  }, []);

  return (
    <>
      showCase2
      <div>{formatToPercent(0.233578, '+', 3)}</div>
      <div>isRealNumber: {String(isRealNumber('333'))}</div>
    </>
  );
};

export default Case2;
