import { fork } from 'redux-saga/effects';

import { loadAllDataSaga } from './AnkiResourcesSaga';
// import { loadCurrentUserSaga } from './_sagas/loadCurrentUserSaga';

export default function* rootSaga() {
  yield fork(loadAllDataSaga);
  // yield fork(loadCurrentUserSaga);

  // Or using all
  // yield all([
  //   call(loadAllInitialData),
  // ])
}
