import {
  take,
  all
} from 'redux-saga/effects';
import moment from 'moment-timezone';

import {
  create,
  get
} from 'utility-redux/_sagas/_utilities';

export function* loadWeeklyPopulatedDailyRecordsSaga() {
  const {
    dailyRecords
  } = yield take('LOAD_DAILY_RECORDS_SUCCESS');
  // Check if there is a record for today and create

  // If today is monday, load yday as well
  // Alternatively you could "lazy-load" only when you click "Last Day" or "Next Day"
  const startOfDayMoment = moment().tz('Asia/Tokyo').startOf('day');
  const weeklyRecords = dailyRecords.filter(dailyRecord => moment(dailyRecord.startedAt).tz('Asia/Tokyo').isoWeek() === startOfDayMoment.isoWeek() || moment(dailyRecord.startedAt).add(1, 'days').unix() === startOfDayMoment.unix());

  let todayRecord = weeklyRecords.find(dailyRecord => moment(dailyRecord.startedAt).unix() === startOfDayMoment.unix());
  if (todayRecord === undefined) {
    // If defined it will be loaded in yield all..
    todayRecord = yield* create('daily_record');
  }

  yield all(weeklyRecords.map(rec => get('daily_record', rec)));
}
