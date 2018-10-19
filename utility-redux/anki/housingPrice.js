// import { createSelector } from 'reselect';
import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('housing_price');
export const { HousingPriceActions } = actionCreate('housing_price', 'to');
