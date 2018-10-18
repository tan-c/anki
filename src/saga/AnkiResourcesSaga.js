import {
  take, put
} from 'redux-saga/effects';

import {
  getAll, get
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

  yield* getAll('housing_price', 'an', {}, {
    acceptHeader: 'application/octet-stream'
  });


  // Using the userAgent to check device instead of width
  // const httpParams = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? {
  //   limit: 100,
  // } : {
  //   limit: 500,
  // };

  // yield* getAll('anki', 'an', httpParams, {
  //   acceptHeader: 'application/octet-stream'
  // });
  // yield* getAll('anki_tag', 'an');
  // yield* getAll('task', 'hr');
  // yield* getAll('planned_pomo', 'hr');
  // yield* getAll('daily_record', 'hr', {
  //   limit: 1
  // });

  // if (!window.isMobile) {
  yield* getAll('note', 'an', {});
  yield* getAll('notebook', 'an', {});
  yield* getAll('notebook_group', 'an', {});

  // Set Recent notes
  // if (currentUser.config.hima.recentNote._id != null) {
  //   yield put({
  //     type: 'UPDATE_IN_UI_SUCCESS',
  //     path: ['himalayan', 'activeNoteId'],
  //     value: currentUser.config.hima.recentNote._id,
  //   });

  //   yield* get('note', currentUser.config.hima.recentNote, 'in');

  //   yield put({
  //     type: 'UPDATE_IN_UI_SUCCESS',
  //     path: ['himalayan', 'activeNotebookId'],
  //     value: currentUser.config.hima.recentNote.notebook._id,
  //   });
  // }

  yield* getAll('category', 'hr');
  yield* getAll('project', 'hr');

  yield* getAll('daily_record', 'hr', {
    limit: window.isMobile ? 1 : 28,
    populate: 1, // To speed things up // Today should be populated
  });
  yield* getAll('planned_pomo', 'hr');
  yield* getAll('daily_measurement', 'hr');
  yield* getAll('workout', 'hr');
  yield* getAll('workout_record', 'hr');

  if (!window.isMobile) {
    yield* getAll('task', 'hr');
    yield* getAll('event', 'hr');
    yield* getAll('event_record', 'hr');

    // yield* getAll('calorie');
  }

  // }
}
