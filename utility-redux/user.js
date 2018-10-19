import { Map } from 'immutable';

import { createSelector } from 'reselect';
import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('user');
export const {
  UserActions
} = actionCreate('user', ''); // No namespace

const getUsers = state => state.users;
// FIXME: since there will only be one user in users, currentUser is just the first user
// const getCurrentUserId = state => state.ui.getIn(['common', 'currentUserId']);


export const currentUserSelector = createSelector(
  [getUsers],
  users => users.valueSeq().get('0'),
);

export const currentUserRecentNoteSelector = createSelector(
  [currentUserSelector],
  currentUser => (currentUser.hasIn(['config', 'hima', 'recentNote', 'title']) ? currentUser.getIn(['config', 'hima', 'recentNote']) : Map()),
);
