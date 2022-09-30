import { typeGlobalState } from '../../store/store';
import { customersAdapter } from './customersSlice';

const customersAllSelect = customersAdapter.getSelectors((state: typeGlobalState) => state.CustomersReducer);

export const getCustomersEntities = customersAllSelect.selectAll;
