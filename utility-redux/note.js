import { createSelector } from 'reselect';
import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('note');
export const {
  NoteActions
} = actionCreate('note', 'an');

const getNotes = state => state.notes;
const getActiveNotebookId = state => state.ui.getIn(['himalayan', 'activeNotebookId']);
const getActiveNoteId = state => state.ui.getIn(['himalayan', 'activeNoteId']);

export const activeNotebookNotesSortedSelector = createSelector(
  [getNotes, getActiveNotebookId],
  (notes, activeNotebookId) => notes.filter((note) => {
    if (activeNotebookId === 'deleted') {
      return note.get('isDeleted') === true;
    }
    return note.getIn(['notebook', '_id']) === activeNotebookId && !note.get('isDeleted');
  }).sort((a, b) => (a.get('title') > b.get('title') ? 1 : -1)),
);

export const activeNoteSelector = createSelector(
  [getNotes, getActiveNoteId],
  (notes, activeNoteId) => notes.find(note => note.get('_id') === activeNoteId),
);
