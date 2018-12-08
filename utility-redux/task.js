import {
  createSelector
} from 'reselect';
import {
  fromJS,
  Map
} from 'immutable';
import moment from 'moment-timezone';

import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('task');
export const {
  TaskActions
} = actionCreate('task');

const getTasks = state => state.tasks;
const getTaskReducerKey = (task, type) => {
  const momentObject = moment(task.get('targetCompletion')).tz('Asia/Tokyo');
  let key = null; // note that key needs to be a string in actual useage

  switch (type) {
  case 'daily':
    key = momentObject.dayOfYear();
    break;
  case 'weekly':
    key = momentObject.isoWeek();
    break;
  default:
    break;
  }
  return key;
};

const getNewTasks = (tasks, type) => {
  const newInitialState = {};

  tasks.filter(task => task.get('type') === type).forEach((task) => {
    const key = getTaskReducerKey(task, type);
    if (newInitialState[key] !== undefined) {
      newInitialState[key].push(task);
    } else {
      newInitialState[key] = [task];
    }
  });

  return fromJS(newInitialState);
};

export const dailyTasksSelector = createSelector(
  [getTasks],
  tasks => getNewTasks(tasks, 'daily'),
);

export const todayTasksSelector = createSelector(
  [dailyTasksSelector],
  tasks => tasks.get(moment().tz('Asia/Tokyo').dayOfYear().toString()),
);

export const overduedTasksSelector = createSelector(
  [dailyTasksSelector],
  (tasks) => {
    let overdueTasksList = [];

    // const dayOfYear = moment().tz('Asia/Tokyo').dayOfYear();
    tasks.entrySeq().forEach((entry) => {
      if (entry[1].has('0') && new Date(entry[1].getIn(['0', 'targetCompletion'])) <= new Date().getTime()) {
        // overduedTasksCount += entry[1].size;
        overdueTasksList = overdueTasksList.concat(entry[1].toJS());
      }
    });

    return fromJS(overdueTasksList);
    // return tasks.entrySeq().filter(entry => parseInt(entry[0], 10) <= dayOfYear);
  }
);

export const weeklyTasksSelector = createSelector(
  [getTasks],
  tasks => getNewTasks(tasks, 'weekly'),
);

export const thisWeekTasksSelector = createSelector(
  [weeklyTasksSelector],
  tasks => tasks.get(moment().tz('Asia/Tokyo').isoWeek().toString()),
);

export const yearlyTasksSelector = createSelector(
  [getTasks],
  tasks => tasks.valueSeq().filter(task => task.get('type') === 'yearly')
);

export const currentYearlyTasksSortedSelector = createSelector(
  [yearlyTasksSelector],
  yearlyTasks => yearlyTasks.sort((a, b) => {
    const catA = a.getIn(['project', 'category', 'naturalId']);
    const catB = b.getIn(['project', 'category', 'naturalId']);

    if (catA === catB) {
      if (a.getIn(['project', 'name']) === b.getIn(['project', 'name'])) {
        return a.getIn(['priority']) > b.getIn(['priority']) ? -1 : 1;
      }

      return a.getIn(['project', 'name']) > b.getIn(['project', 'name']) ? -1 : 1;
    }
    return catA < catB ? -1 : 1;
  }),
);

const selectedYearlyTaskId = state => state.ui.getIn(['taskPage', 'selectedYearlyTaskId']);

export const selectedYearlyTaskSelector = createSelector(
  [getTasks, selectedYearlyTaskId],
  (tasks, yearlyTaskId) => tasks.get(yearlyTaskId),
);

// const getTasks = state => state.tasks;
export const totalProjectTasksCountSelector = createSelector(
  [getTasks],
  tasks => tasks.valueSeq().filter(task => task.get('type') === 'project').count(),
);

const getSelectedProjectId = state => state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']);
export const selectedProjectTasksSelector = createSelector(
  [getTasks, getSelectedProjectId],
  (tasks, selectedProjectId) => tasks.get(selectedProjectId),
);

// const getTodayPomos = (state) => {
//   const todayPlannedPomos = state.plannedPomos.valueSeq().find(plannedPomo => plannedPomo.get('dayOfWeek') === moment().isoWeekday() - 1);
//   return todayPlannedPomos;
// };

// NOTE ----- THIS GETS THE TASKS TODAY
// BUT THE PROBLEM IS THAT COMPLETING TASK CANNOT UPDATE IT PROPERLY

// export const todayPlannedPomoTasksSelector = createSelector(
//   [getTodayPomos, allProjectTasksOrderedSelector],
//   (todayPomos, allProjectTasksOrdered) => {
//     // You should have 48 pomos so get 48 tasks
//     const plannedPomoTasksList = [];
//     const projectTaskCount = {};
//     if (todayPomos !== undefined && allProjectTasksOrdered !== undefined) {
//       todayPomos.get('plannedPomos').forEach((plannedPomo) => {
//         const projectId = plannedPomo.hasIn(['project', '_id']) ? plannedPomo.getIn(['project', '_id']) : null;

//         if (projectId === null) {
//           plannedPomoTasksList.push(null);
//         } else {
//           const currentTaskIndex = projectId in projectTaskCount ? projectTaskCount[projectId] + 1 : 0;
//           if (allProjectTasksOrdered.hasIn([projectId, currentTaskIndex])) {
//             plannedPomoTasksList.push(allProjectTasksOrdered.getIn([projectId, currentTaskIndex]));
//           } else {
//             plannedPomoTasksList.push(null);
//           }
//           projectTaskCount[projectId] = currentTaskIndex;
//         }
//       });
//     }

//     return fromJS(plannedPomoTasksList);
//   }
// );
