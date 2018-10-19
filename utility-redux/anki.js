import {
  createSelector
} from 'reselect';
import {
  Map
} from 'immutable';
import moment from 'moment-timezone';

import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('anki', 'an');
export const {
  AnkiActions,
} = actionCreate('anki', 'an');

const endOfTodayUnix = moment().tz('Asia/Tokyo').endOf('day').valueOf(); // FIXME: this will not be right for normal note

const getAnkis = state => state.ankis;
const getActiveAnkiId = state => state.ui.getIn(['activeAnkiId']);

export const ankisSortedSelector = createSelector(
  [getAnkis],
  ankis => ankis.sort((a, b) => moment(b.get('createdAt')).unix() - moment(a.get('createdAt')).unix()),
);

export const uncompletedAnkisSortedSelector = createSelector(
  [getAnkis],
  ankis => ankis.filter(anki => new Date(anki.getIn(['revision', 'nextTime'])) <= endOfTodayUnix)
    .sort((a, b) => moment(b.get('createdAt')).unix() - moment(a.get('createdAt')).unix()),
);

const getSelectedAnkiTagIdForLearning = state => state.ui.get('selectedAnkiTagId');

export const filteredAnkisSelector = createSelector(
  [uncompletedAnkisSortedSelector, getSelectedAnkiTagIdForLearning],
  (uncomompletedAnkis, selectedAnkiTagId) => uncomompletedAnkis.filter((anki) => {
    if (selectedAnkiTagId === '' || selectedAnkiTagId === undefined) {
      return true;
    }

    let hasTag = false;
    if (anki.has('tags')) {
      anki.get('tags').forEach((tag) => { // Tag would be optional for proto
        if (tag.get('_id') === selectedAnkiTagId) {
          hasTag = true;
        }
      });
    }

    return hasTag;
  })
);

export const currentAnkiSelector = createSelector(
  [filteredAnkisSelector],
  filteredAnkis => (filteredAnkis.size > 0 ? filteredAnkis.valueSeq().get('0') : Map())
);

export const activeAnkiSelector = createSelector(
  [getAnkis, getActiveAnkiId],
  (ankis, activeAnkiId) => ankis.get(activeAnkiId),
);

export const revisionAnkisTotalSelector = createSelector(
  [getAnkis],
  ankis => ankis.filter(anki => new Date(anki.getIn(['revision', 'nextTime'])) <= endOfTodayUnix).size,
);

export const unsortedAnkisTotalSelector = createSelector(
  [getAnkis],
  ankis => ankis.filter(anki => anki.get('type') === 'random' || !anki.hasIn(['note', 'title'])).size,
);
