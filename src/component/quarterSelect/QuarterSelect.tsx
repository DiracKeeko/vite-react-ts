import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './quarterSelect.less';

type Props = {
  quarterIndex: number;
  quarterArr: string[]; // ['2020Q1', '2020Q2', '2020Q3']
  onChange: (index: number) => void;
};

type QuarterItem = 'Q1' | 'Q2' | 'Q3' | 'Q4';

type QuarterObj = {
  [key: string]: QuarterItem[];
};

const QuarterSelect = ({ quarterIndex = 1, quarterArr = [], onChange }: Props) => {
  const [qIndex, setQIndex] = useState<number>(quarterIndex);
  const [quarterObj, setQuarterObj] = useState<QuarterObj>({});
  const [yearStrArr, setYearStrArr] = useState<string[]>([]); // ["2020", "2021", "2022"]
  const [isContainerShow, setIsContainerShow] = useState<boolean>(false);
  const [selectYear, setSelectYear] = useState<string>(''); // "2022"
  const [selectQuarter, setSelectQuarter] = useState<string>(''); // "Q1"

  const quarterSelectRef = useRef(null);

  const previousDisabled = useMemo(() => qIndex === quarterArr.length - 1, [qIndex, quarterArr]);
  const nextDisabled = useMemo(() => qIndex === 0, [qIndex]);

  useEffect(() => {
    const yearStrArr: string[] = []; // ["2021", "2020", "2019", ...]
    const quarterObj: QuarterObj = {}; // { "2021": ["Q1"], "2020": ["Q1", "Q2", "Q3", "Q4"] }

    quarterArr.forEach((item) => {
      const year = item.slice(0, 4);
      const quarter: QuarterItem = item.slice(4) as QuarterItem;
      if (!yearStrArr.includes(year)) {
        yearStrArr.push(year);
      }
      quarterObj[year] = quarterObj[year] || [];
      quarterObj[year].unshift(quarter);
    });

    setQuarterObj(quarterObj);
    setYearStrArr(yearStrArr);
    setView();
  }, [quarterArr]);

  useEffect(() => {
    isContainerShow && setView();
  }, [isContainerShow]);
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const setView = (indexVal: number = qIndex) => {
    if (!quarterArr[indexVal]) {
      return;
    }
    const year = quarterArr[indexVal].slice(0, 4);
    const quarter = quarterArr[indexVal].slice(4);
    setSelectYear(year);
    setSelectQuarter(quarter);
  };

  const handlePrevious = () => {
    if (previousDisabled) {
      return;
    }
    setIsContainerShow(false);
    const newQIndex = qIndex + 1;
    setQIndex(newQIndex);
    onChange(newQIndex);
    setView(newQIndex);
  };

  const handleNext = () => {
    if (nextDisabled) {
      return;
    }
    setIsContainerShow(false);
    const newQIndex = qIndex - 1;
    setQIndex(newQIndex);
    onChange(newQIndex);
    setView(newQIndex);
  };

  const handleClickQuarterStr = () => {
    setIsContainerShow(!isContainerShow);
  };

  const handleYearChange = (yearStr: string) => {
    if (yearStr === selectYear) {
      return;
    }
    setSelectYear(yearStr);
    setSelectQuarter('');
  };

  const handleQuarterChange = (quarterStr: string) => {
    const qIndex = quarterArr.indexOf(`${selectYear}${quarterStr}`);
    setQIndex(qIndex);
    onChange(qIndex);
    setView(qIndex);
    setIsContainerShow(false);
  };

  const handleClickOutside = (event) => {
    if (quarterSelectRef.current && !quarterSelectRef.current.contains(event.target)) {
      setIsContainerShow(false);
      setView();
    }
  };

  return (
    <div ref={quarterSelectRef} className="quarter-select">
      <div className="quarter-select-menu">
        <div
          className={`quarter-select-right-btn ${previousDisabled ? 'disabled' : ''}`}
          onClick={handlePrevious}
        >
          <LeftOutlined />
        </div>
        <div className="quarter-select-center-btn" onClick={handleClickQuarterStr}>
          <span>{quarterArr[qIndex]}</span>
        </div>
        <div
          className={`quarter-select-right-btn ${nextDisabled ? 'disabled' : ''}`}
          onClick={handleNext}
        >
          <RightOutlined />
        </div>
      </div>
      <div className={`quarter-select-expand-container ${isContainerShow ? '' : 'container-hide'}`}>
        <div className="quarter-select-year">
          {yearStrArr.map((year) => {
            return (
              <label key={year} className={selectYear === year ? 'active-selected-class' : ''}>
                <input
                  type="radio"
                  value={year}
                  checked={selectYear === year}
                  onChange={(e) => handleYearChange(e.target.value)}
                />
                <span>{year}</span>
                <RightOutlined />
              </label>
            );
          })}
        </div>
        <div className="quarter-select-quarter">
          {quarterObj[selectYear]?.map((quarter) => {
            return (
              <label
                key={quarter}
                className={selectQuarter === quarter ? 'active-selected-class' : ''}
              >
                <input
                  type="radio"
                  value={quarter}
                  checked={selectQuarter === quarter}
                  onChange={(e) => handleQuarterChange(e.target.value)}
                />
                <span>{quarter}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuarterSelect;
