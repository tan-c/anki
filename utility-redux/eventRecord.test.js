import expect from 'expect';
import { fromJS } from 'immutable';
import { selectedEventEventRecordsSelector } from './eventRecord';

const initialState = {
  eventRecords: fromJS({
    1: {
      event: {
        _id: 'event1',
      },
      name: 'event record 1',
    },
    2: {
      event: {
        _id: 'event1',
      },
      name: 'event record 2',
    },
    3: {
      event: {
        _id: 'event2',
      },
      name: 'event record 3',
    },
  }),
  ui: fromJS({
    hourblock: {
      settingsPage: {
        selectedEventId: 'event1',
      },
    },
  }),
};

describe('EventRecord Selectors', () => {
  describe('selectedEventEventRecordsSelector', () => {
    it('should only return event records of selected event', () => {
      const resultRecords = selectedEventEventRecordsSelector(initialState);
      expect(resultRecords.size).toEqual(2);
      expect(resultRecords.get('3')).not.toBeDefined();
    });
  });
});
