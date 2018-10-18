import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectConnected from 'utility-react-component/Form/Select';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';

import { WorkoutActions, workoutsSortedByFocusSelector } from 'utility-redux/hourblock/workout';
import { UiActions } from 'utility-redux/common/ui';

import { Map } from 'immutable';

export class WorkoutList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { sortedWorkouts, workoutRecords } = this.props;

    return (
      <React.Fragment>
        <div className="section-header">Workout List</div>
        <div className="section-content">
          {sortedWorkouts.valueSeq().map(workout => (
            <div key={workout.get('_id')} className="flex-container-row typical-setup border-bottom-white-20">
              <SelectConnected
                className="flex-1 border-right-white-20"
                onChangeEvent={(event) => {
                  this.props.WorkoutActions.update(workout.set('focus', event.target.value));
                }}
                value={workout.get('focus')}
                options={['chest', 'shoulder', 'arm', 'leg', 'waist', 'ab', 'aerobic']}
              />
              <span role="button" tabIndex="-1" className="flex-3" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'selectedWorkoutId'], workout.get('_id'))}>
                <Input
                  inputName="name"
                  record={workout}
                  actions={this.props.WorkoutActions}
                />
              </span>

              <span className="width-20">
                {workoutRecords.valueSeq().filter(record => record.getIn(['workout', '_id']) === workout.get('_id')).count() === 0 && (
                  <i
                    role="button" tabIndex="-1"
                    className="fa fa-fw fa-close" onClick={(_) => {
                      this.props.WorkoutActions.deleteRecord(workout);
                    }}
                  />
                )}
              </span>
            </div>))}

          <div className="flex-container-row pinned-bottom border-top">
            <InputNewConnected
              inputName="name"
              actions={this.props.WorkoutActions}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

WorkoutList.defaultProps = {
  sortedWorkouts: Map(),
  workoutRecords: Map(),
};

WorkoutList.propTypes = {
  sortedWorkouts: PropTypes.object,
  workoutRecords: PropTypes.object,

  UiActions: PropTypes.object.isRequired,
  WorkoutActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    sortedWorkouts: workoutsSortedByFocusSelector(state),
    workoutRecords: state.workoutRecords,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    WorkoutActions: bindActionCreators(WorkoutActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);
