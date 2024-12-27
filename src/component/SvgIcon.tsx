import React from 'react';

import { useDynamicSvgImport } from '@/hook/useDynamicSvgImport';

interface IProps {
  iconName: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

function SvgIcon(props: IProps) {
  const { iconName, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && <div className="h-8 w-8"></div>}
      {SvgIcon && <SvgIcon {...svgProp} />}
    </>
  );
}

export default SvgIcon;
