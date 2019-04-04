import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

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
      sectionOfDay,
      addPomoRecord,
      isUpdatingPlannedPomo,

      isToday, currentSectionOfDay
    } = this.props;

    const isTodayFuture = isToday && currentSectionOfDay <= sectionOfDay;

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
      </React.Fragment>
    );
  }
}

HourBlockRowRecord.defaultProps = {
  isToday: false,
  currentSectionOfDay: 0,

  isUpdatingPlannedPomo: false,

  sectionOfDay: -1,
  plannedPomo: Map(),
  recordPomo: Map(),
  addPomoRecord: () => { },
};

HourBlockRowRecord.propTypes = {
  isToday: PropTypes.bool,
  currentSectionOfDay: PropTypes.number,
  sectionOfDay: PropTypes.number,

  isUpdatingPlannedPomo: PropTypes.bool,
  plannedPomo: PropTypes.object,
  recordPomo: PropTypes.object,
  addPomoRecord: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    isToday: ownProps.isToday,
    currentSectionOfDay: ownProps.currentSectionOfDay,
    sectionOfDay: ownProps.sectionOfDay,

    isUpdatingPlannedPomo: ownProps.isUpdatingPlannedPomo,
    plannedPomo: ownProps.plannedPomo,
    recordPomo: ownProps.recordPomo,
    addPomoRecord: ownProps.addPomoRecord,
    selectedEventRecordId: state.ui.getIn(['hourblock', 'hourblockPage', 'selectedEventRecordId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    // TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HourBlockRowRecord);
