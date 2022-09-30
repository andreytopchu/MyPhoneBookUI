import React, { Fragment, useEffect, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';
import { IGroup } from '../../customers/dto/Customers';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Modal, Spin, Table, Typography } from 'antd';
import { getAllGroups } from '../../groups/groupsAsyncActions';
import { generateGroupsColumns } from '../../groups/helpers/generateGroupsColumns';
import { getCategoriesEntities } from '../categoriesSelectors';
import { deleteCategory, getAllCategories } from '../categoriesAsyncActions';
import { generateCategoriesColumns } from '../helpers/generateCategoriesColumns';
import styled from 'styled-components';
import { GroupsDrawer } from '../../groups/components/GroupsDrawer';
import { CategoriesDrawer } from './CategoriesDrawer';

export const Categories = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [categoryForUpdate, setCategoryForUpdate] = useState<IGroup | null>(null);

  const allCategories = useAppSelector(getCategoriesEntities);
  const { isLoading } = useAppSelector((state) => state.CategoryReducer);

  const dispatch = useAppDispatch();

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить категорию?',
      maskClosable: true,
      content: <Typography.Text>Категория будет удалена навсегда</Typography.Text>,
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk: () => dispatch(deleteCategory(id)),
    });
  };

  const handleUpdateCategory = (category: IGroup) => {
    setCategoryForUpdate(category);
    setVisibleDrawer(true);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const columns = generateCategoriesColumns({ showDeleteModal, handleUpdateCategory });

  return (
    <Fragment>
      {isLoading && <SpinStyled size={'large'} />}
      <ComponentHeader title={'Категории'} callback={() => setVisibleDrawer(true)} />
      <CategoriesDrawer
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        categoryForUpdate={categoryForUpdate}
        setCategoryForUpdate={setCategoryForUpdate}
      />
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={allCategories}
          pagination={{
            pageSize: 10,
          }}
        />
      </TableWrapper>
    </Fragment>
  );
};

const TableWrapper = styled.div`
  padding: 50px;
`;
const SpinStyled = styled(Spin)`
  position: absolute;
  right: 50%;
  top: 25px;
`;
