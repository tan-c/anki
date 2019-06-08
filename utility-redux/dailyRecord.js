import {
  createSelector
} from 'reselect';
import {
  fromJS,
  // isImmutable
} from 'immutable';
import moment from 'moment-timezone';

import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('daily_record');
export const {
  DailyRecordActions
} = actionCreate('daily_record');

const getDailyRecords = state => state.dailyRecords;
const getProjects = state => state.projects;
const getTodayDailyRecord = state => state.dailyRecords.find(record => moment(record.get('startedAt')).unix() === moment().tz('Asia/Tokyo').startOf('day').unix());
export const todayDailyRecordSelector = createSelector(
  [getTodayDailyRecord],
  todayRecord => todayRecord
);

export const dailyRecordByDayOfYearSelector = createSelector(
  [getDailyRecords],
  (dailyRecords) => {
    const newInitState = {};
    dailyRecords.forEach((dailyRecord) => {
      newInitState[moment.tz(dailyRecord.get('startedAt'), 'Asia/Tokyo').dayOfYear()] = dailyRecord;
    });
    return fromJS(newInitState);
  },
);

export const dailyRecordPomoCountByDayOfYearSelector = createSelector(
  [getDailyRecords, getProjects],
  (dailyRecords, projects) => {
    const newInitState = {};
    dailyRecords.forEach((dailyRecord) => {
      const key = moment.tz(dailyRecord.get('startedAt'), 'Asia/Tokyo').dayOfYear();
      let pomoCount = 0;
      let totalPomoCount = 0;
      dailyRecord.get('pomo').forEach((p) => {
        if (p !== null) { // The item should be populated, using both check for test to pass
          totalPomoCount += 0.5;
          if ((p.has('_id') && p.getIn(['project', 'category', 'isPomo'])) || projects.getIn([p.get('project'), 'category', 'isPomo'])) {
            pomoCount += 0.5;
          }
        }
      });
      newInitState[key] = dailyRecord.merge({
        totalPomoCount,
        pomoCount,
      });
    });
    return fromJS(newInitState);
  },
);

export const dailyRecordByDayOfYearSortedRecencySelector = createSelector(
  [dailyRecordByDayOfYearSelector],
  dailyRecords => dailyRecords.sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix()),
);

const getDayOfYear = (state, dayMomentObject) => dayMomentObject.dayOfYear().toString();
export const currentDailyRecordSelector = createSelector(
  [dailyRecordByDayOfYearSelector, getDayOfYear],
  (dailyRecords, dayOfYear) => dailyRecords.get(dayOfYear),
);

export const todayTotalComplianceSelector = createSelector(
  [getTodayDailyRecord],
  (record) => {
    let todayTotalCompliance = 0;

    if (record !== undefined) {
      record.get('pomo').forEach((p) => {
        if (p !== null && p.get('isCompliant')) {
          todayTotalCompliance += 0.5;
        }
      });
    }
    return todayTotalCompliance;
  },
);

export const todayTotalSelector = createSelector(
  [getTodayDailyRecord],
  (record) => {
    let todayTotal = 0;

    if (record !== undefined) {
      record.get('pomo').forEach((p) => {
        if (p !== null && p.getIn(['project', 'category', 'isPomo'])) {
          todayTotal += 0.5;
        }
      });
    }
    return todayTotal;
  },
);

const calculateTotalCalories = (rec) => {
  let totalCaloriesOfTheDay = 0;
  if (rec === null || rec === undefined) {
    return totalCaloriesOfTheDay;
  }

  if (rec.has('calorieItems')) {
    rec.get('calorieItems').forEach((item) => {
      totalCaloriesOfTheDay += item.has('calorie') ? item.get('calorie') : 0;
    });
  }
  return totalCaloriesOfTheDay;
};


export const getTodayTotalCaloriesSelector = createSelector(
  [currentDailyRecordSelector],
  rec => calculateTotalCalories(rec),
);

const getThisWeekDailyRecord = state => state.dailyRecords.filter(record => moment(record.get('startedAt')).tz('Asia/Tokyo').isoWeek() === moment().tz('Asia/Tokyo').isoWeek());

