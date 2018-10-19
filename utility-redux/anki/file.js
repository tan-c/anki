// import { createSelector } from 'reselect';
import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('file');
export const {
  FileActions
} = actionCreate('file');
