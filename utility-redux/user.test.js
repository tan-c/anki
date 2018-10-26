import expect from 'expect';
import {
  fromJS,
  Map
} from 'immutable';
import {
  currentUserSelector,
  currentUserRecentNoteIdSelector,
  // currentUserRecentNotebookIdSelector
} from './user';

function setup(currentUserId) {
  const testState = {
    users: fromJS({
      1: {
        name: 'user 1',
        config: {
          hima: {
            recentNote: '1',
          },
        },
      },
      2: {
        name: 'user 2'
      },
    }),
    ui: fromJS({
      common: {
        currentUserId,
      },
    }),
  };

  return {
    testState,
  };
}

describe('User Selectors', () => {
  describe('currentUserSelector', () => {
    it('should get current user', () => {
      const {
        testState
      } = setup('1');
      const expected = fromJS({
        name: 'user 1',
        config: {
          hima: {
            recentNote: '1',
          },
        },
      });
      expect(currentUserSelector(testState)).toEqual(expected);
    });
  });

  describe('currentUserRecentNoteIdSelector', () => {
    it('should get current user recent notes', () => {
      const {
        testState
      } = setup('1');
      const expected = '1';
      expect(currentUserRecentNoteIdSelector(testState)).toEqual(expected);
    });
  });
});
