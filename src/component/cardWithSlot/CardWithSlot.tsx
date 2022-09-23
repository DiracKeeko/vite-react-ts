import React from 'react';

import './cardWithSlot.less';

type Props = {
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  contentContainer?: React.ReactNode;
  footerContainer?: React.ReactNode;
};

const CardWithSlot = ({ topLeft, topRight, contentContainer, footerContainer }: Props) => {
  return (
    <div className="card-with-slot">
      <div className="card-header">
        <div className="card-header-slot-container">{topLeft}</div>
        <div className="card-header-slot-container">{topRight}</div>
      </div>

      <div className="cut-line"></div>

      <div className="card-content">{contentContainer}</div>

      <div className="card-footer">{footerContainer}</div>
    </div>
  );
};

export default CardWithSlot;
