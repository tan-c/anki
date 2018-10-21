import {
  take,
  put,
  call
} from 'redux-saga/effects';
import axios from 'axios';
import Promise from 'bluebird';
import {
  fromJS
} from 'immutable';

window.Promise = Promise;

let defaultCoords = { // Nakano
  latitude: 35.70964063158431,
  longitude: 139.6723915733286,
};
const API_KEY = 11; // FIXME: read from .config.js

const getUrl = (coords, type) => `https://api.openweathermap.org/data/2.5/${type}?appid=${API_KEY}&lat=${defaultCoords.latitude}&lon=${defaultCoords.longitude}&units=metric`;

function showPosition(position) {
  defaultCoords = position.coords;
}

export function* loadApiWeatherSaga() {
  while (true) {
    yield take('SET_WEATHER_INFO');

    if (location.protocol.indexOf('https') > -1 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    const futureInfo = yield call(axios, {
      method: 'GET',
      url: getUrl(defaultCoords, 'forecast'),
    });

    const currentInfo = yield call(axios, {
      method: 'GET',
      url: getUrl(defaultCoords, 'weather'),
    });

    yield put({
      type: 'UPDATE_IN_UI_SUCCESS',
      path: ['common', 'api', 'weatherInfo'],
      value: fromJS({
        city: futureInfo.data.city,
        current: currentInfo.data.main,
        next: {
          time: futureInfo.data.list[0].dt_txt,
          weather: futureInfo.data.list[0].main,
        },
      }),
    });
  }
}
