import {
  createSelector
} from 'reselect';
import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('note');
export const {
  NoteActions
} = actionCreate('note');

const getNotes = state => state.notes;

const getUsers = state => state.users;
const currentUserSelector = createSelector(
  [getUsers],
  users => users.valueSeq().get('0'),
);

export const activeNoteIdSelector = createSelector(
  [currentUserSelector],
  currentUser => (currentUser.hasIn(['config', 'hima', 'recentNote']) ? currentUser.getIn(['config', 'hima', 'recentNote']) : '')
);

export const activeNotebookIdSelector = createSelector(
  [currentUserSelector],
  currentUser => (currentUser.hasIn(['config', 'hima', 'recentNotebook']) ? currentUser.getIn(['config', 'hima', 'recentNotebook']) : '')
);

export const activeNotebookNotesSortedSelector = createSelector(
  [getNotes, activeNotebookIdSelector],
  (notes, activeNotebookId) => notes.filter((note) => {
    if (activeNotebookId === 'deleted') {
      return note.get('isDeleted') === true;
    }
    return note.getIn(['notebook', '_id']) === activeNotebookId && !note.get('isDeleted');
  }).sort((a, b) => (a.get('title') > b.get('title') ? 1 : -1)),
);

export const activeNoteSelector = createSelector(
  [getNotes, activeNoteIdSelector],
  (notes, activeNoteId) => notes.find(note => note.get('_id') === activeNoteId),
);
