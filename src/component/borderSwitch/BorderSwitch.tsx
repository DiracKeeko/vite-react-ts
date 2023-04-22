import React, { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

import './borderSwitch.less';

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
    <div className="border-switch">
      <div className="border-switch-group">
        <div className="border-switch-group-background">
          {tabItemList.map((item, index) => (
            <span
              key={item.key}
              className={`border-switch-item${
                activeIndex === index ? ' active-border-switch-item' : ''
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
