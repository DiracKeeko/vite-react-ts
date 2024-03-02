import React from 'react';
import { formatToPercent } from 'js-financial-tools/modules/formatter';

import './percentageDegreeBar.less';

// const range = [0, 0.3, 0.7, 1];

type PercentageDegreeBarProps = {
  value: number;
};

const PercentageDegreeBar = ({ value }: PercentageDegreeBarProps) => {
  if (value > 1) {
    throw new Error('value out of range');
  }
  const rangeClass = () => {
    if (value < 0.3) {
      return `range--low`;
    }
    if (value < 0.7) {
      return `range--mid`;
    }
    return `range--high`;
  };

  return (
    <div className={`slider-range-chart range ${rangeClass()}`}>
      {value && <div className="range-bar" style={{ width: formatToPercent(value) }}></div>}
    </div>
  );
};

export default PercentageDegreeBar;
