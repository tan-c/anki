import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { currentUserSelector } from 'utility-redux/user';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';
import { TaskActions } from 'utility-redux/task';
import { bindActionCreators } from 'redux';

import {
  Icon
} from 'semantic-ui-react';
// FIXME: should be using the input controlled here but keydown event is different
// import InputControlled from 'utility-react-component/Form/Input/Controlled';

export class HourBlockRowPlanned extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mainTask: props.plannedPomo.hasIn(['tasks', 'main']) ? props.plannedPomo.getIn(['tasks', 'main']) : '',
      minorTask: props.plannedPomo.hasIn(['tasks', 'minor']) ? props.plannedPomo.getIn(['tasks', 'minor']) : '',
      // recurTask: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    ['main', 'minor'].forEach((t) => {
      if (nextProps.plannedPomo.hasIn(['tasks', t]) && nextProps.plannedPomo.getIn(['tasks', t]) !== this.state[`${t}Task`]) {
        this.setState({
          [`${t}Task`]: nextProps.plannedPomo.getIn(['tasks', t]),
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    Object.keys(nextProps).forEach((key) => {
      if (JSON.stringify(this.props[key]) !== JSON.stringify(nextProps[key])) {
        shouldUpdate = true;
      }
    });

    Object.keys(nextState).forEach((key) => {
      if (JSON.stringify(this.state[key]) !== JSON.stringify(nextProps[key])) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  renderProjectTask = () => {
    const {
      allProjectTasksOrdered,
      plannedPomo
    } = this.props;

    const currentPlannedPomoTask = allProjectTasksOrdered.hasIn([plannedPomo.getIn(['project', '_id']), 0]) ? allProjectTasksOrdered.getIn([plannedPomo.getIn(['project', '_id']), 0]) : Map();

    return (
      <span className="flex-4 border-right-white text-left flex-container-row">
        <span className="flex-1">
          {
            currentPlannedPomoTask.has('taskName') ? currentPlannedPomoTask.get('taskName') : ''
          }
        </span>

        {currentPlannedPomoTask.hasIn(['task', 'subTasks']) && currentPlannedPomoTask.getIn(['task', 'subTasks']).count() > 0 && (
          <span className="width-20">
            <Icon
              // color="blue"
              name="close"
              onClick={(_) => {
                this.props.TaskActions.update(currentPlannedPomoTask.get('task').deleteIn(['subTasks', '0']), currentPlannedPomoTask.get('task'));
              }}
              style={{
                float: 'right'
              }}
            />
          </span>
        )}
      </span>
    );
  }

  renderMainTaskInput = (mainTask, isTodayPast) => {
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo,
      isUpdatingPlannedPomo, recordPomo
    } = this.props;

    return (
      <span className="text-left flex-2 border-right-white-20 padding-left-5">
        {recordPomo.has('content') ? recordPomo.get('content')
          : (
            <input
              type="text"
              className={`flex-2 border-right-white-20 ${isTodayPast && 'bg-black'}`}
              name="tasks.main"
              ref={(ref) => { this.hourblockPlanneMainInput = ref; }}
              value={mainTask}
              disabled={isUpdatingPlannedPomo || isTodayPast}
              onChange={(event) => {
                this.setState({
                  mainTask: event.target.value,
                });
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  onChangePlannedPomo(sectionOfDay, plannedPomo, event);
                  this.hourblockPlanneMainInput.value = '';
                }
              }}
            />
          )
        }
      </span>
    );
  }

  renderMinorTaskInput = (minorTask, isTodayPast) => {
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo,
      isUpdatingPlannedPomo
    } = this.props;

    return (
      <input
        type="text"
        className={`flex-1 border-right-white-20 ${isTodayPast && 'bg-black'}`}
        name="tasks.minor"
        ref={(ref) => { this.hourblockPlanneMinorInput = ref; }}
        value={minorTask}
        disabled={isUpdatingPlannedPomo}
        onChange={(event) => {
          this.setState({
            minorTask: event.target.value,
          });
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            onChangePlannedPomo(sectionOfDay, plannedPomo, event);
            this.hourblockPlanneMinorInput.value = '';
          }
        }}
      />
    );
  }

  renderRecurTaskInput = (isTodayPast) => {
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo, currentUser,
    } = this.props;

    const enableChangeRecur = currentUser.hasIn(['config', 'enableChangeRecur']) && currentUser.getIn(['config', 'enableChangeRecur']);

    return (
      <input
        type="text"
        className={`${isTodayPast ? 'bg-black' : ''} width-120 border-right-white`}
        name="tasks.recur"
        disabled
        // disabled== {!enableChangeRecur || isTodayPast}
        ref={(ref) => { this.hourblockPlannedRecurInput = ref; }}
        placeholder={plannedPomo.getIn(['tasks', 'recur'])}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            onChangePlannedPomo(sectionOfDay, plannedPomo, event);
            this.hourblockPlannedRecurInput.value = '';
          }
        }}
      />
    );
  }

  render() {
    const { mainTask, minorTask } = this.state;
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo, sectionName,
      currentUser,
      currentSectionOfDay,
      isToday,
      allProjectTasksOrdered,
      recordPomo,
    } = this.props;

    // const mainTaskLocked = plannedPomo.has('mainTaskLocked') && plannedPomo.get('mainTaskLocked');
    const isTodayPast = isToday && currentSectionOfDay > sectionOfDay;
    const disableMainTaskInput = isToday && currentSectionOfDay > sectionOfDay;

    const showMinorTask = currentUser.hasIn(['config', 'showMinorTask']) && currentUser.getIn(['config', 'showMinorTask']);

    // const isUnFinished = !recordPomo.hasIn(['project', '_id']) && isTodayPast;

    return (
      <React.Fragment>
        <span
          className={'width-50 height-lineheight-30}'}
        >
          {sectionName}
        </span>

        <span
          className="width-20"
        >
          <Icon
            name="lock" style={{
              color: plannedPomo.get('isLocked') ? 'red' : 'grey'
            }}
          />
        </span>
        {/* {!isTodayPast && (
          <ProjectSelectConnected
            className="width-80 border-right-white height-lineheight-30"
            value={plannedPomo.getIn(['project', '_id'])}
            onChangeEvent={event => onChangePlannedPomo(sectionOfDay, plannedPomo, event)}
            color={plannedPomo.getIn(['project', 'category', 'color'])}
          />
        )} */}

        {/* {isTodayPast
          && ( */}
        <span
          className="width-80 border-right-white height-lineheight-30" style={{
            backgroundColor: plannedPomo.getIn(['project', 'category', 'color']),
            textAlign: 'center'
          }}
        >
          {plannedPomo.getIn(['project', 'name'])}
        </span>
        {/* )
        } */}

        <div className="flex-1 flex-container-row">
          {this.renderProjectTask()}
          {this.renderMainTaskInput(mainTask, isTodayPast)}
          {showMinorTask && this.renderMinorTaskInput(minorTask, isTodayPast)}
          {this.renderRecurTaskInput(isTodayPast)}
        </div>

      </React.Fragment>
    );
  }
}

