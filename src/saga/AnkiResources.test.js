
import { take } from 'redux-saga/effects';
// import axios from 'axios';

import { loadAllDataSaga } from './AnkiResourcesSaga';

describe('loadAllDataSaga Unit Test', () => {
  const generator = loadAllDataSaga();
  let nextAction;

  const data = {
    project: 'wankee',
    users: []
  };

  it('First project, currentUser upon SET_CURRENT_USER_ID', () => {
    expect(generator.next().value).toEqual(take('SET_CURRENT_USER'));

    nextAction = generator.next(data).value;
    expect(nextAction).toHaveProperty('PUT');

    // TODO: write more test for this
  });
});
