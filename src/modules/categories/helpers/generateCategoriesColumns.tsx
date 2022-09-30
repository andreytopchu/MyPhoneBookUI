import { ColumnsType, ColumnType } from 'antd/es/table';
import { IGroup } from '../../customers/dto/Customers';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface IHandlers {
  showDeleteModal: (id: string) => void;
  handleUpdateCategory: (group: IGroup) => void;
}

export const generateCategoriesColumns = (handlers: IHandlers): ColumnsType<IGroup> => {
  const idColumn: ColumnType<IGroup> = {
    title: 'ID группы',
    dataIndex: 'id',
    width: '20%',
    ellipsis: true,
  };

  const nameColumn: ColumnType<IGroup> = {
    title: 'Название категории',
    dataIndex: 'name',
    width: '60%',
    ellipsis: true,
  };

  const actionsColumn: ColumnType<IGroup> = {
    title: 'Действия',
    key: 'actions',
    width: '20%',
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    render: (_, entity) => (
      <ActionsWrapper>
        <EditOutlinedStyled onClick={() => handlers.handleUpdateCategory(entity)} />
        <DeleteOutlinedStyled onClick={() => handlers.showDeleteModal(entity.id)} />
      </ActionsWrapper>
    ),
  };

  return [idColumn, nameColumn, actionsColumn];
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
