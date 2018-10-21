import {
  put,
  call
} from 'redux-saga/effects';
import axios from 'axios';

import {
  getAll,
  get
} from './_utilities';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

describe('Saga Utilities Action Unit Test', () => {
  beforeAll(() => {
    const ls = require('../../utility-test/setup/localStorage.js');
    ls.setLocalStorage();
  });

  describe('GetAll Saga Unit Test', () => {
    it('First get all the data then dispatch it', () => {
      // const id = 'NCC1701';
      // const user = { name: 'Jean Luc' };
      const json = () => {};
      const response = {
        json
      };
      const generator = getAll('sample');

      const {
        apiNameCamelPlural,
        capitalizedNameSnakePlural,
        modelName,
      } = require('../_utility/getVariousNames')('sample');

      expect(generator.next().value).toEqual(call(axios, {
        method: 'GET',
        params: {},
        url: `${BASE_URL}/${modelName}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }));

      const action = {
        type: `LOAD_${capitalizedNameSnakePlural}_SUCCESS`,
        [`${apiNameCamelPlural}`]: response.data
      };

      expect(generator.next(action).value).toEqual(put(action));
    });
  });

  describe('Get Saga Unit Test', () => {
    it('First get the data then dispatch it', () => {
      const json = () => {};
      const response = {
        json
      };
      const data = {
        _id: '1'
      };
      const generator = get('sample', '', data);

      const {
        apiNameCamel,
        capitalizedNameSnake,
        modelName,
      } = require('../_utility/getVariousNames')('sample');

      // expect(generator.next().value).toEqual(call(axios, {
      //   method: 'GET',
      //   url: `${BASE_URL}/${modelName}/${data._id}`,
      //   withCredentials: true,
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      //   },
      // }));

      // const action = {
      //   type: `LOAD_${capitalizedNameSnake}_SUCCESS`,
      //   [`${apiNameCamel}`]: response.data,
      // };

      // expect(generator.next(action).value).toEqual(put(action));
    });
  });
});
