import React, { useState } from 'react';
import { dictInfoArr, dictInfoKeyToNameMap } from './constant';

import { ContentInfo } from './constant';

const Test = () => {
  const [contentInfo, setContentInfo] 
    = useState<ContentInfo>({} as ContentInfo);

  setContentInfo({ dictId: 123, dictName: "456"});
  
  return (
    <>
      {dictInfoArr.map((keyItem) => {
        return (
          <div key={keyItem}>
            {contentInfo[keyItem]}
          </div>
        )
      })}
    </>
  );
};

// const Test = () => {
//   return (
//     <>
//       { dictInfoArr.map(keyItem => {
//         return (
//           <div key={keyItem}>
//             {dictInfoKeyToNameMap[keyItem]}
//           </div>
//         )
//       })}
//     </>
//   )
// };

export default Test;
