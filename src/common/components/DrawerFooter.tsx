import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface IDrawerFooter {
  cancelCallback: () => void;
  saveCallback: () => void;
}

export const DrawerFooter = ({ cancelCallback, saveCallback }: IDrawerFooter): JSX.Element => (
  <DrawerFooterWrapper>
    <Button onClick={() => cancelCallback()}>Отмена</Button>
    <Button onClick={() => saveCallback()} type={'primary'}>
      Сохранить
    </Button>
  </DrawerFooterWrapper>
);

const DrawerFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
