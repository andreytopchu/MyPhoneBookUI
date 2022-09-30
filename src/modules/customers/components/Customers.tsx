import React, { Fragment, useEffect, useState } from 'react';
import { ComponentHeader } from '../../../common/components/ComponentHeader';
import { CustomersDrawer } from './CustomersDrawer';
import { ICustomer } from '../dto/Customers';
import { generateCustomersColumns } from '../helpers/generateCustomersColumns';
import { Modal, Spin, Table, Typography } from 'antd';
import { deleteCustomer, getAllCustomers } from '../customersAsyncActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getCustomersEntities } from '../customersSelectors';
import styled from 'styled-components';
import { CustomerDescription } from './CustomerDescription';

export const Customers = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [customerForUpdate, setCustomerForUpdate] = useState<ICustomer | null>(null);
  const [customerForDescription, setCustomerForDescription] = useState<ICustomer | null>(null);

  const allCustomers = useAppSelector(getCustomersEntities);
  const { isLoading } = useAppSelector((state) => state.CustomersReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const showDeleteModal = (id: string) => {
    Modal.confirm({
      title: 'Вы действительно хотите удалить абонента?',
      maskClosable: true,
      content: <Typography.Text>Абонент будет удалена навсегда</Typography.Text>,
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk: () => dispatch(deleteCustomer(id)),
    });
  };

  const handleUpdateCustomer = (customer: ICustomer) => {
    setCustomerForUpdate(customer);
    setVisibleDrawer(true);
  };

  const columns = generateCustomersColumns({ showDeleteModal, handleUpdateCustomer, setCustomer: setCustomerForDescription });

  return (
    <Fragment>
      {isLoading && <SpinStyled size={'large'} />}
      <ComponentHeader title={'Абоненты'} callback={() => setVisibleDrawer(true)} />
      <CustomersDrawer
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        customerForUpdate={customerForUpdate}
        setCustomerForUpdate={setCustomerForUpdate}
      />
      <CustomerDescription customer={customerForDescription} setCustomer={setCustomerForDescription} />
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={allCustomers}
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
