import expect from 'expect';
import { fromJS } from 'immutable';
import { ankisSortedSelector, uncompletedAnkisSortedSelector, activeAnkiSelector } from './anki';

const initialState = {
  ankis: fromJS({
    1: {
      _id: '1',
      type: 'anki',
      note: {
        title: 'note 1',
      },
      revision: {
        nextTime: '2017-01-01',
      },
    },
    2: {
      _id: '2',
      type: 'random',
      revision: {
        nextTime: '2030-01-01',
      },
    },
    3: {
      _id: '3',
      type: 'anki',
      revision: {
        nextTime: '2030-01-01',
      },
    },
  }),
  ui: fromJS({
    activeAnkiId: '3',
  }),
};

describe('Anki Selectors', () => {
  describe('ankisSortedSelector', () => {
    it('should get ankis of type random or those without note when value is "unsorted" ', () => {
      const filteredAnkis = ankisSortedSelector(initialState);
      expect(filteredAnkis.size).toEqual(2);
      expect(filteredAnkis.get('1')).toEqual(undefined);
    });
  });

  describe('uncompletedAnkisSortedSelector', () => {
    it('should get only future ankis', () => {
      const filteredAnkis = uncompletedAnkisSortedSelector(initialState);
      expect(filteredAnkis.size).toEqual(1);
      expect(filteredAnkis.get('1')).toBeDefined();
      expect(filteredAnkis.getIn(['1', 'note', 'title'])).toEqual('note 1');
    });
  });

  describe('activeAnkiSelector', () => {
    it('should get active anki ', () => {
      const filteredAnki = activeAnkiSelector(initialState);
      expect(filteredAnki).toBeDefined();
      expect(filteredAnki.has('_id')).toEqual(true);
      expect(filteredAnki.get('_id')).toEqual('3');
    });
  });
});
