import React, { useEffect, useState } from 'react';

import { ApiInfoItem, StepProps } from './constant';

const Step1 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  const [data, setData] = useState<ApiInfoItem[]>([]);

  useEffect(() => {
    setPrevDisabled && setPrevDisabled(true);
    setNextDisabled && setNextDisabled(true);
    if (data) {
      const registeredNumber: number = data.filter((item) => item.registered).length;
      if (registeredNumber > 0) {
        setNextDisabled && setNextDisabled(false);
      } else {
        setNextDisabled && setNextDisabled(true);
      }
    }
  }, [data]);
  
  return (
    <div>
      <h1>Step1</h1>
    </div>
  );
};

export default Step1;
