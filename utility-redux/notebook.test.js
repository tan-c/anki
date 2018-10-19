import expect from 'expect';
import { fromJS, OrderedMap } from 'immutable';
import { notebookGroupNotebooksSortedSelector } from './notebook';

const initialState = {
  notebooks: fromJS({
    1: {
      _id: '1',
      title: 'title 2',
      notebookGroup: {
        _id: 'nbg1',
      },
    },
    2: {
      _id: '2',
      title: 'title 1',
      notebookGroup: {
        _id: 'nbg1',
      },
    },
    3: {
      _id: '3',
      title: 'title 3',
      notebookGroup: {
        _id: 'nbg2',
      },
    },
  }),
};

describe('Notebook Selectors', () => {
  describe('notebookGroupNotebooksSortedSelector', () => {
    const resultRecords = notebookGroupNotebooksSortedSelector(initialState, 'nbg1');
    it('should get relevant notebooks', () => {
      expect(resultRecords.size).toEqual(2);
      expect(resultRecords.get('3')).not.toBeDefined();
    });

    it('should sort results by title', () => {
      expect(OrderedMap.isOrderedMap(resultRecords)).toEqual(true);

      const sortedSeqList = resultRecords.toIndexedSeq();
      expect(sortedSeqList.getIn(['0', 'title'])).toEqual('title 1');
      expect(sortedSeqList.getIn(['1', 'title'])).toEqual('title 2');
    });
  });
});
