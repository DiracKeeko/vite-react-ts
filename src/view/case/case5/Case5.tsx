import React from 'react';

import CardWithSlot from '@/component/cardWithSlot/CardWithSlot';

import './case5.less';

const Case5 = () => {
  return (
    <CardWithSlot
      topLeft="左上角"
      topRight="右上角"
      contentContainer={<div className="container-self">内容区</div>}
    ></CardWithSlot>
  );
};

export default Case5;
