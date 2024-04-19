import React from 'react';

import { StepProps } from './constant';

const Step1 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  setPrevDisabled && setPrevDisabled(true);
  setNextDisabled && setNextDisabled(false);
  return (
    <div>
      <h1>Step1</h1>
    </div>
  );
};

export default Step1;