import { AnyAction, createEntityAdapter, createSlice, isAsyncThunkAction, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../customers/dto/Customers';
import { addNewGroup, deleteGroup, getAllGroups, updateGroup } from './groupsAsyncActions';

interface IGroupInitialState {
  isLoading: boolean;
  count: number;
}

export const groupAdapter = createEntityAdapter<IGroup>();

const isRequestAction = isAsyncThunkAction(getAllGroups, addNewGroup, deleteGroup);

const GroupSlice = createSlice({
  name: 'groups',
  initialState: groupAdapter.getInitialState<IGroupInitialState>({
    isLoading: false,
    count: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGroups.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
      groupAdapter.setAll(state, action.payload);
      state.count = action.payload.length;
    });
    builder.addCase(addNewGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
      groupAdapter.addOne(state, action.payload);
      state.count++;
    });
    builder.addCase(deleteGroup.fulfilled, (state, action: PayloadAction<string>) => {
      groupAdapter.removeOne(state, action.payload);
      state.count--;
    });
    builder.addCase(updateGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
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

export default GroupSlice.reducer;
