import React from 'react';

import SvgIcon from '@/component/SvgIcon';
// import { ReactComponent as IconAccNav } from '@/icon/icon_accNav.svg'; // vite-plugin-svgr@2.4.0 语法
import iconAcc from '@/icon/icon_accNav.svg'; // 静态资源引入 + 放入<img />使用, 不推荐
import IconAccNav from '@/icon/icon_accNav.svg?react'; // vite-plugin-svgr@4.3.0 语法

const Case6 = () => {
  return (
    <>
      hello, svg!
      {/* 
        遇到一个问题 -> 使用vite-plugin-svgr 导入的svg标签 改变width和height对图标本身不生效 
        
        这不是vite-plugin-svgr的问题，是svg图标有问题，需要给 svg 设置 viewBox属性 才能设置尺寸

        fill 属性没有效果  在vite-plugin-svgr@2.4.0 以及 @4.3.0中均没有效果
      */}
      <SvgIcon iconName="icon_accNav" svgProp={{ width: 50, height: 50, fill: '#61dafb' }} />
      {/* ↓ 这是原始的 vite-plugin-svgr 的使用方式 */}
      <IconAccNav />

      {/* ↓ 这是最原始的 svg图标 的使用方式，不推荐 */}
      <img src={iconAcc} alt="Icon" />
    </>
  );
};

export default Case6;
