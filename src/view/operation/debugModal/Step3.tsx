import React from 'react';

import { StepProps } from './constant';

const Step3 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  setPrevDisabled && setPrevDisabled(false);
  setNextDisabled && setNextDisabled(false);
  return (
    <div>
      <h1>Step3</h1>
    </div>
  );
};

export default Step3;