import {
  fork
} from 'redux-saga/effects';

import {
  loadAllDataSaga
} from './AnkiResourcesSaga';

import {
  loadFilesSaga
} from './loadFilesSaga';

import {
  loadWeeklyPopulatedDailyRecordsSaga
} from './loadWeeklyPopulatedDailyRecordsSaga';

import {
  loadDailyMeasurementsSaga
} from './loadDailyMeasurementsSaga';

// import { loadCurrentUserSaga } from './_sagas/loadCurrentUserSaga';

export default function* rootSaga() {
  yield fork(loadAllDataSaga);
  // yield fork(loadAllDataSaga);
  // yield fork(loadFilesSaga);
  // yield fork(loadCurrentUserSaga);

  // yield fork(loadApiWeatherSaga);
  yield fork(loadWeeklyPopulatedDailyRecordsSaga);
  // call(loadFilesSaga)
  yield fork(loadDailyMeasurementsSaga);

  // Or using all
  // yield all([
  //   call(loadAllInitialData),
  // ])
}
