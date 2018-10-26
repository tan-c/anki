import expect from 'expect';
import {
  fromJS
} from 'immutable';
import {
  activeNotebookNotesSortedSelector,
  activeNoteSelector
} from './note';

const setUpInitialState = (activeNotebookId, activeNoteId = '1') => ({
  notes: fromJS({
    1: {
      _id: '1',
      title: 'note 12',
      notebook: {
        _id: '1',
      },
      isDeleted: false,
    },
    2: {
      _id: '2',
      title: 'note 11',
      notebook: {
        _id: '1',
      },
      isDeleted: false,
      content: 'something',
    },
    3: {
      _id: '2',
      title: 'note 3',
      notebook: {
        _id: '2',
      },
      isDeleted: false,
    },
    4: {
      _id: '3',
      title: 'note 4',
      notebook: {
        _id: '1',
      },
      isDeleted: true,
    },
  }),

  ui: fromJS({
    himalayan: {},
  }),
});

describe('Note Selectors', () => {
  describe('activeNotebookNotesSortedSelector', () => {
    describe('when activeNotebookId is not deleted', () => {
      const filteredNotes = activeNotebookNotesSortedSelector(setUpInitialState('1'));

      it('shoud return notes that belong to the active notebook and note deleted', () => {
        expect(filteredNotes.get('1')).toBeDefined();
        expect(filteredNotes.size).toEqual(2);
      });

      it('should have notes sorted based on title', () => {
        const sortedSeqList = filteredNotes.toIndexedSeq();
        expect(sortedSeqList.size).toEqual(2);
        expect(sortedSeqList.getIn(['0', 'title'])).toEqual('note 11');
        expect(sortedSeqList.getIn(['1', 'title'])).toEqual('note 12');
      });
    });

    describe('when activeNotebookId is deleted', () => {
      const filteredNotes = activeNotebookNotesSortedSelector(setUpInitialState('deleted'));
      it('shoud return notes are deleted', () => {
        expect(filteredNotes.size).toEqual(1);
        expect(filteredNotes.get('4')).toBeDefined();
      });
    });
  });

  describe('activeNoteSelector', () => {
    it('should return the right active note', () => {
      // const activeNoteWithNoContent = activeNoteSelector(setUpInitialState('1', '1'));
      // expect(activeNoteWithNoContent).not.toBeDefined();

      const activeNoteWithContent = activeNoteSelector(setUpInitialState('1', '2'));
      expect(activeNoteWithContent).toBeDefined();
      expect(activeNoteWithContent.get('_id')).toEqual('2');
    });
  });
});
