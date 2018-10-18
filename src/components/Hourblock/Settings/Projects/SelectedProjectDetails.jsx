/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment';

import { selectedProjectDailyRecordPomosSelector } from 'utility-redux/hourblock/dailyRecord';
import { selectedProjectPlannedPomosSelector } from 'utility-redux/hourblock/plannedPomo';
import {
  ProjectActions,
  selectedProjectSelector
} from 'utility-redux/hourblock/project';
import { selectedProjectTasksSelector } from 'utility-redux/hourblock/task';
import { selectedProjectEventsSelector } from 'utility-redux/hourblock/event';

export class SelectedProjectDetails extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  deleteProject = (_) => {
    const { selectedProject } = this.props;
    if (confirm(`Deleting project ${selectedProject.get('name')}`)) {
      this.props.ProjectActions.deleteRecord(selectedProject);
    }
  };

  render() {
    const {
      selectedProject,
      selectedProjectPlannedPomos,
      selectedProjectTasks,
      selectedProjectEvents,
      selectedProjectDailyRecordPomos
    } = this.props;

    return (
      <React.Fragment>
        <div className="section-header">
          Project:
          {selectedProject.get('name')}
        </div>

        <div className="section-content">
          <span className="flex-container-row typical-setup">
            <span className="flex-2">Tasks</span>
            <span className="flex-1">{selectedProjectTasks.size}</span>
          </span>

          <span className="flex-container-row typical-setup border-top-white">
            <span className="flex-2">Events</span>
            <span className="flex-1">{selectedProjectEvents.size}</span>
          </span>

          <span className="flex-container-row typical-setup border-top-white">
            <span className="flex-2">Planned Pomos</span>
            <span className="flex-1">{selectedProjectPlannedPomos.length}</span>
          </span>

          {selectedProjectPlannedPomos.map((rec, ind) => (
            <div
              className="flex-container-row typical-setup border-top"
              key={ind}
            >
              <span className="flex-1">
                {rec.day}
                {' '}
                {rec.sectionOfDay}
              </span>
            </div>
          ))}

          <span className="flex-container-row typical-setup border-top-white">
            <span className="flex-2">Daily Record Pomos</span>
            <span className="flex-1">
              {selectedProjectDailyRecordPomos.length}
            </span>
          </span>

          {selectedProjectDailyRecordPomos.map((rec, ind) => (
            <div
              className="flex-container-row typical-setup border-top"
              key={ind}
            >
              <span className="flex-1">
                {moment(rec.createdAt)
                  .startOf('day')
                  .add(rec.sectionOfDay / 2, 'hour')
                  .format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
          ))}

          <div className="spacing" />
          {selectedProject.has('_id')
            && selectedProjectTasks.size === 0
            && selectedProjectEvents.size === 0
            && selectedProjectPlannedPomos.length === 0
            && selectedProjectDailyRecordPomos.length === 0 && (
            <button
              type="button"
              className="bg-red flex-1 width-100p"
              onClick={this.deleteProject}
            >
              Delete Project
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

SelectedProjectDetails.defaultProps = {
  selectedProject: Map(),
  selectedProjectTasks: Map(),
  selectedProjectEvents: Map(),
  selectedProjectPlannedPomos: [],
  selectedProjectDailyRecordPomos: []
};

SelectedProjectDetails.propTypes = {
  selectedProject: PropTypes.object,
  selectedProjectTasks: PropTypes.object,
  selectedProjectEvents: PropTypes.object,
  selectedProjectPlannedPomos: PropTypes.array,
  selectedProjectDailyRecordPomos: PropTypes.array,

  ProjectActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    selectedProject: selectedProjectSelector(state),
    selectedProjectTasks: selectedProjectTasksSelector(state),
    selectedProjectEvents: selectedProjectEventsSelector(state),
    selectedProjectPlannedPomos: selectedProjectPlannedPomosSelector(state),
    selectedProjectDailyRecordPomos: selectedProjectDailyRecordPomosSelector(
      state
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProjectActions: bindActionCreators(ProjectActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProjectDetails);
