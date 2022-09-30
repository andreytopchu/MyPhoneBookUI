import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { IGroup } from '../../customers/dto/Customers';
import { Drawer, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DrawerFooter } from '../../../common/components/DrawerFooter';
import { useAppDispatch } from '../../../hooks/redux';
import { addNewGroup, updateGroup } from '../groupsAsyncActions';
import { isEqual, omit } from 'lodash';

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  groupForUpdate: IGroup | null;
  setGroupForUpdate: Dispatch<SetStateAction<IGroup | null>>;
}

export const GroupsDrawer: FC<IProps> = ({ visible, setVisible, groupForUpdate, setGroupForUpdate }) => {
  const [form] = useForm<IGroup>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setVisible(false);
    setGroupForUpdate(null);
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [groupForUpdate]);

  const handleSubmit = () => {
    if (!groupForUpdate) {
      dispatch(addNewGroup(form.getFieldsValue())).then(() => setVisible(false));
    } else if (!isEqual(omit(groupForUpdate, 'id'), form.getFieldsValue())) {
      dispatch(
        updateGroup({
          ...form.getFieldsValue(),
          id: groupForUpdate.id,
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
      title={groupForUpdate ? 'Редактирование группы' : 'Создание группы'}
      footer={<DrawerFooter cancelCallback={handleClose} saveCallback={handleSubmit} />}
    >
      <Form name={'Group'} form={form} layout={'vertical'}>
        <Form.Item name={'name'} label={'Имя группы'} initialValue={groupForUpdate?.name}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
