import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Button, Collapse, DatePicker, Divider, Drawer, Form, InputNumber, Select } from 'antd';
import { ICustomer, IGroup, IPhone } from '../dto/Customers';
import { useForm } from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { DrawerFooter } from '../../../common/components/DrawerFooter';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { groupAdapter } from '../../groups/groupSlice';
import { typeGlobalState } from '../../../store/store';
import { getAllGroups } from '../../groups/groupsAsyncActions';
import { getAllCategories } from '../../categories/categoriesAsyncActions';
import { getGroupsEntities } from '../../groups/groupsSelectors';
import { getCategoriesEntities } from '../../categories/categoriesSelectors';
import { addNewCustomer, updateCustomer } from '../customersAsyncActions';
import moment from 'moment';
import { isEqual, omit } from 'lodash';

const { Panel } = Collapse;

const genderOptions = [
  {
    label: 'Неопределённый',
    value: 'None',
  },
  {
    label: 'Мужской',
    value: 'Male',
  },
  {
    label: 'Женский',
    value: 'Female',
  },
];

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  customerForUpdate: ICustomer | null;
  setCustomerForUpdate: Dispatch<SetStateAction<ICustomer | null>>;
}

export const CustomersDrawer: FC<IProps> = ({ visible, setVisible, customerForUpdate, setCustomerForUpdate }) => {
  const allGroups = useAppSelector(getGroupsEntities);
  const allCategories = useAppSelector(getCategoriesEntities);
  const [values, setValues] = useState<ICustomer | null>(null);

  const [form] = useForm();
  const dispatch = useAppDispatch();

  const groupsOptions = allGroups.map((group) => {
    return { label: group.name, value: group.id };
  });

  const categoriesOptions = allCategories.map((category) => {
    return { label: category.name, value: category.id };
  });

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllCategories());
  }, []);

  const handleClose = () => {
    setCustomerForUpdate(null);
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [customerForUpdate]);

  const handleSubmit = () => {
    if (!customerForUpdate && values) {
      dispatch(addNewCustomer(values)).then(() => handleClose());
    } else if (
      customerForUpdate &&
      !isEqual(
        {
          ...omit(customerForUpdate, 'id', 'groups', 'imageUrl'),
          groupIds: customerForUpdate.groups.map((group) => group.id),
        },
        {
          ...omit(form.getFieldsValue(), 'dateOfBirth', 'phoneNumbers'),
          dateOfBirth: form.getFieldValue('dateOfBirth')?._i,
          phones: form.getFieldValue('phoneNumbers'),
        },
      )
    ) {
      console.log(form.getFieldsValue());
      dispatch(
        updateCustomer({
          ...form.getFieldsValue(),
          phoneNumbers: form.getFieldValue('phoneNumbers').map((phone: IPhone) => {
            return {
              phoneNumber: phone.phoneNumber,
              phoneCategoryId: phone.category.id,
            };
          }),
          id: customerForUpdate.id,
        }),
      ).then(() => {
        handleClose();
      });
    } else {
      handleClose();
    }
  };

  return (
    <Drawer
      open={visible}
      onClose={handleClose}
      title={customerForUpdate ? 'Редактирование абонента' : 'Создание абонента'}
      footer={<DrawerFooter cancelCallback={handleClose} saveCallback={handleSubmit} />}
    >
      <Form form={form} layout={'vertical'} name={'customer'} onValuesChange={() => setValues(form.getFieldsValue())}>
        <Form.Item name={'firstName'} label={'Имя'} initialValue={customerForUpdate?.firstName}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'middleName'} label={'Фамилия'} initialValue={customerForUpdate?.middleName}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'lastName'} label={'Отчество'} initialValue={customerForUpdate?.lastName}>
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item name={'groupIds'} label={'Группы'} initialValue={customerForUpdate?.groups.map((group) => group.id)}>
          <Select mode={'multiple'} options={groupsOptions} />
        </Form.Item>
        <Form.List name='phoneNumbers' initialValue={customerForUpdate?.phones}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Collapse key={index}>
                    <PanelStyled
                      key={index}
                      header={values?.phones?.[index]?.phoneNumber ? values?.phones[index].phoneNumber : 'Номера абонента'}
                      extra={<DeleteOutlinedStyled onClick={() => remove(field.name)} />}
                    >
                      <Form.Item {...field} name={[field.name, 'phoneNumber']} label={'Номер телефона'}>
                        <Input showCount />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'phoneCategoryId']}
                        label={'Категория'}
                        initialValue={customerForUpdate?.phones[index].category.id}
                      >
                        <Select options={categoriesOptions} />
                      </Form.Item>
                      <Divider />
                    </PanelStyled>
                  </Collapse>
                ))}
                <Form.Item>
                  <ButtonStyled type={'dashed'} onClick={() => add()} icon={<PlusOutlined />}>
                    Добавить номер
                  </ButtonStyled>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item name={['address', 'region']} label={'Регион'} initialValue={customerForUpdate?.address.region}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'city']} label={'Город'} initialValue={customerForUpdate?.address.city}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'street']} label={'Улица'} initialValue={customerForUpdate?.address.street}>
          <Input />
        </Form.Item>
        <Form.Item name={['address', 'block']} label={'Квартал'} initialValue={customerForUpdate?.address.block}>
          <Input />
        </Form.Item>
        <ItemsWrapper>
          <Form.Item name={['address', 'house']} label={'Дом'} initialValue={customerForUpdate?.address.house}>
            <StyledInputNumber min={0} />
          </Form.Item>
          <Form.Item name={['address', 'flat']} label={'Подъезд'} initialValue={customerForUpdate?.address.flat}>
            <StyledInputNumber min={0} />
          </Form.Item>
        </ItemsWrapper>
        <Form.Item name={'gender'} label={'Пол'} initialValue={customerForUpdate?.gender}>
          <Select options={genderOptions} />
        </Form.Item>
        <Form.Item
          name={'dateOfBirth'}
          label={'Дата рождения'}
          initialValue={customerForUpdate?.dateOfBirth ? moment(customerForUpdate?.dateOfBirth) : undefined}
        >
          <DatePickerStyled locale={locale} />
        </Form.Item>
        <Form.Item name={'email'} label={'Почта'} initialValue={customerForUpdate?.email}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const DeleteOutlinedStyled = styled(DeleteOutlined)`
  color: red;
  font-size: 16px;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
`;
const PanelStyled = styled(Panel)`
  margin-bottom: 15px;
`;
const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`;
const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;
