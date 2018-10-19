import expect from 'expect';
import { fromJS } from 'immutable';
import {
  plannedPomoByDayOfWeekSelector,
  // projectBasedPlannedPomoTotalSelector,
} from './plannedPomo';

const initialState = {
  plannedPomos: fromJS({
    1: {
      _id: '1',
      dayOfWeek: 7,
    },
    4: {
      _id: '4',
      dayOfWeek: 8,
    },
  }),
};

describe('PlannedPomo Selectors', () => {
  describe('plannedPomoByDayOfWeekSelector', () => {
    it('should regroup the plannedPomos by day of week', () => {
      const plannedPomoByDayOfWeek = plannedPomoByDayOfWeekSelector(initialState);
      expect(plannedPomoByDayOfWeek.size).toEqual(2);
      expect(plannedPomoByDayOfWeek.get('7')).toBeDefined();
      expect(plannedPomoByDayOfWeek.get('8')).toBeDefined();
    });
  });
});
