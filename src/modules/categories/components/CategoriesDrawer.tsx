import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { IGroup } from '../../customers/dto/Customers';
import { Drawer, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DrawerFooter } from '../../../common/components/DrawerFooter';
import { useAppDispatch } from '../../../hooks/redux';
import { isEqual, omit } from 'lodash';
import { addNewCategory, updateCategory } from '../categoriesAsyncActions';

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  categoryForUpdate: IGroup | null;
  setCategoryForUpdate: Dispatch<SetStateAction<IGroup | null>>;
}

export const CategoriesDrawer: FC<IProps> = ({ visible, setVisible, categoryForUpdate, setCategoryForUpdate }) => {
  const [form] = useForm<IGroup>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setVisible(false);
    setCategoryForUpdate(null);
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [categoryForUpdate]);

  const handleSubmit = () => {
    if (!categoryForUpdate) {
      dispatch(addNewCategory(form.getFieldsValue())).then(() => setVisible(false));
    } else if (!isEqual(omit(categoryForUpdate, 'id'), form.getFieldsValue())) {
      dispatch(
        updateCategory({
          ...form.getFieldsValue(),
          id: categoryForUpdate.id,
        }),
      ).then(() => setVisible(false));
    } else {
      setVisible(false);
    }
    form.resetFields();
  };

  return (
    <Drawer
      open={visible}
      onClose={handleClose}
      title={categoryForUpdate ? 'Редактирование категории' : 'Создание категории'}
      footer={<DrawerFooter cancelCallback={handleClose} saveCallback={handleSubmit} />}
    >
      <Form name={'phoneCategory'} form={form} layout={'vertical'}>
        <Form.Item name={'name'} label={'Имя категории'} initialValue={categoryForUpdate?.name}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