HourBlockRowPlanned.defaultProps = {
  isToday: false,

  currentUser: Map(),
  currentSectionOfDay: 0,
  sectionOfDay: 0,
  sectionName: '',
  plannedPomo: Map(),
  recordPomo: Map(),
  onChangePlannedPomo: () => { },

  isUpdatingPlannedPomo: false,
  allProjectTasksOrdered: Map(),
};

HourBlockRowPlanned.propTypes = {
  isToday: PropTypes.bool,
  currentSectionOfDay: PropTypes.number,
  currentUser: PropTypes.object,
  sectionOfDay: PropTypes.number,
  sectionName: PropTypes.string,
  plannedPomo: PropTypes.object,
  recordPomo: PropTypes.object,
  onChangePlannedPomo: PropTypes.func,
  isUpdatingPlannedPomo: PropTypes.bool,
  allProjectTasksOrdered: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    isToday: ownProps.isToday,
    currentSectionOfDay: ownProps.currentSectionOfDay,
    sectionOfDay: ownProps.sectionOfDay,
    sectionName: ownProps.sectionName,
    plannedPomo: ownProps.plannedPomo,
    recordPomo: ownProps.recordPomo,
    onChangePlannedPomo: ownProps.onChangePlannedPomo,
    allProjectTasksOrdered: ownProps.allProjectTasksOrdered,
    currentUser: currentUserSelector(state),
    isUpdatingPlannedPomo: ownProps.isUpdatingPlannedPomo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourBlockRowPlanned);
