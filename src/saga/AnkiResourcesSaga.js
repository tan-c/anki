import {
  take, put
} from 'redux-saga/effects';

import {
  getAll
} from 'utility-redux/_sagas/_utilities';

export function* loadAllDataSaga() {
  const { currentUser } = yield take('SET_CURRENT_USER');

  yield put({
    type: 'LOAD_USERS_SUCCESS',
    users: [currentUser], // Actually only one user (current user)
  });

  // Using the userAgent to check device instead of width
  const httpParams = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? {
    limit: 100,
  } : {
    limit: 500,
  };

  yield* getAll('anki', 'an', httpParams, {
    acceptHeader: 'application/octet-stream'
  });
  yield* getAll('anki_tag', 'an');
  yield* getAll('task', 'hr');
  yield* getAll('planned_pomo', 'hr');
  yield* getAll('daily_record', 'hr', {
    limit: 1
  });
}
