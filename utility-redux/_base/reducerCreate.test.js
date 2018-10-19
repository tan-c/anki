import expect from 'expect';
import { fromJS } from 'immutable';

import { actionCreate } from './actionCreate';
import { reducerCreate } from './reducerCreate';

const sampleReducer = reducerCreate('sample');
const { SampleActions } = actionCreate('sample');

describe('Sample Reducer', () => {
  const initialState = fromJS({
    A: { _id: 'A', title: 'Old Title' },
    B: { _id: 'B', title: 'Old Title' },
    C: { _id: 'C', title: 'New Title' },
  });

  it('should add sample when passed CREATE_SAMPLE_SUCCESS', () => {
    const newSample = { _id: 'C' }; // This should not be Map()
    const action = SampleActions.createResourceSuccess(newSample);
    const newState = sampleReducer(initialState, action);

    expect(newState.size).toEqual(3);
    expect(newState.getIn(['A', '_id'])).toEqual('A');
    expect(newState.getIn(['B', '_id'])).toEqual('B');
    expect(newState.getIn(['C', '_id'])).toEqual('C');
  });

  it('should update sample when passed UPDATE_SAMPLE_SUCCESS', () => {
    const updatedSample = { _id: 'A', title: 'New Title' };
    const action = SampleActions.updateResourceSuccess(updatedSample);
    const newState = sampleReducer(initialState, action);

    expect(newState.size).toEqual(3);
    expect(newState.getIn(['A', 'title'])).toEqual('New Title');
  });

  it('should delete sample when passed DELETE_SAMPLE_SUCCESS', () => {
    const deletedSample = fromJS({ _id: 'A' });
    const action = SampleActions.deleteResourceSuccess(deletedSample);
    const newState = sampleReducer(initialState, action);

    expect(newState.size).toEqual(2);
    expect(newState.getIn(['A'])).toEqual(undefined);
    expect(newState.getIn(['B', '_id'])).toEqual('B');
  });

  it('should delete samples of query when passed DELETE_SAMPLES_SUCCESS', () => {
    const deleteingQuery = { title: 'Old Title' };
    const action = SampleActions.deleteResourcesSuccess(deleteingQuery);
    const newState = sampleReducer(initialState, action);

    expect(newState.size).toEqual(1);
    expect(newState.getIn(['A'])).toEqual(undefined);
    expect(newState.getIn(['B'])).toEqual(undefined);
    expect(newState.getIn(['C', '_id'])).toEqual('C');
  });
});
