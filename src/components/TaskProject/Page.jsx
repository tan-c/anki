import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import { Grid, } from 'semantic-ui-react';

import {
  TaskActions,
  projectTasksSelector,
  totalProjectTasksCountSelector
} from 'utility-redux/task';
import { todayPlannedPomosSelector } from 'utility-redux/plannedPomo';
import { UiActions } from 'utility-redux/ui';
import FocusedProjectTaskListConnected from './FocusedProjectTaskList';

export class ProjectTaskList extends React.Component {
  state = {
    nextPomo: Map(),
  }
  // constructor(props, context) {
  //   super(props, context);
  // }
  //


  componentDidMount() {
    setInterval(() => {
      this.getNextPomo(this.props.todayPlannedPomos);
    }, 1000 * 60 * 10);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.nextPomo.size) {
      this.getNextPomo(nextProps.todayPlannedPomos);
    }
  }

  getNextPomo = (todayPlannedPomos) => {
    const currentSectionOfDay = moment().tz('Asia/Tokyo').hour() * 2 + parseInt(moment().minute() / 30, 10);
    const nextSectionOfDay = (currentSectionOfDay + 1) % 48; // 1-indexed
    const nextPomo = todayPlannedPomos.hasIn(['plannedPomos', nextSectionOfDay]) ? todayPlannedPomos.getIn(['plannedPomos', nextSectionOfDay]) : Map();

    this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'focusedProjectId'], nextPomo.getIn(['project', '_id']));
    this.setState({ nextPomo });
  }

  updateTask = (event, task) => {
    if (event.which === 13) {
      const { value } = event.target;
      this.props.TaskActions.update(task.set('content', value), task);
    }
  }

  render() {
    const {
      projectTasks,
      focusedProjectId,
      projects,
      totalProjectTasksCount
    } = this.props;

    const { nextPomo } = this.state;

    return (
      <Grid.Row
        columns={3}
        style={{
          height: '100%'
        }}
      >

        <Grid.Column
          style={{
            overflow: 'auto'
          }}
        >
          {`Task - ${totalProjectTasksCount}`}
          {projects.valueSeq().sort((a, b) => a.getIn(['category', 'naturalId']) - b.getIn(['category', 'naturalId'])).map(project => (
            <div
              role="menuItem"
              tabIndex="-1"
              key={project.get('_id')}
              className={`flex-container-row typical-setup overflow-hidden ${focusedProjectId === project.get('_id') && 'border-orange'} ${nextPomo.getIn(['project', '_id']) === project.get('_id') && 'bg-orange'}`}
              onClick={_ => this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'focusedProjectId'], project.get('_id'))}
            >
              <span
                className="width-60" style={{
                  backgroundColor: project.getIn(['category', 'color']),
                }}
              >
                {project.get('name')}
              </span>

              <span className="flex-3 text-left border-bottom-white-20">
                {projectTasks.has(project.get('_id')) && projectTasks.get(project.get('_id')).sort((a, b) => b.get('priority') - a.get('priority')).getIn([0, 'content'])}
              </span>
            </div>))}
        </Grid.Column>

        <Grid.Column
          style={{
            overflow: 'auto'
          }}
        >
          <FocusedProjectTaskListConnected />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

ProjectTaskList.defaultProps = {
  projectTasks: Map(),
  projects: Map(),
  todayPlannedPomos: Map(),
  focusedProjectId: '',
  totalProjectTasksCount: 0
};

ProjectTaskList.propTypes = {
  projectTasks: PropTypes.object,
  projects: PropTypes.object,
  todayPlannedPomos: PropTypes.object,
  focusedProjectId: PropTypes.string,

  totalProjectTasksCount: PropTypes.number,

  TaskActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    totalProjectTasksCount: totalProjectTasksCountSelector(state),
    focusedProjectId: state.ui.getIn(['hourblock', 'hourblockPage', 'focusedProjectId']),
    projectTasks: projectTasksSelector(state),
    todayPlannedPomos: todayPlannedPomosSelector(state),
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTaskList);
