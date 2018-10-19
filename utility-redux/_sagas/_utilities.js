import {
  put,
  call
} from 'redux-saga/effects';
import axios from 'axios';
import Promise from 'bluebird';

// This is included in index.pug
const protobuf = require('protobufjs');

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

window.Promise = Promise;

const namespaceMapping = {
  ab: 'abyssinian',
  in: 'intelNote',
  an: 'anki',
  hr: 'hourblock'
};

export function* getAll(apiNameSnake, namespace, params = {
  limit: 0,
  populate: 1
}, options = {}) {
  const acceptHeader = options.acceptHeader || 'application/json';

  // const key = '_id';
  const {
    apiNameCamel,
    apiNameCamelPlural,
    capitalizedNameCamel,
    capitalizedNameSnakePlural,
    modelName,
  } = require('../_utility/getVariousNames')(apiNameSnake, namespace);

  const axiosGetAllParams = {
    method: 'GET',
    url: `${BASE_URL}/${modelName}`,
    withCredentials: true,
    params: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: acceptHeader // Default disable proto
    },
  };

  if (acceptHeader === 'application/octet-stream') {
    axiosGetAllParams.responseType = 'arraybuffer';
  }

  if (params.limit > 0) {
    axiosGetAllParams.params.limit = params.limit;
  }

  if (!params.populate) {
    axiosGetAllParams.params.populate = params.populate;
  }

  const response = yield call(axios, axiosGetAllParams);
  let resData = response.data;

  if (acceptHeader !== 'application/json') {
    // Decode the thing
    // const { err, root } = yield call(protobuf.load, '../toshigo/housingPrice.proto');

    const {
      err,
      root
    } = yield call(protobuf.load, require(`../${namespaceMapping[namespace]}/${apiNameCamel}.proto`)); // eslint-disable-line

    if (err) {
      throw err;
    }

    const buffer = new Uint8Array(response.data);
    const resource = root.lookupType(`${namespaceMapping[namespace]}.${capitalizedNameCamel}`);

    const payload = resource.decode(buffer);
    const errMsg = resource.verify(payload);
    if (errMsg) {
      throw Error(errMsg);
    }

    // FIXME: the payload would be of the Message prototype and fromJS from immutable will not work until we changre the prototype to JSON
    resData = payload.toJSON().records;
  }

  yield put({
    type: `LOAD_${capitalizedNameSnakePlural}_SUCCESS`,
    [`${apiNameCamelPlural}`]: resData,
    // key,
  });
}

export function* get(apiNameSnake, data, namespace = 'hr') {
  const {
    apiNameCamel,
    capitalizedNameSnake,
    modelName,
  } = require('../_utility/getVariousNames')(apiNameSnake, namespace);

  const response = yield call(axios, ({
    method: 'get',
    url: `${BASE_URL}/${modelName}/${data._id}`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json' // Default disable proto
    },
  }));

  yield put({
    type: `LOAD_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: response.data,
  });
}

export function* create(apiNameSnake, namespace = 'hr') {
  const {
    apiNameCamel,
    capitalizedNameSnake,
    modelName,
  } = require('../_utility/getVariousNames')(apiNameSnake, namespace);

  const response = yield call(axios, ({
    method: 'post',
    url: `${BASE_URL}/${modelName}/`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json' // Default disable proto
    },
  }));

  yield put({
    type: `CREATE_${capitalizedNameSnake}_SUCCESS`,
    [`${apiNameCamel}`]: response.data,
  });

  return response.data;
}
