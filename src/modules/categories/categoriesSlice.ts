import { AnyAction, createEntityAdapter, createSlice, isAsyncThunkAction, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../customers/dto/Customers';
import { addNewCategory, deleteCategory, getAllCategories, updateCategory } from './categoriesAsyncActions';
import { groupAdapter } from '../groups/groupSlice';

interface ICategoriesInitialState {
  isLoading: boolean;
  count: number;
}

export const categoriesAdapter = createEntityAdapter<IGroup>();

const isRequestAction = isAsyncThunkAction(getAllCategories);

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState<ICategoriesInitialState>({
    isLoading: false,
    count: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
      categoriesAdapter.setAll(state, action.payload);
      state.count = action.payload.length;
    });
    builder.addCase(addNewCategory.fulfilled, (state, action: PayloadAction<IGroup>) => {
      groupAdapter.addOne(state, action.payload);
      state.count++;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
      groupAdapter.removeOne(state, action.payload);
      state.count--;
    });
    builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<IGroup>) => {
      groupAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
    });
    builder.addMatcher(isLoading, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isError, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(isComplete, (state) => {
      state.isLoading = false;
    });
  },
});

function isError(action: AnyAction) {
  if (isRequestAction(action)) {
    return action.type.endsWith('rejected');
  }
  return false;
}

function isLoading(action: AnyAction) {
  if (isRequestAction(action)) {
    return action.type.endsWith('pending');
  }
  return false;
}

function isComplete(action: AnyAction) {
  if (isRequestAction(action)) {
    return action.type.endsWith('fulfilled');
  }
  return false;
}

export default CategoriesSlice.reducer;
