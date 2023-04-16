import React, { useState, useMemo } from 'react';
import { throttle } from 'lodash';

import './buttonSwitch.less';

interface Props {
  tabKeyList: string[];
  tabLabelList: string[];
  curSelectKey: string;
  onTabChange: (key: string) => void;
}

const ButtonSwitch: React.FC<Props> = ({
  tabKeyList = [],
  tabLabelList = [],
  curSelectKey = '',
  onTabChange
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = useMemo(
    () =>
      throttle((index: number) => {
        setActiveIndex(index);
        onTabChange(tabKeyList[index]);
      }, 500),
    [tabKeyList, onTabChange]
  );

  return (
    <div className="button-switch">
      <div className="button-switch-group">
        <div className="button-switch-group-background">
          {tabKeyList.map((key, index) => (
            <span
              key={key}
              className={`button-switch-item${
                activeIndex === index ? ' active-button-switch-item' : ''
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tabLabelList[index]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonSwitch;
