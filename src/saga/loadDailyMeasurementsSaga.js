import {
  take
} from 'redux-saga/effects';
import moment from 'moment-timezone';

import {
  create,
  get
} from 'utility-redux/_sagas/_utilities';

export function* loadDailyMeasurementsSaga() {
  const {
    dailyMeasurements
  } = yield take('LOAD_DAILY_MEASUREMENTS_SUCCESS');

  // Check if there is a record for today and create
  const startOfDayMoment = moment().tz('Asia/Tokyo').startOf('day');

  let todayRecord = dailyMeasurements.find(dailyRecord => moment(dailyRecord.startedAt).unix() === startOfDayMoment.unix());

  if (todayRecord === undefined) {
    todayRecord = yield* create('daily_measurement'); // Also create measurement record
    yield* get('daily_measurement', todayRecord);
  }
}
