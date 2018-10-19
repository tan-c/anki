import expect from 'expect';
import { fromJS, OrderedMap } from 'immutable';
import { selectedWorkoutSelector, workoutsSortedByFocusSelector } from './workout';

const initialState = {
  workouts: fromJS({
    id1: {
      _id: 'id1',
      focus: 'chest',
      name: '3',
    },
    id2: {
      _id: 'id2',
      focus: 'chest',
      name: '1',
    },
    id3: {
      _id: 'id3',
      focus: 'shoulder',
    },
    id4: {
      _id: 'id4',
      focus: 'chest',
      name: '2',
    },
  }),

  ui: fromJS({
    hourblock: {
      settingsPage: {
        selectedWorkoutId: 'id1',
      },
    },
  }),
};

describe('Workout Selectors', () => {
  describe('selectedWorkoutSelector', () => {
    it('should get selected workout', () => {
      const result = selectedWorkoutSelector(initialState);
      expect(result.get('_id')).toEqual('id1');
    });
  });

  describe('workoutsSortedByFocusSelector', () => {
    it('should sort first on focus then name', () => {
      const workoutsSortedByFocus = workoutsSortedByFocusSelector(initialState);
      expect(OrderedMap.isOrderedMap(workoutsSortedByFocus)).toEqual(true);
      expect(workoutsSortedByFocus.size).toEqual(4);

      const sortedSeqList = workoutsSortedByFocus.toIndexedSeq();
      expect(sortedSeqList.size).toEqual(4);
      expect(sortedSeqList.getIn(['0', 'name'])).toEqual('1');
      expect(sortedSeqList.getIn(['1', 'name'])).toEqual('2');
      expect(sortedSeqList.getIn(['2', 'name'])).toEqual('3');
      expect(sortedSeqList.getIn(['3', 'focus'])).toEqual('shoulder');
    });
  });
});
