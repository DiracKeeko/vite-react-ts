import React, { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

import './buttonSwitch.less';

type TabItem = {
  key: string;
  label: string;
};

type Props = {
  tabItemList: TabItem[];
  curSelectKey: string;
  onTabChange: (tabItem: TabItem, index: number) => void;
}

const ButtonSwitch: React.FC<Props> = ({
  tabItemList = [],
  curSelectKey = '',
  onTabChange
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = tabItemList.findIndex((item) => item.key === curSelectKey);
    setActiveIndex(index);
  }, [curSelectKey, tabItemList]);

  const handleTabChange = useMemo(
    () =>
      throttle((index: number) => {
        setActiveIndex(index);
        onTabChange(tabItemList[index], index);
      }, 500),
    [tabItemList, onTabChange]
  );

  return (
    <div className="button-switch">
      <div className="button-switch-group">
        <div className="button-switch-group-background">
          {tabItemList.map((item, index) => (
            <span
              key={item.key}
              className={`button-switch-item${
                activeIndex === index ? ' active-button-switch-item' : ''
              }`}
              onClick={() => handleTabChange(index)}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonSwitch;
