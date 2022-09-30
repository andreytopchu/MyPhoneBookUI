import { typeGlobalState } from '../../store/store';
import { categoriesAdapter } from './categoriesSlice';

const categoriesAllSelect = categoriesAdapter.getSelectors((state: typeGlobalState) => state.CategoryReducer);

export const getCategoriesEntities = categoriesAllSelect.selectAll;
