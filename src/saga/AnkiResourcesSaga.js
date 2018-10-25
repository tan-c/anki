import {
  take,
  put
} from 'redux-saga/effects';

import {
  getAll,
  get
} from 'utility-redux/_sagas/_utilities';

export function* loadAllDataSaga() {
  const {
    currentUser
  } = yield take('SET_CURRENT_USER');

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

  yield* getAll('anki', httpParams, {
    acceptHeader: 'application/octet-stream'
  });

  yield* getAll('anki_tag');

  // Using the userAgent to check device instead of width
  // const httpParams = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? {
  //   limit: 100,
  // } : {
  //   limit: 500,
  // };ous

  yield* getAll('note');
  yield* getAll('notebook');
  yield* getAll('notebook_group');

  // Set Recent notes
  // if (currentUser.config.hima.recentNote._id != null) {
  //   yield put({
  //     type: 'UPDATE_IN_UI_SUCCESS',
  //     path: ['himalayan', 'activeNoteId'],
  //     value: currentUser.config.hima.recentNote._id,
  //   });

  //   yield* get('note', currentUser.config.hima.recentNote));

  //   yield put({
  //     type: 'UPDATE_IN_UI_SUCCESS',
  //     path: ['himalayan', 'activeNotebookId'],
  //     value: currentUser.config.hima.recentNote.notebook._id,
  //   });
  // }

  window.isMobile = Math.min(document.documentElement.clientWidth, screen.width) <= 450; // P9 is 424

  yield* getAll('category');
  yield* getAll('project');

  yield* getAll('daily_record', {
    limit: window.isMobile ? 1 : 28,
    populate: 1, // To speed things up // Today should be populated
  });

  yield* getAll('planned_pomo');
  yield* getAll('daily_measurement');
  yield* getAll('workout');
  yield* getAll('workout_record');

  if (!window.isMobile) {
    yield* getAll('task');
    yield* getAll('event');
    yield* getAll('event_record');

    // yield* getAll('calorie');
  }

  yield* getAll('housing_price', {}, {
    acceptHeader: 'application/octet-stream'
  });

  // }
}
