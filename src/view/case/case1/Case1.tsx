import React, { useState, useEffect } from 'react';
import { dictInfoArr, dictInfoKeyToNameMap } from './constant';

import { ContentInfo } from './constant';

const Case1 = () => {
  const [contentInfo, setContentInfo] = useState<ContentInfo>({} as ContentInfo);

  useEffect(() => {
    setContentInfo({ dictId: 123, dictName: '456' });
  }, []);

  return (
    <>
      showCase1
      <div>
        {dictInfoArr.map((keyItem) => {
          return (
            <div key={keyItem}>
              <span className="first-case">{String(dictInfoKeyToNameMap[keyItem])}:</span>
              <span className="second-case">{String(contentInfo[keyItem])}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Case1;
