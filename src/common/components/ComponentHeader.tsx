import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';

const { Title } = Typography;

interface IProps {
  title: string;
  callback: () => void;
}

export const ComponentHeader: FC<IProps> = ({ title, callback }) => {
  return (
    <HeaderWrapper>
      <HeaderTitle level={2}>{title}</HeaderTitle>
      <Button type={'primary'} size={'large'} onClick={callback}>
        Создать
      </Button>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  padding: 20px 55px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled(Title)`
  margin-bottom: 0 !important;
`;
