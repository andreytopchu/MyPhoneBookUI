import React, { Fragment, useEffect, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';
import { GroupsDrawer } from './GroupsDrawer';
import { IGroup } from '../../customers/dto/Customers';
import { deleteGroup, getAllGroups } from '../groupsAsyncActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { generateGroupsColumns } from '../helpers/generateGroupsColumns';
import { Modal, Spin, Table, Typography } from 'antd';
import styled from 'styled-components';
import { getGroupsEntities } from '../groupsSelectors';

export const Groups = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [groupForUpdate, setGroupForUpdate] = useState<IGroup | null>(null);

  const allGroups = useAppSelector(getGroupsEntities);
  const { isLoading } = useAppSelector((state) => state.GroupReducer);

  const dispatch = useAppDispatch();

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить группу?',
      maskClosable: true,
      content: <Typography.Text>Группа будет удалена навсегда</Typography.Text>,
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk: () => dispatch(deleteGroup(id)),
    });
  };

  const handleUpdateGroup = (group: IGroup) => {
    setGroupForUpdate(group);
    setVisibleDrawer(true);
  };

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const columns = generateGroupsColumns({ showDeleteModal, handleUpdateGroup });

  return (
    <Fragment>
      {isLoading && <SpinStyled size={'large'} />}
      <ComponentHeader title={'Группы'} callback={() => setVisibleDrawer(true)} />
      <GroupsDrawer
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        groupForUpdate={groupForUpdate}
        setGroupForUpdate={setGroupForUpdate}
      />
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={allGroups}
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