export const thisWeekMetricsSelector = createSelector(
  [getThisWeekDailyRecord],
  (records) => {
    // [total, projectTotal, categoryTotal, totalCalorie]
    let thisWeekTotal = 0;
    const projectTotal = {};
    const categoryTotal = {};
    let thisWeekTotalCalorie = 0;

    if (records.size) {
      records.forEach((record) => {
        thisWeekTotalCalorie += calculateTotalCalories(record);

        record.get('pomo').forEach((p) => {
          if (p !== null) {
            const pId = p.getIn(['project', '_id']);
            if (projectTotal[pId] === undefined) {
              projectTotal[pId] = 0.5;
            } else {
              projectTotal[pId] += 0.5;
            }

            const cId = p.getIn(['project', 'category', '_id']);
            if (categoryTotal[cId] === undefined) {
              categoryTotal[cId] = 0.5;
            } else {
              categoryTotal[cId] += 0.5;
            }

            if (p.getIn(['project', 'category', 'isPomo'])) {
              thisWeekTotal += 0.5;
            }
          }
        });
      });
    }
    return [thisWeekTotal, fromJS(projectTotal), fromJS(categoryTotal), thisWeekTotalCalorie];
  },
);

const lastWeekNumber = moment().tz('Asia/Tokyo').isoWeek() === 1 ? 52 : moment().tz('Asia/Tokyo').isoWeek() - 1;
const getLastWeekDailyRecord = state => state.dailyRecords.filter(record => moment(record.get('startedAt')).tz('Asia/Tokyo').isoWeek() === lastWeekNumber);

export const lastWeekMetricsSelector = createSelector(
  [getLastWeekDailyRecord, getProjects],
  (records, projects) => {
    // [total, totalCalorie]
    let lastWeekTotal = 0;
    if (records.size) {
      records.forEach((record) => {
        record.get('pomo').forEach((p) => {
          if (p !== null) { // The item should be populated, using both check for test to pass
            if ((p.has('_id') && p.getIn(['project', 'category', 'isPomo'])) || projects.getIn([p.get('project'), 'category', 'isPomo'])) {
              lastWeekTotal += 0.5;
            }
          }
        });
      });
    }
    return [lastWeekTotal];
  },
);

const getThisYearDailyRecord = state => state.dailyRecords.filter(record => moment(record.get('startedAt')).tz('Asia/Tokyo').year() === moment().tz('Asia/Tokyo').year() && moment(record.get('startedAt')).tz('Asia/Tokyo').dayOfYear() !== moment().tz('Asia/Tokyo').dayOfYear());
export const yearlyAverageSelector = createSelector(
  [getThisYearDailyRecord, getProjects],
  (records, projects) => {
    let yearlyTotal = 0;
    records.forEach((rec) => {
      rec.get('pomo').forEach((p) => {
        if (p !== null) {
          // Note: the record might or might not be populated
          if ((p.has('_id') && p.getIn(['project', 'category', 'isPomo'])) || projects.getIn([p.get('project'), 'category', 'isPomo'])) {
            yearlyTotal += 0.5;
          }
        }
      });
    });

    const numberOfDays = 28; // (moment().tz('Asia/Tokyo').dayOfYear() - 1);
    return yearlyTotal / numberOfDays; // Just using 28 days for now
  },
);

const getSelectedProjectId = state => state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']);
export const selectedProjectDailyRecordPomosSelector = createSelector(
  [dailyRecordByDayOfYearSelector, getSelectedProjectId],
  (dailyRecords, selectedProjectId) => {
    const projectDailyRecordPomos = [];
    dailyRecords.valueSeq().forEach((dailyRecord) => {
      dailyRecord.get('pomo').forEach((pomo, index) => {
        if (pomo !== null && pomo.getIn(['project', '_id']) === selectedProjectId) {
          projectDailyRecordPomos.push({
            createdAt: dailyRecord.get('createdAt'),
            sectionOfDay: index,
          });
        }
      });
    });
    return projectDailyRecordPomos;
  },
);
