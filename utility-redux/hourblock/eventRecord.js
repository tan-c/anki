import { createSelector } from 'reselect';
import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('event_record');
export const {
  EventRecordActions
} = actionCreate('event_record');

const getEventRecords = state => state.eventRecords;
const getSelectedEventId = state => state.ui.getIn(['hourblock', 'settingsPage', 'selectedEventId']);

export const selectedEventEventRecordsSelector = createSelector(
  [getEventRecords, getSelectedEventId],
  (eventRecords, selectedEventId) => eventRecords.filter(rec => rec.getIn(['event', '_id']) === selectedEventId),
);
