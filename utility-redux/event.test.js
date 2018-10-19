import expect from 'expect';
import { fromJS, OrderedMap } from 'immutable';
import { eventsSortedByProjectThenCategorySelector } from './event';

const initialState = {
  events: fromJS({
    1: {
      project: null,
      name: 'event 1',
    },
    2: {
      project: {
        category: {
          naturalId: 3,
        },
      },
      name: 'event 2',
    },
    3: {
      project: {
        category: {
          naturalId: 2,
        },
      },
      name: 'event 3',
    },
    4: {
      project: {
        category: {
          naturalId: 1,
        },
      },
      name: 'event 4',
    },
  }),
};

describe('Event Selectors', () => {
  describe('eventsSortedByProjectThenCategorySelector', () => {
    const sortedResult = eventsSortedByProjectThenCategorySelector(initialState);
    const sortedSeqList = sortedResult.toIndexedSeq();

    it('should first sort on project then on category naturalId', () => {
      expect(OrderedMap.isOrderedMap(sortedResult)).toEqual(true);
      expect(sortedSeqList.getIn(['0', 'name'])).toEqual('event 4');
      expect(sortedSeqList.getIn(['1', 'name'])).toEqual('event 3');
      expect(sortedSeqList.getIn(['2', 'name'])).toEqual('event 2');
    });

    it('should put project without a project last', () => {
      expect(sortedSeqList.getIn([(sortedSeqList.size - 1).toString(), 'name'])).toEqual('event 1');
    });
  });
});
