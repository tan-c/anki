import { createSelector } from 'reselect';

import { actionCreate } from '../_base/actionCreate';
import { reducerCreate } from '../_base/reducerCreate';

export default reducerCreate('workout');
export const {
  WorkoutActions
} = actionCreate('workout');

const getWorkouts = state => state.workouts;
const getSelectedWorkoutId = state => state.ui.getIn(['hourblock', 'settingsPage', 'selectedWorkoutId']);

export const selectedWorkoutSelector = createSelector(
  [getWorkouts, getSelectedWorkoutId],
  (workouts, selectedWorkoutId) => workouts.get(selectedWorkoutId),
);

export const workoutsSortedByFocusSelector = createSelector(
  [getWorkouts],
  workouts => workouts.sort((a, b) => {
    if (a.get('focus') === b.get('focus')) {
      return a.get('name') > b.get('name') ? 1 : -1;
    }
    return a.get('focus') > b.get('focus') ? 1 : -1;
  }),
);
