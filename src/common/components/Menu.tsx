import React from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Абоненты',
    key: 'customers',
  },
  {
    label: 'Группы',
    key: 'groups',
  },
  {
    label: 'Категории',
    key: 'categories',
  },
];

export const MenuComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (key: string) => {
    document.title = key;
    navigate(key);
  };

  return (
    <Menu
      items={items}
      mode={'inline'}
      onClick={(e) => handleNavigate(e.key)}
      theme={'dark'}
      defaultSelectedKeys={[location.pathname.slice(1)]}
      style={{
        fontSize: '18px',
        paddingTop: '60px',
        width: '100%',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        height: '100vh',
      }}
    />
  );
};
