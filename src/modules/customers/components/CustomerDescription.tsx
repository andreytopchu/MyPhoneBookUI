import React, { Dispatch, FC, SetStateAction } from 'react';
import { ICustomer } from '../dto/Customers';
import { Drawer, List, Tag, Typography } from 'antd';
import moment from 'moment';

interface IProps {
  customer: ICustomer | null;
  setCustomer: Dispatch<SetStateAction<ICustomer | null>>;
}

export const CustomerDescription: FC<IProps> = ({ customer, setCustomer }) => {
  const handleClose = () => {
    setCustomer(null);
  };

  return (
    <Drawer open={Boolean(customer)} title={'Информация об абоненте'} onClose={handleClose}>
      <Typography.Paragraph>
        ФИО: {customer?.firstName} {customer?.middleName} {customer?.lastName}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Группы:
        {customer?.groups.map((group) => (
          <Tag key={group.id}>{group.name}</Tag>
        ))}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Номера:
        <List>
          {customer?.phones.map((phone) => (
            <li key={phone.category.id}>
              {phone.phoneNumber} Категория: {phone.category.name}
            </li>
          ))}
        </List>
      </Typography.Paragraph>
      <Typography.Paragraph>Регион: {customer?.address.region}</Typography.Paragraph>
      <Typography.Paragraph>Город: {customer?.address.city}</Typography.Paragraph>
      <Typography.Paragraph>Улица: {customer?.address.street}</Typography.Paragraph>
      <Typography.Paragraph>Квартал: {customer?.address.block}</Typography.Paragraph>
      <Typography.Paragraph>Дом: {customer?.address.house}</Typography.Paragraph>
      <Typography.Paragraph>Подъезд: {customer?.address.flat}</Typography.Paragraph>
      <Typography.Paragraph>Пол: {customer?.gender}</Typography.Paragraph>
      <Typography.Paragraph>Дата рождения: {customer?.dateOfBirth.slice(0, 10)}</Typography.Paragraph>
      <Typography.Paragraph>Пол: {customer?.gender}</Typography.Paragraph>
      <Typography.Paragraph>Email: {customer?.email}</Typography.Paragraph>
    </Drawer>
  );
};
