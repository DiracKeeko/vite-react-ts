import React from 'react';

import PercentageDegreeBar from '@/component/percentageDegreeBar/PercentageDegreeBar';

import Wrapper from './Wrapper';

const VisualPresentation = () => {
  const numberArr = [0.2033, 0.4756, 0.7713, 0.8559];
  return (
    <>
      <Wrapper></Wrapper>
      <div>
        {numberArr.map((item, index) => (
          <div>
            <PercentageDegreeBar value={item} key={index + item}></PercentageDegreeBar>
            <span>{item.toString()}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default VisualPresentation;
