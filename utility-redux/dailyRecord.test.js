import expect from 'expect';
import {
  fromJS
} from 'immutable';
import moment from 'moment';
import {
  currentDailyRecordSelector,
  todayTotalSelector,
  thisWeekMetricsSelector,
  lastWeekMetricsSelector,
  yearlyAverageSelector,
} from './dailyRecord';

const initialState = {
  projects: fromJS({
    1: {
      category: {
        isPomo: false
      }
    },
    2: {
      category: {
        isPomo: true
      }
    },
  }),
  dailyRecords: fromJS({
    1: {
      _id: '1',
      startedAt: moment().tz('Asia/Tokyo').tz('Asia/Tokyo').startOf('day')
        .toDate(),
      pomo: [
        null,
        null,
        {
          project: {
            category: {
              isPomo: false
            }
          },
          category: {
            isPomo: false
          },
          _id: '1'
        }, // TodayRecords are populated
        {
          project: {
            category: {
              isPomo: true
            }
          },
          category: {
            isPomo: true
          },
          _id: '2'
        },
        {
          project: {
            category: {
              isPomo: true
            }
          },
          category: {
            isPomo: true
          },
          _id: '3'
        },
        {
          project: {
            category: {
              isPomo: true
            }
          },
          category: {
            isPomo: true
          },
          _id: '4'
        },
        null,
      ],
    },
    2: {
      _id: '2',
      startedAt: moment().tz('Asia/Tokyo').startOf('day').add(-1, 'day')
        .toDate(),
      pomo: [{
        project: {
          category: {
            isPomo: false
          }
        },
        category: {
          isPomo: false
        },
        _id: '5'
      }, // TodayRecords are populated
      {
        project: {
          category: {
            isPomo: true
          }
        },
        category: {
          isPomo: true
        },
        _id: '6'
      },
      null,
      ],
    },
    3: {
      _id: '3',
      startedAt: moment().tz('Asia/Tokyo').startOf('day').add(-8, 'day')
        .toDate(),
      pomo: [{
        project: '1'
      },
      {
        project: '2'
      },
      null,
      ],
    },
    4: {
      _id: '4',
      startedAt: moment('2017-01-01').toDate(),
      pomo: [],
    },
  }),
};

describe('DailyRecord Selectors', () => {
  describe('currentDailyRecordSelector', () => {
    it('should get the record based on input dayMomentObject', () => {
      const currentDailyRecord = currentDailyRecordSelector(initialState, moment('2017-01-01'));
      expect(currentDailyRecord.get('_id')).toEqual('4');

      const unfoundCurrentDailyRecord = currentDailyRecordSelector(initialState, moment('2017-02-01'));
      expect(unfoundCurrentDailyRecord).not.toBeDefined();
    });
  });

  describe('todayTotalSelector', () => {
    it('should get the total number of pomos (in hour) for today', () => {
      const todalTotal = todayTotalSelector(initialState);
      expect(todalTotal).toEqual(1.5);
    });
  });

  describe('thisWeekMetricsSelector', () => {
    it('should get the total number of pomos (in hour) for this week', () => {
      const weeklyTotalMetrics = thisWeekMetricsSelector(initialState);
      // TODO: project and category metrics are not tested yet
      if (moment().isoWeekday() === 1) {
        expect(weeklyTotalMetrics[0]).toEqual(1.5);
      } else {
        expect(weeklyTotalMetrics[0]).toEqual(2);
      }
    });
  });

  describe('lastWeekMetricsSelector', () => {
    it('should get the total number of pomos (in hour) for last week', () => {
      const weeklyTotalMetrics = lastWeekMetricsSelector(initialState);
      expect(weeklyTotalMetrics[0]).toEqual(0.5);
    });
  });

  describe('yearlyAverageSelector', () => {
    it('should get average pomo for all the daily records in the past', () => {
      const yearlyAverage = yearlyAverageSelector(initialState);
      // Note the all pomo should not include today
      // expect(yearlyAverage).toEqual(1 / (moment().dayOfYear() - 1));
    });
  });
});
