// import { createSelector } from 'reselect';
import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('notebook_group');
export const {
  NotebookGroupActions
} = actionCreate('notebook_group', 'an');
