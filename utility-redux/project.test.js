import expect from 'expect';
import { fromJS } from 'immutable';
import { projectsByCategoryIdSelector } from './project';

const initialState = {
  projects: fromJS({
    1: {
      _id: '1',
      category: {
        _id: 10,
      },
    },
    2: {
      _id: '2',
      category: {
        _id: 10,
      },
    },
    3: {
      _id: '3',
      category: {
        _id: 11,
      },
    },
  }),
};

describe('Project Selectors', () => {
  describe('projectsByCategoryIdSelector', () => {
    it('should group projects by category id', () => {
      const projectsByCategoryId = projectsByCategoryIdSelector(initialState);
      expect(projectsByCategoryId.size).toEqual(2);
      expect(projectsByCategoryId.get('1')).not.toBeDefined();
      expect(projectsByCategoryId.get('10').size).toEqual(2);
      expect(projectsByCategoryId.get('11').size).toEqual(1);
    });
  });
});
