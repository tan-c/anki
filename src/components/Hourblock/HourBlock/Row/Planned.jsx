import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { currentUserSelector } from 'utility-redux/user';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

// import { projectFirstTaskSelector } from 'utility-redux/task';

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

  renderTasks = (isTodayPast, taskFromPomo) => (
    <React.Fragment>
      <span className="flex-3 border-right-white padding-horizontal-5 text-left">
        {!isTodayPast && taskFromPomo}
      </span>

      {/* {!window.isMobile && showMinorTask &&
        <span
          className={`${isTodayPast ? 'bg-white-10' : ''} flex-2 border-right-white padding-horizontal-5 text-left`}
        >
          {minorTask}
        </span>} */}
    </React.Fragment>
  )

  renderMainTaskInput = (mainTask, isTodayPast) => {
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo,
      isUpdatingPlannedPomo, recordPomo
    } = this.props;

    if (recordPomo.has('content')) {
      return (
        <span className="text-left flex-3 border-right-white-20 padding-left-5">
          {recordPomo.get('content')}
        </span>
      );
    }

    return (
      <input
        type="text"
        className={`flex-3 border-right-white-20 ${isTodayPast && 'bg-black'}`}
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
        className={`flex-2 border-right-white-20 ${isTodayPast && 'bg-black'}`}
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
        className={`${isTodayPast ? 'bg-black' : ''} ${window.isMobile ? 'flex-1' : 'width-200'} border-right-white`}
        name="tasks.recur"
        disabled={!enableChangeRecur || isTodayPast}
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
      // projectFirstTask,
    } = this.props;

    // const mainTaskLocked = plannedPomo.has('mainTaskLocked') && plannedPomo.get('mainTaskLocked');
    const isTodayPast = isToday && currentSectionOfDay > sectionOfDay;
    const disableMainTaskInput = isToday && currentSectionOfDay > sectionOfDay;

    const showMinorTask = currentUser.hasIn(['config', 'showMinorTask']) && currentUser.getIn(['config', 'showMinorTask']);
    const currentPlannedPomoTask = allProjectTasksOrdered.hasIn([plannedPomo.getIn(['project', '_id']), 0]) ? allProjectTasksOrdered.getIn([plannedPomo.getIn(['project', '_id']), 0]) : Map();

    const taskContent = currentPlannedPomoTask.has('taskName') ? currentPlannedPomoTask.get('taskName') : '';
    // const isUnFinished = !recordPomo.hasIn(['project', '_id']) && isTodayPast;

    return (
      <React.Fragment>
        {window.isMobile
          && (
            <div className="flex-container flex-1">
              <div className="flex-container-row flex-1">
                <span className="border-right-white height-lineheight-30 width-50">
                  {sectionName}
                </span>

                {disableMainTaskInput === true && this.renderTasks(isTodayPast, taskContent, minorTask)}

                {disableMainTaskInput !== true && this.renderMainTaskInput(mainTask, isTodayPast)}
              </div>

              <div className="flex-container-row flex-1">
                <ProjectSelectConnected
                  className="width-30 border-right-white"
                  value={plannedPomo.getIn(['project', '_id'])}
                  onChangeEvent={event => onChangePlannedPomo(sectionOfDay, plannedPomo, event)}
                  color={plannedPomo.getIn(['project', 'category', 'color'])}
                />
                {this.renderRecurTaskInput(isTodayPast)}
              </div>
            </div>
          )
        }

        {!window.isMobile
          && (
            <React.Fragment>
              <span className="border-right-white width-50 height-lineheight-30">
                {sectionName}
              </span>

              {!isTodayPast && (
                <ProjectSelectConnected
                  className="width-80 border-right-white height-lineheight-30"
                  value={plannedPomo.getIn(['project', '_id'])}
                  onChangeEvent={event => onChangePlannedPomo(sectionOfDay, plannedPomo, event)}
                  color={plannedPomo.getIn(['project', 'category', 'color'])}
                />
              )}

              {isTodayPast
              && (
                <span className="width-80 border-right-white height-lineheight-30" style={{ backgroundColor: plannedPomo.getIn(['project', 'category', 'color']) }}>
                  {plannedPomo.getIn(['project', 'name'])}
                </span>
              )
              }

              <div className="flex-1 flex-container-row">
                {/* {this.renderTasks(isTodayPast, taskContent)} */}
                {this.renderMainTaskInput(mainTask, isTodayPast)}
                {showMinorTask && this.renderMinorTaskInput(minorTask, isTodayPast)}
                {this.renderRecurTaskInput(isTodayPast)}
              </div>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

HourBlockRowPlanned.defaultProps = {
  currentUser: Map(),
  currentSectionOfDay: 0,
  sectionOfDay: 0,
  sectionName: '',
  plannedPomo: Map(),
  recordPomo: Map(),
  onChangePlannedPomo: () => { },
  // projectFirstTask: Map(),
};

HourBlockRowPlanned.propTypes = {
  isToday: PropTypes.bool.isRequired,
  currentSectionOfDay: PropTypes.number,
  currentUser: PropTypes.object,
  sectionOfDay: PropTypes.number,
  sectionName: PropTypes.string,
  plannedPomo: PropTypes.object,
  recordPomo: PropTypes.object,
  onChangePlannedPomo: PropTypes.func,
  isUpdatingPlannedPomo: PropTypes.bool.isRequired,
  allProjectTasksOrdered: PropTypes.object.isRequired,
  // projectFirstTask: PropTypes.object,
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
    // projectFirstTask: projectFirstTaskSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(HourBlockRowPlanned);
