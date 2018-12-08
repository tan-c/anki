import expect from 'expect';
import {
  fromJS
} from 'immutable';
import moment from 'moment';

import {
  dailyTasksSelector,
  weeklyTasksSelector,
  yearlyTasksSelector,
  currentYearlyTasksSortedSelector,
} from './task';

const initialState = {
  tasks: fromJS({
    1: {
      targetCompletion: moment().toDate(),
      type: 'daily',
    },
    2: {
      targetCompletion: moment().toDate(),
      type: 'daily',
    },
    3: {
      targetCompletion: moment().toDate(),
      type: 'weekly',
    },
    6: {
      targetCompletion: moment().toDate(),
      type: 'yearly',
      project: {
        _id: 'project_id2',
      },
    },
    7: {
      targetCompletion: moment().toDate(),
      type: 'project',
      project: {
        _id: 'project_id1',
      },
    },
    8: {
      targetCompletion: moment().toDate(),
      type: 'project',
      project: {
        _id: 'project_id2',
      },
    },
    9: {
      targetCompletion: moment().add(-1, 'year').toDate(),
      type: 'yearly',
      project: {
        _id: 'project_id2',
      },
    },
    10: {
      targetCompletion: moment().toDate(),
      type: 'yearly',
      project: {
        _id: 'project_id2',
      },
    },
  }),
};

describe('Task Selectors', () => {
  describe('dailyTasksSelector', () => {
    it('should group daily tasks by dayOfYear', () => {
      const selectedTasks = dailyTasksSelector(initialState);
      const dayOfYear = moment().tz('Asia/Tokyo').dayOfYear();
      expect(selectedTasks.get(dayOfYear.toString()).size).toEqual(2);
      expect(selectedTasks.get((dayOfYear - 1).toString())).not.toBeDefined();
    });
  });

  describe('weeklyTasksSelector', () => {
    it('should group weekly tasks by iso week', () => {
      const selectedTasks = weeklyTasksSelector(initialState);
      const isoWeek = moment().isoWeek();
      expect(selectedTasks.get(isoWeek.toString()).size).toEqual(1);
      expect(selectedTasks.get((isoWeek - 1).toString())).not.toBeDefined();
    });
  });

  describe('yearlyTasksSelector', () => {
    it('should group yearly tasks by year', () => {
      const selectedTasks = yearlyTasksSelector(initialState);
      const year = moment().year();
      expect(selectedTasks.get(year.toString()).size).toEqual(2);
      expect(selectedTasks.get((year - 1).toString())).toBeDefined();
      expect(selectedTasks.get((year - 2).toString())).not.toBeDefined();
    });
  });

  describe('currentYearlyTasksSortedSelector', () => {
    it('should get current year tasks only', () => {
      const currentYearlyTasksSorted = currentYearlyTasksSortedSelector(initialState);
      expect(currentYearlyTasksSorted.size).toEqual(2);
    });
  });
});
