// import moment from 'moment';

const {
  fromJS
} = require('immutable');

const initialState = {
  hourblock: {
    hourblockPage: {
      currentSectionOfDay: -1, // Start with -1 so it will always be different
      focusedProjectId: '',
      selectedEventRecordId: '',
      showMonthlyCalendar: true,
    },
    planningPage: {
      updatingRecurTask: false,
      updatingPlannedPomo: false,
      selectedProjectId: '',
    },
    taskPage: {
      selectedYearlyTaskId: '', // this is actually the relative index in the array
    },
    settingsPage: {
      edittingTarget: 'dailyPomoCount',
      selectedEventId: '',
      selectedWorkoutId: '',
    },
  },

  himalayan: {
    showModal: '', // UI Was not loaded at beginning so setting here wont work
  },

  common: {
    currentUserId: '',
    currentUserImageSrc: '', // Based on the imageSrc from the auth0
    isSettingOn: false,
    isAuthenticated: false,

    api: {
      weatherInfo: {},
    },
  },

  anki: {
    isSidebarOn: true,
  }
};

export default function UiReducer(state = fromJS(initialState), action) {
  switch (action.type) {
  // case 'UPDATE_UI_SUCCESS':
  //   return state.set(action.key, action.value);

  case 'UPDATE_IN_UI_SUCCESS':
  {
    return state.setIn(action.path, action.value);
  }

  default:
    return state;
  }
}

// const updateUiSuccess = (key, value) => ({
//   type: 'UPDATE_UI_SUCCESS',
//   key,
//   value,
// });

const updateInUiSuccess = (path, value) => ({
  type: 'UPDATE_IN_UI_SUCCESS',
  path,
  value,
});

export const UiActions = {
  // updateUiSuccess,
  updateInUiSuccess,

  // update(key, value) {
  //   return (dispatch, getState) => {
  //     dispatch(updateUiSuccess(key, value));
  //   };
  // },

  updateIn(path, value) {
    return (dispatch, getState) => {
      dispatch(updateInUiSuccess(path, value));
    };
  },
};
