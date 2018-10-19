import expect from 'expect';
import { fromJS } from 'immutable';
import moment from 'moment-timezone';

import { currentWorkoutRecordsAndMostRecentRecordSelector } from './workoutRecord';

const initialState = {
  workoutRecords: fromJS({
    1: {
      _id: '1',
      workout: {
        _id: 'workout1',
      },
      startedAt: moment().tz('Asia/Tokyo').startOf('day').toDate(),
    },
    2: {
      _id: '2',
      workout: {
        _id: 'workout2',
      },
      startedAt: moment().tz('Asia/Tokyo').startOf('day').toDate(),
    },
    3: {
      _id: '2',
      workout: {
        _id: 'workout1',
      },
      startedAt: moment().add(-1, 'day').startOf('day').toDate(),
    },
    4: {
      _id: '3',
      workout: {
        _id: 'workout1',
      },
      startedAt: moment().add(-2, 'day').startOf('day').toDate(),
    },
  }),

};

describe('WorkoutRecord Selectors', () => {
  describe('currentWorkoutRecordsAndMostRecentRecordSelector', () => {
    const combinedResult = currentWorkoutRecordsAndMostRecentRecordSelector(
      initialState,
      moment().tz('Asia/Tokyo').startOf('day'),
    );

    it('should return all current day record', () => {
      expect(combinedResult.size).toEqual(2);
    });

    it('should return null for workoutRecord with no past record', () => {
      expect(combinedResult.getIn(['2', 'recentRecord'])).toEqual(null);
    });

    it('should return most recent result for workoutRecord with past records', () => {
      expect(combinedResult.getIn(['1', 'recentRecord', '_id'])).toEqual('2');
    });
  });
});
