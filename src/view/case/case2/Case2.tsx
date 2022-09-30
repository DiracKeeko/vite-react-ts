import React, { useState, useEffect } from 'react';
import jsFinancialTools from "@/moduleTest/jsFinancialTools";

type ContentInfo = {
  name: string;
  age: number;
  rank: number;
}

const Case2 = () => {
  const [contentInfo, setContentInfo] = useState<ContentInfo>({} as ContentInfo);

  useEffect(() => {
    setContentInfo({ age: 123, name: '456', rank: 10 });
  }, []);

  return (
    <>
      showCase2
      <div>
        {

        }
      </div>
    </>
  );
};

export default Case2;
