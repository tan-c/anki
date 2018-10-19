import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';

import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';

import { actionCreate } from './actionCreate';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

jest.unmock('./actionCreate');

const { SampleActions } = actionCreate('sample');

describe('SampleActions action dispatcher Test', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_SAMLPE_SUCCESS action', () => {
      const sample = { id: '1', userName: 'test user' };
      const expectedAction = {
        type: 'CREATE_SAMPLE_SUCCESS',
        sample,
      };

      const action = SampleActions.createResourceSuccess(sample);
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('SampleActions thunk/async actions Test', () => {
  const record = fromJS({ _id: 1 });
  const store = mockStore({});
  const resultData = {
    _id: 1,
    name: 'sample1',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create LOAD_SAMPLE_SUCCESS when getting one sample', (done) => {
    nock('http://localhost:8081/')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/sample/1')
      .reply(200, resultData);

    store.dispatch(SampleActions.get(record)).then((res) => {
      const actions = store.getActions();
      expect(res).toEqual(resultData);
      expect(actions[0].type).toEqual('LOAD_SAMPLE_SUCCESS');
      expect(actions[0].sample).toEqual(resultData);
      done();
    });
  });

  it('should create CREATE_SAMPLE_SUCCESS when creating one sample', (done) => {
    nock(`${BASE_URL}/`, {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/sample')
      .reply(200, resultData);

    store.dispatch(SampleActions.create(record)).then((res) => {
      const actions = store.getActions();
      expect(res).toEqual(resultData);
      expect(actions[1].type).toEqual('CREATE_SAMPLE_SUCCESS');
      expect(actions[1].sample).toEqual(resultData);
      done();
    });
  });


  it('should create UPDATE_SAMPLE_SUCCESS when updating one sample', (done) => {
    // NOTE: this must be here.. wrapped in done
    nock(`${BASE_URL}/`, {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .intercept('/sample/1', 'OPTIONS')
      .reply(200);

    nock(`${BASE_URL}/`, {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .patch('/sample/1')
      .reply(200, resultData);

    store.dispatch(SampleActions.update(record)).then((res) => {
      const actions = store.getActions();
      expect(res).toEqual(resultData);
      expect(actions[2].type).toEqual('UPDATE_SAMPLE_SUCCESS');
      expect(actions[2].sample).toEqual(resultData);
      done();
    });
  });

  it('should create DELETE_SAMPLE_SUCCESS when deleting one sample', (done) => {
    nock('http://localhost:8081/', {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .intercept('/sample/1', 'OPTIONS')
      .reply(200);

    nock('http://localhost:8081/', {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .delete('/sample/1')
      .reply(200, resultData);

    store.dispatch(SampleActions.deleteRecord(record)).then((res) => {
      const actions = store.getActions();
      expect(res).toEqual(record); // deleteRecord will return original action
      expect(actions[3].type).toEqual('DELETE_SAMPLE_SUCCESS');
      expect(actions[3].sample).toEqual(record);
      done();
    });
  });

  it('should create DELETE_SAMPLES_SUCCESS when deleting many samples', (done) => {
    nock('http://localhost:8081/', {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .intercept('/sample', 'OPTIONS')
      .reply(200);

    nock('http://localhost:8081/', {})
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .delete('/sample')
      .reply(200, resultData);


    store.dispatch(SampleActions.deleteRecords({})).then((res) => {
      const actions = store.getActions();
      expect(res).not.toBeDefined(); // deleteRecords will not return anything
      expect(actions[4].type).toEqual('DELETE_SAMPLES_SUCCESS');
      expect(actions[4].query).toEqual({});
      done();
    });
  });
});
