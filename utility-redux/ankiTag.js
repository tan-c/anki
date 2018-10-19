// import { createSelector } from 'reselect';
import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('anki_tag', 'an');
export const {
  AnkiTagActions
} = actionCreate('anki_tag', 'an');
