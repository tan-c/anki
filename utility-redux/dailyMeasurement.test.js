import expect from 'expect';
import moment from 'moment';
import {
  fromJS,
  Map
} from 'immutable';
import {
  currentDayMeasurementSelector,
  calorieWeeklySelector
} from './dailyMeasurement';

const initialStateNull = {
  dailyMeasurements: Map(),
};

const initialStateNormal = {
  dailyMeasurements: fromJS({
    1: {
      startedAt: '2017-01-01',
    },
    2: {
      startedAt: moment().add(-7, 'days').toDate(),
      weight: 80,
      height: 180,
    },
    3: {
      startedAt: moment().toDate(),
      weight: 100,
      height: 200,
    },
  }),
};

describe('DailyMeasurement Selectors', () => {
  describe('currentDayMeasurementSelector', () => {
    it('should return data given a day', () => {
      const data = currentDayMeasurementSelector(initialStateNormal, moment());
      expect(data.get('weight')).toEqual(100);
      expect(data.get('height')).toEqual(200);
    });
  });

  describe('calorieWeeklySelector', () => {
    it('should return [0, 0] if no last week records', () => {
      const calorieEstimated = calorieWeeklySelector(initialStateNull);
      expect(calorieEstimated).toEqual([0, 0]);
    });

    it('should return values if having last week records', () => {
      const calorieEstimated = calorieWeeklySelector(initialStateNormal);
      // TODO: i think the calculation formula should be extracted
      // expect(calorieEstimated).toEqual([19421, 15536]);
    });
  });
});
