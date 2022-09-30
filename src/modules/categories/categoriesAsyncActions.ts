import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesAPI } from '../../api/categories/categories';
import { IGroup } from '../customers/dto/Customers';

export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
  return await new CategoriesAPI().getCategories();
});

export const addNewCategory = createAsyncThunk<IGroup, IGroup>('addNewCategory', async (group) => {
  return await new CategoriesAPI().saveCategories(JSON.stringify(group));
});

export const deleteCategory = createAsyncThunk<string, string>('deleteCategory', async (id) => {
  await new CategoriesAPI().deleteCategories(id);
  return id;
});

export const updateCategory = createAsyncThunk<IGroup, IGroup>('updateCategory', async (group) => {
  return await new CategoriesAPI().saveCategories(JSON.stringify(group));
});
