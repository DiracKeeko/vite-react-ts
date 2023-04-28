import React from 'react';

import SvgIcon from '@/component/SvgIcon';

import './NoContent.less';

type NoContentProps = {
  size?: 'lg' | 'md' | 'sm';
};

type SvgIconProp = {
  width: string;
  height: string;
};

function getPropsBySize(size: string): SvgIconProp {
  switch (size) {
    case 'lg':
      return { width: '25rem', height: '25rem' };
    case 'md':
      return { width: '18rem', height: '18rem' };
    case 'sm':
      return { width: '12rem', height: '12rem' };
    default:
      return { width: '25rem', height: '25rem' };
  }
}

const NoContent: React.FC<NoContentProps> = ({ size = 'lg' }) => {
  const imgClass = `no-content-img--${size}`;
  return (
    <div className="no-content-container">
      <div className={imgClass}>
        <SvgIcon iconName="img_noContent" svgProp={getPropsBySize(size)} />
      </div>
    </div>
  );
};

export default NoContent;
