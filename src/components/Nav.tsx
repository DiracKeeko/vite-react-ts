
import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MenuInfo } from '../../node_modules/rc-menu/lib/interface';

const Nav: React.FC = () => {
  const [current, changeCurrent] = useState<string>('page1');
  const navigate = useNavigate();

  const handleClick = (e: MenuInfo) => {
    const key = String(e.key);
    navigate(key);
    changeCurrent(key);
  };

  return (
    <Menu onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="page1" icon={<MailOutlined />}>
        Navigation 1
      </Menu.Item>
      <Menu.Item key="page2" icon={<AppstoreOutlined />}>
        Navigation 2
      </Menu.Item>
      <Menu.Item key="page3" icon={<AppstoreOutlined />}>
        Navigation 3
      </Menu.Item>
      <Menu.Item key="page4" icon={<AppstoreOutlined />}>
        Navigation 4
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
