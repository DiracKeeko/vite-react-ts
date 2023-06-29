import React from 'react';
import './inputWrapper.less';

type Props = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

const InputWrapper = ({ label, required = false, children }: Props) => {
  return (
    <div className="input-warpper d-flex">
      <div className="label mr-2 text-dark-1 fs-sm">
        {required && <span className="text-danger">*</span>}
        {label}
      </div>
      <div className="input-container">{children}</div>
    </div>
  );
};

export default InputWrapper;
