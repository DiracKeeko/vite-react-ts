import React, { useState, useEffect } from 'react';
// import jsFinancialTools = require('@/moduleTest/js-financial-tools.js'); // vite 不支持 cjs以及umd格式 的编译产物
import { formatToPercent } from '@/moduleTest/formatter'; // esm格式的编译产物没有问题

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
      {/* <div>{jsFinancialTools.formatter.formatToPercent(0.233578, '+', 3)}</div> */}
      <div>{formatToPercent(0.233578, '+', 3)}</div>
    </>
  );
};

export default Case2;
