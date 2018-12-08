import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

// import { TaskActions } from 'utility-redux/task';
import { selectableEventsSortedByProjectThenCategorySelector } from 'utility-redux/event';
import { currentUserSelector } from 'utility-redux/user';
import { UiActions } from 'utility-redux/ui';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

export class HourBlockRowRecord extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    Object.keys(nextProps).forEach((key) => {
      if (JSON.stringify(this.props[key]) !== JSON.stringify(nextProps[key])) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  render() {
    const {
      recordPomo,
      plannedPomo,
      sectionOfDay, events,
      eventRecords, addPomoRecord,
      addEventToRecord, deleteEvent,
      showEventsInPomo,
      // allProjectTasksOrdered,
      isUpdatingPlannedPomo,

      isToday, currentSectionOfDay
    } = this.props;

    const isTodayFuture = isToday && currentSectionOfDay <= sectionOfDay;

    // const currentPlannedPomoTask = allProjectTasksOrdered.hasIn([plannedPomo.getIn(['project', '_id']), 0]) ? allProjectTasksOrdered.getIn([plannedPomo.getIn(['project', '_id']), 0]) : Map();

    // const mainTask = plannedPomo.hasIn(['tasks', 'main']) ? plannedPomo.getIn(['tasks', 'main']) : '';
    // const projectId = recordPomo.hasIn(['project', '_id']) ? recordPomo.getIn(['project', '_id']) : '';
    // const plannedProjectId = plannedPomo.hasIn(['project', '_id']) ? plannedPomo.getIn(['project', '_id']) : '';

    return (
      <React.Fragment>
        <span
          className="flex-1 flex-container-row border-right-white-20"

        >
          {(plannedPomo.hasIn(['project', '_id']) && !recordPomo.hasIn(['project', '_id']))
            ? (
              <React.Fragment>
                {/* !isTodayFuture && */}
                <i
                  role="button"
                  tabIndex="-1"
                  className="fa fa-fw fa-check flex-1 height-lineheight-30"
                  onClick={(_) => {
                    // Close the main subtask
                    addPomoRecord({
                      target: {
                        value: plannedPomo.getIn(['project', '_id']),
                        isCompliant: true,
                        content: `${plannedPomo.getIn(['tasks', 'main'])} ${plannedPomo.hasIn(['tasks', 'recur']) ? plannedPomo.getIn(['tasks', 'recur']) : ''}`
                      },
                    }, sectionOfDay);
                  }
                  }
                />

                <i
                  role="button"
                  tabIndex="-1"
                  className="fa fa-fw fa-close flex-1 height-lineheight-30"
                  onClick={_ => addPomoRecord({
                    target: {
                      value: '5a080c8597ae233e973d5399', // FIXME: hard coding Misc id for now...
                      isCompliant: false,
                      content: plannedPomo.getIn(['tasks', 'main'])
                    },
                  }, sectionOfDay)}
                />
              </React.Fragment>
            )
            : (
              <span className="flex-1" style={{ backgroundColor: recordPomo.size ? recordPomo.getIn(['project', 'category', 'color']) : '' }}>
                {!isUpdatingPlannedPomo && (
                  <ProjectSelectConnected
                    value={recordPomo.size ? recordPomo.getIn(['project', '_id']) : ''}
                    onChangeEvent={event => addPomoRecord(event, sectionOfDay)}
                  />
                )}
              </span>
            )
          }
        </span>

        {showEventsInPomo
          && (
            <React.Fragment>
              <span className="flex-2 text-left border-right">
                {recordPomo.size > 0 && recordPomo.get('events').map(rec => (
                  <span
                    role="button" tabIndex="-1" className="margin-right-5" key={rec.get('_id')}
                    onClick={_ => this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'selectedEventRecordId'], rec)}
                  >
                    <span>
                      {eventRecords.getIn([rec, 'event', 'name'])}
                    </span>
                    <i
                      role="button"
                      tabIndex="-1"
                      className="fa fa-fw fa-close"
                      onClick={_ => deleteEvent(rec, sectionOfDay)}
                    />
                  </span>
                ))}
              </span>

              <span className="text-left width-40">
                {recordPomo.size > 0
                  && (
                    <select
                      type="text"
                      name="project"
                      onChange={event => addEventToRecord(event, sectionOfDay)}
                    >
                      <option value="" />
                      {events.valueSeq().map((event, index) => (
                        <option
                          key={event.get('_id')}
                          value={event.get('_id')}
                        >
                          {event.get('project') !== null ? event.getIn(['project', 'name']) : 'General'}
                          {' '}
                          -
                          {event.get('name')}
                        </option>))}
                    </select>
                  )}
              </span>
            </React.Fragment>
          )
        }

      </React.Fragment>
    );
  }
}

HourBlockRowRecord.defaultProps = {
  isToday: false,
  currentSectionOfDay: 0,

  showEventsInPomo: false,
  isUpdatingPlannedPomo: false,

  sectionOfDay: -1,
  plannedPomo: Map(),
  recordPomo: Map(),
  addPomoRecord: () => { },
  addEventToRecord: () => { },
  deleteEvent: () => { },
  events: Map(),
  eventRecords: Map(),
};

HourBlockRowRecord.propTypes = {
  isToday: PropTypes.bool,
  currentSectionOfDay: PropTypes.number,
  sectionOfDay: PropTypes.number,

  showEventsInPomo: PropTypes.bool,

  isUpdatingPlannedPomo: PropTypes.bool,
  plannedPomo: PropTypes.object,
  recordPomo: PropTypes.object,
  addPomoRecord: PropTypes.func,
  addEventToRecord: PropTypes.func,
  deleteEvent: PropTypes.func,
  events: PropTypes.object,
  eventRecords: PropTypes.object,
  // allProjectTasksOrdered: PropTypes.object.isRequired,

  UiActions: PropTypes.object.isRequired,
  // TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isToday: ownProps.isToday,
    currentSectionOfDay: ownProps.currentSectionOfDay,
    sectionOfDay: ownProps.sectionOfDay,

    showEventsInPomo: currentUserSelector(state).hasIn(['config', 'showEventsInPomo']) && currentUserSelector(state).getIn(['config', 'showEventsInPomo']),

    isUpdatingPlannedPomo: ownProps.isUpdatingPlannedPomo,
    plannedPomo: ownProps.plannedPomo,
    recordPomo: ownProps.recordPomo,
    addPomoRecord: ownProps.addPomoRecord,
    addEventToRecord: ownProps.addEventToRecord,
    deleteEvent: ownProps.deleteEvent,
    // currentPlannallProjectTasksOrderededPomoTask: ownProps.allProjectTasksOrdered,
    events: selectableEventsSortedByProjectThenCategorySelector(state, ownProps.recordPomo),
    selectedEventRecordId: state.ui.getIn(['hourblock', 'hourblockPage', 'selectedEventRecordId']),
    eventRecords: state.eventRecords,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    // TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HourBlockRowRecord);
