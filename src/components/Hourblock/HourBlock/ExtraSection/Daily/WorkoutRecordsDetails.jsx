import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import moment from 'moment';
import { Map } from 'immutable';

import SelectConnected from 'utility-react-component/Form/Select';
import Input from 'utility-react-component/Form/Input/Uncontrolled';

import { WorkoutRecordActions, currentWorkoutRecordsAndMostRecentRecordSelector } from 'utility-redux/workoutRecord';
import { workoutsSortedByFocusSelector } from 'utility-redux/workout';

export class DailyWorkoutRecordsDetails extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { sortedWorkouts, currentWorkoutRecords, dayMomentObject } = this.props;

    return (
      <React.Fragment>
        <SelectConnected
          className="flex-container-row typical-setup"
          selectName="workout"
          onChangeEvent={(event) => {
            this.props.WorkoutRecordActions.create({
              workout: event.target.value,
              startedAt: dayMomentObject,
            });
          }}
          options={sortedWorkouts}
          optionSortColumn="focus"
          optionContent={['focus', 'name']}
        />

        { currentWorkoutRecords.valueSeq().map(record => (
          <React.Fragment key={record.getIn(['currentRecord', '_id'])}>
            <div className="flex-container-row typical-setup text-left">
              <span className="flex-6">
                <span className="bg-green width-10">{record.hasIn(['currentRecord', 'workout', 'focus']) && record.getIn(['currentRecord', 'workout', 'focus']).slice(0, 2)}</span>
                {record.getIn(['currentRecord', 'workout', 'name'])}
              </span>
              {['rep', 'value', 'set'].map(field => (
                <Input
                  key={field}
                  inputName={field}
                  inputClassNames="flex-1"
                  record={record.get('currentRecord')}
                  actions={this.props.WorkoutRecordActions}
                />
              ))}
              <i
                role="button" tabIndex="-1"
                className="width-20 fa fa-fw fa-close" onClick={(_) => {
                  this.props.WorkoutRecordActions.deleteRecord(record.get('currentRecord'));
                }}
              />
            </div>

            { record.get('recentRecord') !== null
            && (
              <div className="flex-container-row typical-setup bg-white-10 text-left height-lineheight-20">
                <span className="flex-5" />
                {['rep', 'value', 'set'].map(field => (
                  <span className="flex-1" key={field}>
                    { record.getIn(['recentRecord', field])}
                  </span>))}
                <div className="width-20" />
              </div>
            )
            }
          </React.Fragment>))
        }
      </React.Fragment>
    );
  }
}

DailyWorkoutRecordsDetails.defaultProps = {
  sortedWorkouts: Map(),
  currentWorkoutRecords: Map(),
};

DailyWorkoutRecordsDetails.propTypes = {
  sortedWorkouts: PropTypes.object,
  currentWorkoutRecords: PropTypes.object,
  dayMomentObject: PropTypes.object.isRequired,

  WorkoutRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    sortedWorkouts: workoutsSortedByFocusSelector(state),
    currentWorkoutRecords: currentWorkoutRecordsAndMostRecentRecordSelector(state, ownProps.dayMomentObject),
    dayMomentObject: ownProps.dayMomentObject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    WorkoutRecordActions: bindActionCreators(WorkoutRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyWorkoutRecordsDetails);
