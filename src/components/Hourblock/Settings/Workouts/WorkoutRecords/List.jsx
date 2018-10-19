import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map } from 'immutable';
import moment from 'moment-timezone';

import { selectedWorkoutSelector } from 'utility-redux/workout';
import { WorkoutRecordActions } from 'utility-redux/workoutRecord';

import InputNewConnected from 'utility-react-component/Form/Input/New';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import WorkoutRecordsChartConnected from './WorkoutRecordsChart';

export class WorkoutRecordsList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { workoutRecords, selectedWorkout } = this.props;

    return (
      <React.Fragment>
        <section className="flex-2">
          <div className="section-header">
            Workout Records -
            {' '}
            {selectedWorkout.get('name')}
          </div>
          <div className="section-content">
            {workoutRecords.valueSeq().filter(record => record.getIn(['workout', '_id']) === selectedWorkout.get('_id')).map(record => (
              <div key={record.get('_id')} className="height-25 line-height-25 flex-container-row">
                <span className="flex-1">
                  {moment(record.startedAt).format('MM-DD')}
                </span>
                <div className="flex-2">
                  {record.getIn(['workout', 'name'])}
                </div>
                {['rep', 'value', 'set'].map(field => (
                  <Input
                    key={field}
                    inputName={field}
                    inputClassNames="flex-1"
                    record={record}
                    actions={this.props.WorkoutRecordActions}
                  />
                ))}
                <div className="flex-1">
                  {record.get('notes')}
                </div>
                <i role="button" tabIndex="-1" className="fa fa-fw fa-close" onClick={_ => this.props.WorkoutRecordActions.deleteRecord(record)} />
              </div>))}

            <div className="flex-container-row pinned-bottom border-top">
              {selectedWorkout.size > 0
                && (
                  <InputNewConnected
                    inputName="notes"
                    newRecord={{
                      workout: selectedWorkout.get('_id'),
                      startedAt: moment().tz('Asia/Tokyo').startOf('day').toDate(),
                    }}
                    actions={this.props.WorkoutRecordActions}
                  />
                )}
            </div>
          </div>
        </section>

        <section className="flex-1">
          <WorkoutRecordsChartConnected selectedWorkout={selectedWorkout} />
        </section>
      </React.Fragment>
    );
  }
}

WorkoutRecordsList.defaultProps = {
  workoutRecords: Map(),
  selectedWorkout: Map(),
};

WorkoutRecordsList.propTypes = {
  workoutRecords: PropTypes.object,
  selectedWorkout: PropTypes.object,

  WorkoutRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    workoutRecords: state.workoutRecords,
    selectedWorkout: selectedWorkoutSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    WorkoutRecordActions: bindActionCreators(WorkoutRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutRecordsList);
