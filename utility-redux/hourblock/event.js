import { createSelector } from 'reselect';
import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('event');
export const {
  EventActions
} = actionCreate('event');

const getEvents = state => state.events;
const getProjectId = (state, recordPomo) => recordPomo.getIn(['project', '_id']);
const sortByProjectThenCategory = (a, b) => {
  if (a.get('project') === null && b.get('project') !== null) {
    return 1; // with project first
  }

  if (a.getIn(['project', 'category', 'naturalId']) === b.getIn(['project', 'category', 'naturalId'])) {
    return a.get('name') > b.get('name') ? 1 : -1;
  }

  return a.getIn(['project', 'category', 'naturalId']) > b.getIn(['project', 'category', 'naturalId']) ? 1 : -1;
};

export const selectableEventsSortedByProjectThenCategorySelector = createSelector(
  [getEvents, getProjectId],
  (events, projectId) => events.filter(event => event.get('project') === null || event.getIn(['project', '_id']) === projectId).sort((a, b) => sortByProjectThenCategory(a, b)),
);

export const eventsSortedByProjectThenCategorySelector = createSelector(
  [getEvents],
  events => events.sort((a, b) => sortByProjectThenCategory(a, b)),
);

const getSelectedProjectId = state => state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']);
export const selectedProjectEventsSelector = createSelector(
  [getEvents, getSelectedProjectId],
  (events, selectedProjectId) => events.filter(ev => ev.getIn(['project', '_id']) === selectedProjectId),
);
