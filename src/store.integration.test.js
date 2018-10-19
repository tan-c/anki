import expect from 'expect';
import { createStore, combineReducers } from 'redux';
import { UserActions } from 'utility-redux/user';
import { fromJS } from 'immutable';
import rootReducer from './reducers';

let store = null;
const initialState = {
  users: fromJS({
    1: {
      _id: '1',
      userName: 'User 1',
    },
  }),
};

// Using user as an example
describe('Store Integration Test', () => {
  beforeEach(() => {
    store = createStore(combineReducers(rootReducer), initialState);
  });

  it('Should handle creating user correctly', () => {
    const newUser = {
      _id: '2',
      userName: 'User 2',
    };

    const action = UserActions.createResourceSuccess(newUser);
    store.dispatch(action);

    const { users } = store.getState();
    expect(users.size).toEqual(2);
    expect(users.getIn(['1', 'userName'])).toEqual('User 1');
    expect(users.getIn(['2', 'userName'])).toEqual('User 2');
  });

  it('Should handle updating user correctly', () => {
    const updatingUser = {
      _id: '1',
      userName: 'User 2',
    };

    const action = UserActions.updateResourceSuccess(updatingUser);
    store.dispatch(action);

    const { users } = store.getState();
    expect(users.size).toEqual(1);
    expect(users.getIn(['1', 'userName'])).toEqual('User 2');
  });
});
