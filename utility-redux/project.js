import {
  createSelector
} from 'reselect';
import {
  fromJS
} from 'immutable';

import {
  actionCreate
} from './_base/actionCreate';
import {
  reducerCreate
} from './_base/reducerCreate';

export default reducerCreate('project');
export const {
  ProjectActions
} = actionCreate('project');

const getProjects = state => state.projects;

export const projectsByIdSortedSelector = createSelector(
  [getProjects],
  projects => projects.sort((a, b) => (a.getIn(['category', 'naturalId']) < b.getIn(['category', 'naturalId']) ? -1 : 1)),
);

const getData = (projects, field) => {
  const projectsByCategorySomething = {};

  projects.forEach((project) => {
    const categorySomething = project.getIn(['category', field]);
    if (projectsByCategorySomething[categorySomething] === undefined) {
      projectsByCategorySomething[categorySomething] = {};
    }
    projectsByCategorySomething[categorySomething][project.get('_id')] = project;
  });

  return projectsByCategorySomething;
};

export const projectsByCategoryIdSelector = createSelector(
  [projectsByIdSortedSelector],
  projects => fromJS(getData(projects, '_id')),
);

export const projectsByCategoryNameSelector = createSelector(
  [projectsByIdSortedSelector],
  projects => fromJS(getData(projects, 'name')),
);

const getSelectedProjectId = state => state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']);
export const selectedProjectSelector = createSelector(
  [getProjects, getSelectedProjectId],
  (projects, selectedProjectId) => projects.get(selectedProjectId),
);

export const projectsTotalEstimatedHoursSelector = createSelector(
  [getProjects],
  (projects) => {
    let total = 0;
    projects.forEach((project) => {
      total += project.has('estimatedHour') ? project.get('estimatedHour') : 0;
    });
    return total;
  }
);
