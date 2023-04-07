import SvgIcon from '@/component/SvgIcon';
import './case6.less';

import { ReactComponent as IconAccNav } from '@/icon/icon_accNav.svg';

const Case6 = () => {
  return (
    <>
      hello, svg!
      {/* 
        遇到一个问题 -> 使用vite-plugin-svgr 导入的svg标签 改变width和height对图标本身不生效 
        
        这不是vite-plugin-svgr的问题，是svg图标有问题，需要给 svg 设置 viewBox属性 才能设置尺寸
      */}
      <SvgIcon
        iconName="icon_accNav"
        svgProp={{ width: 50, height: 50, fill: '#61dafb' }}
        wrapperStyle={'icon-class'}
      />
      {/* ↓ 这是原始的 vite-plugin-svgr 的使用方式 */}
      <IconAccNav/>
    </>
  );
};

export default Case6;
