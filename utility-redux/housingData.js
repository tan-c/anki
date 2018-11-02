import {
  createSelector
} from 'reselect';
import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('housing_data');

export const {
  HousingDataActions
} = actionCreate('housing_data', 'to');

export const housingDataByTypeIntoJSListSelector = (state, type) => state.housingDatas.valueSeq().filter(rec => rec.get('itemType') === type).toJS();

// export const housingDataByTypeIntoJSListSelector = createSelector(
//   [getHousingData],
//   (state, type) => {
//     console.log('🔥🔥🔥🔥🔥 111 🔥🔥🔥🔥🔥');
//     console.log(111);
//     console.log('🔥🔥🔥🔥🔥 type 🔥🔥🔥🔥🔥');
//     console.log(type);
//   }
// );
