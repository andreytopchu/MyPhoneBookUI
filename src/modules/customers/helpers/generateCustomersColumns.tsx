import { ColumnsType, ColumnType } from 'antd/es/table';
import { ICustomer } from '../dto/Customers';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';

interface IHandlers {
  showDeleteModal: (id: string) => void;
  handleUpdateCustomer: (customer: ICustomer) => void;
  setCustomer: Dispatch<SetStateAction<ICustomer | null>>;
}

export const generateCustomersColumns = (handlers: IHandlers): ColumnsType<ICustomer> => {
  const idColumn: ColumnType<ICustomer> = {
    title: 'ID абонента',
    dataIndex: 'id',
    width: '20%',
    ellipsis: true,
  };

  const nameColumn: ColumnType<ICustomer> = {
    title: 'Имя абонента',
    width: '40%',
    ellipsis: true,
    render: (_, entity) => (
      <Typography.Link onClick={() => handlers.setCustomer(entity)}>
        {entity.firstName} {entity.middleName} {entity.lastName}
      </Typography.Link>
    ),
  };

  const groupsColumn: ColumnType<ICustomer> = {
    title: 'Группы абонента',
    dataIndex: 'groups',
    width: '20%',
    ellipsis: true,
    render: (_, entity) => (
      <div>
        {entity.groups.map((group, index) => (
          <Tag key={index}>{group.name}</Tag>
        ))}
      </div>
    ),
  };

  const actionsColumn: ColumnType<ICustomer> = {
    title: 'Действия',
    key: 'actions',
    width: '20%',
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    render: (_, entity) => (
      <ActionsWrapper>
        <EditOutlinedStyled onClick={() => handlers.handleUpdateCustomer(entity)} />
        <DeleteOutlinedStyled onClick={() => handlers.showDeleteModal(entity.id)} />
      </ActionsWrapper>
    ),
  };

  return [idColumn, nameColumn, groupsColumn, actionsColumn];
};

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const EditOutlinedStyled = styled(EditOutlined)`
  cursor: pointer;
  color: blue;
`;
const DeleteOutlinedStyled = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;
