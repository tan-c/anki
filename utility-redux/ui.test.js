import expect from 'expect';
import { fromJS } from 'immutable';
import uiReducer, { UiActions } from './ui';

const initialState = fromJS({
  himalayan: {
    1: 'item 1',
  },
});

describe('UiReducer test', () => {
  it('should add record when passed in UPDATE_IN_UI_SUCCESS ', () => {
    const action = UiActions.updateInUiSuccess(['himalayan', '1'], 'item 2');
    const newState = uiReducer(initialState, action);
    expect(newState.getIn(['himalayan', '1'])).toEqual('item 2');
  });
});
