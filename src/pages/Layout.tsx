import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuComponent } from '../common/components/Menu';
import { Table } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  return (
    <Container>
      <MenuButton onClick={() => setActiveMenu(!activeMenu)} activeMenu={activeMenu} />
      <MenuContainer activeMenu={activeMenu}>
        <MenuComponent />
      </MenuContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const MenuContainer = styled.div<{ activeMenu: boolean }>`
  max-width: 250px;
  width: 100%;
  transition: all 0.5s;
  z-index: 1;
  @media (max-width: 900px) {
    position: absolute;
    left: ${({ activeMenu }) => (activeMenu ? '0' : '-250px')};
  }
`;
const MenuButton = styled(MenuOutlined)<{ activeMenu: boolean }>`
  font-size: 24px;
  position: absolute;
  display: none;
  z-index: 3;
  color: ${({ activeMenu }) => (activeMenu ? 'white' : 'black')};
  @media (max-width: 900px) {
    display: block;
    top: 15px;
    left: 15px;
  }
`;
const OutletContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #f0f2f5;
`;
