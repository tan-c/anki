import {
  Map
} from 'immutable';

import {
  createSelector
} from 'reselect';
import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('user');
export const {
  UserActions
} = actionCreate('user');

const getUsers = state => state.users;
// FIXME: since there will only be one user in users, currentUser is just the first user
// const getCurrentUserId = state => state.ui.getIn(['common', 'currentUserId']);


export const currentUserSelector = createSelector(
  [getUsers],
  users => users.valueSeq().get('0'),
);

export const currentUserRecentNoteIdSelector = createSelector(
  [currentUserSelector],
  currentUser => (currentUser.hasIn(['config', 'hima', 'recentNote']) ? currentUser.getIn(['config', 'hima', 'recentNote']) : '')
);

export const currentUserRecentNotebookIdSelector = createSelector(
  [currentUserSelector],
  currentUser => (currentUser.hasIn(['config', 'hima', 'recentNotebook']) ? currentUser.getIn(['config', 'hima', 'recentNotebook']) : '')
);
