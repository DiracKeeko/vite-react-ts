import React from 'react';

import { StepProps } from './constant';

const Step5 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  setPrevDisabled && setPrevDisabled(false);
  setNextDisabled && setNextDisabled(true);
  return (
    <div>
      <h1>Step5</h1>
    </div>
  );
};

export default Step5;