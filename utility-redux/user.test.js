import expect from 'expect';
import { fromJS, Map } from 'immutable';
import { currentUserSelector, currentUserRecentNoteSelector } from './user';

function setup(currentUserId) {
  const testState = {
    users: fromJS({
      1: {
        name: 'user 1',
        config: {
          hima: {
            recentNote: {
              title: 'note 1',
            },
          },
        },
      },
      2: { name: 'user 2' },
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
      const { testState } = setup('1');
      const expected = fromJS({
        name: 'user 1',
        config: {
          hima: {
            recentNote: {
              title: 'note 1',
            },
          },
        },
      });
      expect(currentUserSelector(testState)).toEqual(expected);
    });
  });

  describe('currentUserRecentNoteSelector', () => {
    it('should get current user recent notes', () => {
      const { testState } = setup('1');
      const expected = fromJS({
        title: 'note 1',
      });
      expect(currentUserRecentNoteSelector(testState)).toEqual(expected);
    });

    it('should return map() if user has no recent notes', () => {
      const { testState } = setup('2');
      const expected = Map();
      expect(currentUserRecentNoteSelector(testState)).toEqual(expected);
    });
  });
});
