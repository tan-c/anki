/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

import { selectedProjectDailyRecordPomosSelector } from 'utility-redux/dailyRecord';
import { selectedProjectPlannedPomosSelector } from 'utility-redux/plannedPomo';
import {
  ProjectActions,
  selectedProjectSelector
} from 'utility-redux/project';

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
      selectedProjectDailyRecordPomos
    } = this.props;

    return (
      <React.Fragment>
        {selectedProject.has('_id') && (
          <React.Fragment>
            <span className="flex-container-row typical-setup border-top-white">
              <span className="flex-2">Events</span>
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
                  {`${rec.day} - ${rec.sectionOfDay}`}
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

SelectedProjectDetails.defaultProps = {
  selectedProject: Map(),
  selectedProjectPlannedPomos: [],
  selectedProjectDailyRecordPomos: []
};

SelectedProjectDetails.propTypes = {
  selectedProject: PropTypes.object,
  selectedProjectPlannedPomos: PropTypes.array,
  selectedProjectDailyRecordPomos: PropTypes.array,

  ProjectActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    selectedProject: selectedProjectSelector(state),
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
