import React from 'react';
import SvgIcon from '@/component/SvgIcon';
import './case6.less';

const Case6 = () => {
  return (
    <>
      hello, svg!
      <SvgIcon
        iconName="icon_accNav"
        svgProp={{ width: 100, height: 100, fill: '#61dafb' }}
        wrapperStyle={'icon-class'}
      />
    </>
  );
};

export default Case6;
