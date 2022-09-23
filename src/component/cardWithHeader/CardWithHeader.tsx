import React from 'react';

import CardWithSlot from '@/component/cardWithSlot/CardWithSlot';

import './cardWithHeader.less';

type Props = {
  cardTitle: string;
  topRight?: React.ReactNode;
  contentContainer?: React.ReactNode;
  footerContainer?: React.ReactNode;
};

const CardWithHeader = ({ cardTitle, topRight, contentContainer, footerContainer }: Props) => {
  return (
    <CardWithSlot
      topLeft={
        <div className="title-area">
          <div className="vertical-bar"></div>
          <span>{cardTitle}</span>
        </div>
      }
      topRight={topRight}
      contentContainer={contentContainer}
      footerContainer={footerContainer}
    ></CardWithSlot>
  );
};

export default CardWithHeader;
