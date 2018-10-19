import { createSelector } from 'reselect';
import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('notebook');
export const {
  NotebookActions
} = actionCreate('notebook', 'an');

const getNotebooks = state => state.notebooks;
const getActiveNotebookGroupId = (state, notebookGroupId) => notebookGroupId;

export const notebookGroupNotebooksSortedSelector = createSelector(
  [getNotebooks, getActiveNotebookGroupId],
  (notebooks, activeNotebookGroupId) => notebooks.filter(notebook => notebook.getIn(['notebookGroup', '_id']) === activeNotebookGroupId).sort((a, b) => (a.get('title') > b.get('title') ? 1 : -1)),
);
