import { createSelector } from 'reselect';
import moment from 'moment';
import { fromJS } from 'immutable';

import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('workout_record');
export const {
  WorkoutRecordActions
} = actionCreate('workout_record');

const getWorkoutRecords = state => state.workoutRecords;
const getDayMomentObject = (state, dayMomentObject) => dayMomentObject;
const getSelectedWorkoutId = state => state.ui.getIn(['hourblock', 'settingsPage', 'selectedWorkoutId']);

export const selectedWorkoutRecordsSortedSelector = createSelector(
  [getWorkoutRecords, getSelectedWorkoutId],
  (workoutRecords, selectedWorkoutId) => workoutRecords.filter(record => record.getIn(['workout', '_id']) === selectedWorkoutId).sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix()),
);

export const currentWorkoutRecordsAndMostRecentRecordSelector = createSelector(
  [getWorkoutRecords, getDayMomentObject],
  (workoutRecords, dayMomentObject) => {
    const combinedResult = {};
    workoutRecords.forEach((record) => {
      if (moment(record.get('startedAt')).unix() === dayMomentObject.unix()) {
        combinedResult[record.get('_id')] = {
          currentRecord: record,
          recentRecord: null,
        };

        // Check if there is a latest event
        if (workoutRecords.valueSeq().filter(pastRecord => pastRecord.getIn(['workout', '_id']) === record.getIn(['workout', '_id'])).count() > 1) {
          combinedResult[record.get('_id')].recentRecord = workoutRecords.valueSeq().filter(pastRecord => pastRecord.getIn(['workout', '_id']) === record.getIn(['workout', '_id'])).sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix()).get(-2);
        }
      }
    });

    return fromJS(combinedResult);
  },
);
