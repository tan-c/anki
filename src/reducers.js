import ankis from 'utility-redux/anki/anki';
import ankiTags from 'utility-redux/anki/ankiTag';
import housingPrices from 'utility-redux/anki/housingPrice';
import notes from 'utility-redux/anki/note';
import notebooks from 'utility-redux/anki/notebook';
import notebookGroups from 'utility-redux/anki/notebookGroup';
import files from 'utility-redux/anki/file';

import dailyRecords from 'utility-redux/hourblock/dailyRecord';
import tasks from 'utility-redux/hourblock/task';
import categories from 'utility-redux/hourblock/category';
import dailyMeasurements from 'utility-redux/hourblock/dailyMeasurement';
import plannedPomos from 'utility-redux/hourblock/plannedPomo';
import projects from 'utility-redux/hourblock/project';
import events from 'utility-redux/hourblock/event';
import eventRecords from 'utility-redux/hourblock/eventRecord';
import workouts from 'utility-redux/hourblock/workout';
import workoutRecords from 'utility-redux/hourblock/workoutRecord';


import users from 'utility-redux/common/user';
import ui from 'utility-redux/common/ui';

export default {
  ankis,
  ankiTags,
  notes,
  notebooks,
  notebookGroups,
  files,
  housingPrices,

  categories,
  dailyRecords,
  dailyMeasurements,
  plannedPomos,
  projects,
  tasks,
  events,
  eventRecords,
  // calories,
  workouts,
  workoutRecords,

  users,
  ui,
};
