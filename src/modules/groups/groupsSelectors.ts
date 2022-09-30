import { groupAdapter } from './groupSlice';
import { typeGlobalState } from '../../store/store';

const groupsAllSelect = groupAdapter.getSelectors((state: typeGlobalState) => state.GroupReducer);

export const getGroupsEntities = groupsAllSelect.selectAll;
