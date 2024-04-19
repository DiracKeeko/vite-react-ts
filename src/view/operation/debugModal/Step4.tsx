import React from 'react';

import { StepProps } from './constant';

const Step4 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  setPrevDisabled && setPrevDisabled(false);
  setNextDisabled && setNextDisabled(false);
  return (
    <div>
      <h1>Step4</h1>
    </div>
  );
};

export default Step4;