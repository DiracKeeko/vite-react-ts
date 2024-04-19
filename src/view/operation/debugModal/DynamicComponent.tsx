import React from 'react';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

type Props = {
  component: string;
  setPrevDisabled: (val: boolean) => void;
  setNextDisabled: (val: boolean) => void;
};
const DynamicComponent = ({ component, ...reset }: Props) => {
  function renderComponent(component: string) {
    switch (component) {
      case 'Step1':
        return <Step1 {...reset} />;
      case 'Step2':
        return <Step2 {...reset} />;
      case 'Step3':
        return <Step3 {...reset} />;
      case 'Step4':
        return <Step4 {...reset} />;
      case 'Step5':
        return <Step5 {...reset} />;
      default:
        return <div>component name: {component}</div>;
    }
  }
  return <div>{renderComponent(component)}</div>;
};

export default DynamicComponent;
