import {
  take,
  put,
  call
} from 'redux-saga/effects';
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  accessToken: '111' // FIXME: read from .config.js
});

export function* loadFilesSaga() {
  while (true) {
    yield take('SET_WEATHER_INFO');
    const res = yield call(_ => dbx.filesListFolder({
      path: ''
    }));

    yield put({
      type: 'LOAD_FILES_SUCCESS',
      files: res.entries,
      // key: 'id',
    });
  }
}
