import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomersAPI } from '../../api/customers/customers';
import { ICustomer } from './dto/Customers';

export const getAllCustomers = createAsyncThunk<ICustomer[]>('getAllCustomers', async () => {
  return await new CustomersAPI().getCustomers();
});

export const getCustomerById = createAsyncThunk<ICustomer, string>('getCustomerById', async (id) => {
  return await new CustomersAPI().getCustomerById(id);
});

export const addNewCustomer = createAsyncThunk<ICustomer, ICustomer>('addNewCustomer', async (customer) => {
  return await new CustomersAPI().saveCustomer(JSON.stringify(customer));
});

export const deleteCustomer = createAsyncThunk<string, string>('deleteCustomer', async (id) => {
  await new CustomersAPI().deleteCustomer(id);
  return id;
});

export const updateCustomer = createAsyncThunk<ICustomer, ICustomer>('updateCustomer', async (customer) => {
  return await new CustomersAPI().saveCustomer(JSON.stringify(customer));
});
