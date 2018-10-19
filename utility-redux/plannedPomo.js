import {
  fromJS,
  Map
} from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment-timezone';

import { actionCreate } from './_base/actionCreate';
import { reducerCreate } from './_base/reducerCreate';

export default reducerCreate('planned_pomo');
export const {
  PlannedPomoActions
} = actionCreate('planned_pomo');

const getPlannedPomos = state => state.plannedPomos;
export const plannedPomoByDayOfWeekSelector = createSelector(
  [getPlannedPomos],
  (plannedPomos) => {
    const newInitState = {};
    plannedPomos.forEach((plannedPomo) => {
      const dayOfWeek = plannedPomo.get('dayOfWeek');
      if (newInitState[dayOfWeek] === undefined) {
        newInitState[dayOfWeek] = plannedPomo;
      }
    });
    return fromJS(newInitState);
  },
);

export const todayPlannedPomosSelector = createSelector(
  [getPlannedPomos],
  (plannedPomos) => {
    const todayPlannedPomos = plannedPomos.valueSeq().find(plannedPomo => plannedPomo.get('dayOfWeek') === moment().isoWeekday() - 1);

    return todayPlannedPomos;
  },
);

const getSelectedProjectId = state => state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']);
export const selectedProjectPlannedPomosSelector = createSelector(
  [plannedPomoByDayOfWeekSelector, getSelectedProjectId],
  (plannedPomos, selectedProjectId) => {
    const projectPlannedPomos = [];
    plannedPomos.valueSeq().forEach((plannedPomoDay, day) => {
      plannedPomoDay.get('plannedPomos').forEach((pomo, index) => {
        if (pomo !== null && pomo.getIn(['project', '_id']) === selectedProjectId) {
          projectPlannedPomos.push({
            day,
            sectionOfDay: index,
          });
        }
      });
    });

    return projectPlannedPomos;
  },
);

// const getPomo = (todayPlannedPomos, sectionOfDay) => (todayPlannedPomos.hasIn(['plannedPomos', sectionOfDay]) ? todayPlannedPomos.getIn(['plannedPomos', sectionOfDay]) : Map());

// const miemiemie = meimie => meimie;
// export const nextTwoPlannedPomosSelector = createSelector(
//   [todayPlannedPomosSelector, miemiemie],
//   (todayPlannedPomos, meimie) => {
//     console.log('🔥🔥🔥🔥🔥 miemiemie 🔥🔥🔥🔥🔥');
//     console.log(miemiemie);
//     if (todayPlannedPomos === undefined) {
//       return [0, Map(), 0, Map()];
//     }
//     const currentSectionOfDay = moment().tz('Asia/Tokyo').hour() * 2 + parseInt(moment().minute() / 30, 10);
//     const nextSectionOfDay = (currentSectionOfDay + 1) % 48; // 1-indexed
//     // const nextNextSectionOfDay = (currentSectionOfDay + 2) % 48; // 1-indexed
//     return [currentSectionOfDay, getPomo(todayPlannedPomos, currentSectionOfDay), nextSectionOfDay, getPomo(todayPlannedPomos, nextSectionOfDay)];
//   }
// );

export const projectBasedPlannedPomoTotalSelector = createSelector(
  [plannedPomoByDayOfWeekSelector],
  (plannedPomos) => {
    const projectBasedPlannedPomoTotal = {};
    plannedPomos.valueSeq().forEach((plannedPomosDay) => {
      plannedPomosDay.get('plannedPomos').forEach((pomo, index) => {
        if (pomo !== null) {
          const projectId = pomo.getIn(['project', '_id']);
          if (projectBasedPlannedPomoTotal[projectId] === undefined) {
            projectBasedPlannedPomoTotal[projectId] = 0;
          }
          projectBasedPlannedPomoTotal[projectId] += 0.5; // Based on hour
        }
      });
    });

    return projectBasedPlannedPomoTotal;
  },
);
