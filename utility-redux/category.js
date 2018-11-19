import {
  createSelector
} from 'reselect';
import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('category');
export const {
  CategoryActions
} = actionCreate('category');

const getCategories = state => state.categories;
export const categoriesSortedSelector = createSelector(
  [getCategories],
  categories => categories.sort((a, b) => (a.get('naturalId') >= b.get('naturalId') ? 1 : -1)),
);
