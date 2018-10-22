import {
  createSelector
} from 'reselect';
import moment from 'moment-timezone';

import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('daily_measurement');
export const {
  DailyMeasurementActions
} = actionCreate('daily_measurement');

const getDailyMeasurements = state => state.dailyMeasurements;
const getLastWeekNumber = () => (moment().tz('Asia/Tokyo').isoWeek() === 1 ? 52 : moment().tz('Asia/Tokyo').isoWeek() - 1);
const getDayMomentObject = (state, dayMomentObject) => dayMomentObject;

export const currentDayMeasurementSelector = createSelector(
  [getDailyMeasurements, getDayMomentObject],
  (dailyMeasurements, dayMomentObject) => dailyMeasurements.find(rec => moment(rec.get('startedAt')).tz('Asia/Tokyo').dayOfYear() === dayMomentObject.dayOfYear() && moment(rec.get('startedAt')).tz('Asia/Tokyo').year() === dayMomentObject.year()),
);

export const todayMeasurementSelector = createSelector(
  [getDailyMeasurements],
  dailyMeasurements => dailyMeasurements.find(rec => moment(rec.get('startedAt')).unix() === moment().tz('Asia/Tokyo').startOf('day').unix()),
);

export const threeDayMeasurementSelector = createSelector(
  [getDailyMeasurements],
  (dailyMeasurements) => {
    const res = dailyMeasurements.filter(rec => moment(rec.get('startedAt')).add(2, 'days').unix() >= moment().tz('Asia/Tokyo').startOf('day').unix());

    return res.sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix());
  },
);

export const calorieWeeklySelector = createSelector(
  [getDailyMeasurements, getLastWeekNumber],
  (dailyMeasurements, lastWeekNumber) => {
    // Get Average for all last week stuff
    let totalWeight = 0;
    let totalHeight = 0;
    let recordCount = 0;

    let calorieWeeklyMaintain = 0;
    let calorieWeeklyWeightLoss = 0;
    dailyMeasurements.forEach((record) => {
      if (moment(record.get('startedAt')).tz('Asia/Tokyo').isoWeek() === lastWeekNumber && record.has('morningWeight') && record.get('morningWeight') > 0) {
        totalWeight += record.get('morningWeight');
        totalHeight += record.get('height');
        recordCount += 1;
      }
    });

    if (recordCount) {
      calorieWeeklyMaintain = (10 * totalWeight / recordCount + 6.25 * totalHeight / recordCount - 5 * 28 + 5) * 7 * 1.55;
      calorieWeeklyMaintain = parseInt(calorieWeeklyMaintain, 10);
      calorieWeeklyWeightLoss = parseInt(calorieWeeklyMaintain * 0.8, 10);
    }
    // BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5
    // BMR => AMR
    // 1.2 if you’re sedentary (little or no exercise)
    // 1.375 if you’re lightly active (you exercise 1-3 times a week)
    // 1.55 if you’re moderately active (you exercise or work about average)
    // 1.725 if you’re very active (you train hard for 6-7 days a week)
    // 1.9 if you’re highly active (you’re a physical laborer or a professional athlete)
    return [calorieWeeklyMaintain, calorieWeeklyWeightLoss];
  },
);
