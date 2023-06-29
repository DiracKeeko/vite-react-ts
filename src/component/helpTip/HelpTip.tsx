import React, { Children } from 'react';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

interface HelpTipProps {
  placement?: TooltipPlacement;
  content: string;
  color?: string;
  children: React.ReactNode;
}

const HelpTip: React.FC<HelpTipProps> = ({ placement = 'top', content, children }) => {
  const haveLabel = content.includes('###');
  const multiRowTip = content.includes('#br#');

  const getLabel = () => {
    if (haveLabel) {
      return content.split('###')[0];
    }
    return '';
  };

  const getTip = () => {
    let tip = '';
    if (haveLabel) {
      [, tip] = content.split('###');
    } else {
      tip = content;
    }
    if (multiRowTip) {
      return tip.split('#br#');
    }
    return tip;
  };

  const label = getLabel();
  const tip = getTip();

  return (
    <span>
      {multiRowTip ? (
        <Tooltip
          title={
            <div>
              {(tip as string[]).map((item, index) => (
                <span key={index}>
                  <span>{item}</span> <br />
                </span>
              ))}
            </div>
          }
          placement={placement}
        >
          {children}
        </Tooltip>
      ) : (
        <Tooltip title={tip} placement={placement}>
          {children}
        </Tooltip>
      )}

      <span style={{ marginRight: '8px' }}>{label}</span>
    </span>
  );
};

export default HelpTip;
