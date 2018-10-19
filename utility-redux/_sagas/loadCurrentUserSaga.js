import { take, put, call } from 'redux-saga/effects';
import axios from 'axios';
import toastr from 'toastr';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

export function* loadCurrentUserSaga() {
  while (true) {
    const { currentUserId } = yield take('GET_CURRENT_USER_INFO');

    yield put({
      type: 'UPDATE_IN_UI_SUCCESS',
      path: ['common', 'currentUserId'],
      value: currentUserId,
    });

    const allUsers = yield call(axios, ({
      method: 'get',
      url: `${BASE_URL}/user`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        Accept:
          'application/json'
      },
    }));

    yield put({
      type: 'LOAD_USERS_SUCCESS',
      users: allUsers.data,
    });

    yield put({
      type: 'SET_CURRENT_USER'
    });
  }
  // }
}
