import expect from 'expect';
import { fromJS, OrderedMap } from 'immutable';
import { categoriesSortedSelector } from './category';

const initialState = {
  categories: fromJS({
    1: {
      _id: 1,
      naturalId: 3,
    },
    2: {
      _id: 2,
      naturalId: 1,
    },
  }),
};

describe('Category Selectors', () => {
  describe('categoriesSortedSelector', () => {
    const filteredCategories = categoriesSortedSelector(initialState);
    it('should return categories sorted based on naturalId', () => {
      expect(filteredCategories.size).toEqual(2);
      expect(filteredCategories.getIn(['1', 'naturalId'])).toEqual(3);
    });

    it('should sort categories based on naturalId', () => {
      const sortedSeqList = filteredCategories.toIndexedSeq();
      expect(OrderedMap.isOrderedMap(filteredCategories)).toEqual(true);
      expect(sortedSeqList.getIn(['0', 'naturalId'])).toEqual(1);
      expect(sortedSeqList.getIn(['1', 'naturalId'])).toEqual(3);
    });
  });
});
