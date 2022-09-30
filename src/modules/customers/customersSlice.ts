import { AnyAction, createEntityAdapter, createSlice, isAsyncThunkAction, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer } from './dto/Customers';
import { addNewCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from './customersAsyncActions';

interface ICustomersInitialState {
  isLoading: boolean;
  count: number;
  currentCustomer: ICustomer | null;
}

export const customersAdapter = createEntityAdapter<ICustomer>();

const isRequestAction = isAsyncThunkAction(getAllCustomers, getCustomerById, addNewCustomer, deleteCustomer, updateCustomer);

const CustomersSlice = createSlice({
  name: 'customers',
  initialState: customersAdapter.getInitialState<ICustomersInitialState>({
    isLoading: false,
    count: 0,
    currentCustomer: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomers.fulfilled, (state, action: PayloadAction<ICustomer[]>) => {
      customersAdapter.setAll(state, action.payload);
      state.count = action.payload.length;
    });
    builder.addCase(getCustomerById.fulfilled, (state, action: PayloadAction<ICustomer>) => {
      state.currentCustomer = action.payload;
    });
    builder.addCase(addNewCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
      customersAdapter.addOne(state, action.payload);
      state.count++;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
      customersAdapter.removeOne(state, action.payload);
      state.count--;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
      customersAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
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

export default CustomersSlice.reducer;
