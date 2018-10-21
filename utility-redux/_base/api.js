import axios from 'axios';
import {
  isImmutable
} from 'immutable';
import Promise from 'bluebird';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

// axios.defaults.host = 'http://localhost:8081';
// axios.defaults.adapter = require('axios/lib/adapters/xhr');
window.Promise = Promise; // overwrite native Promise implementation with Bluebird's (for axios)

function wrapRequest(req) { // Not including with credentials for jest testing
  if (typeof (__TEST__) === 'undefined') {
    req.withCredentials = true; // For cross site
    req.headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json'
    };
  }
  return req;
}

export default class BaseApi {
  constructor(modelName) {
    this.modelName = modelName;
  }

  get(data, params = {}) {
    const dataId = isImmutable(data) ? data.get('_id') : data._id;
    return axios(wrapRequest({
      method: 'GET',
      url: `${BASE_URL}/${this.modelName}/${dataId}`,
      params,
    }));
  }

  create(data) {
    return axios(wrapRequest({
      method: 'post',
      url: `${BASE_URL}/${this.modelName}`,
      data,
    }));
  }

  update(data) {
    const dataId = isImmutable(data) ? data.get('_id') : data._id;
    return axios(wrapRequest({
      method: 'patch',
      url: `${BASE_URL}/${this.modelName}/${dataId}`,
      data,
    }));
  }

  delete(data) {
    const dataId = isImmutable(data) ? data.get('_id') : data._id;
    return axios(wrapRequest({
      method: 'delete',
      url: `${BASE_URL}/${this.modelName}/${dataId}`,
    }));
  }

  deleteMany(params) {
    return axios(wrapRequest({
      method: 'delete',
      url: `${BASE_URL}/${this.modelName}`,
      params,
    }));
  }

  // return fetch('http://facebook.github.io/react-native/movies.json')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     return responseJson.movies;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });


  // return fetch(`${BASE_URL}/${this.modelName}`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })

  // put(data) {
  //   return axios.put(`${BASE_URL}/${this.modelName}`, data);
  // }
}
