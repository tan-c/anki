import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Icon
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
// import { PlannedPomoActions } from 'utility-redux/plannedPomo';
import { currentUserSelector } from 'utility-redux/user';
import { Map } from 'immutable';
import toastr from 'toastr';

export class PlanningItem extends React.Component {
  render() {
    const {
      day,
      hourblock,
      plannedPomo,
      updatingRecurTask,
      updatingPlannedPomo,
      updatePlannedPomo,
      updateRecurTask,
      currentUser
    } = this.props;

    // When the item is locked and unlock is in the future
    // This item should not be editable
    const isDisabledDueToLock = currentUser.hasIn(['config', 'planning', 'nextUnlockTime']) && new Date(currentUser.getIn(['config', 'planning', 'nextUnlockTime'])) > new Date().getTime() && plannedPomo.get('isLocked');

    return (
      <div
        data-role="planning-item"
        className="flex-4 margin-right-1 line-height-25 flex-container-row"
        style={{ backgroundColor: `${(plannedPomo !== null && updatingPlannedPomo) ? 'grey' : plannedPomo.getIn(['project', 'category', 'color'])}` }}
      >
        {!updatingRecurTask
          && (
            <React.Fragment>
              <span
                role="button"
                tabIndex="-1"
                className="flex-1"
                disabled={updatingPlannedPomo}
                onClick={(_) => {
                  if (!isDisabledDueToLock) {
                    updatePlannedPomo(hourblock, day);
                  } else {
                    toastr.info('You can only unlock when the lock has expired');
                  }
                }}
              >
                {plannedPomo.getIn(['project', 'name'])}
              </span>

              {plannedPomo.hasIn(['project', 'name']) && (
                <React.Fragment>
                  <Icon
                    name="close"
                    onClick={(_) => {
                      if (!isDisabledDueToLock) {
                        updatePlannedPomo(hourblock, day, {
                          isDeleting: true
                        });
                      } else {
                        toastr.info('You can only unlock when the lock has expired');
                      }
                    }}
                  />
                  <Icon
                    name="lock"
                    style={{
                      // opacity: isDisabledDueToLock ? 0.5 : 1,
                      color: plannedPomo.get('isLocked') ? 'red' : 'white'
                    }}
                    onClick={(_) => {
                      // You can only unlock when you have not locked
                      if (!plannedPomo.get('isLocked') || !isDisabledDueToLock) {
                        updatePlannedPomo(hourblock, day, {
                          isUpdatedLocked: true
                        });
                      } else {
                        toastr.info('You can only unlock when the lock has expired');
                      }
                    }
                    }
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )
        }

        {updatingRecurTask
          && (
            <input
              className="white-placeholder"
              type="text"
              name="tasks.recur"
              ref={(ref) => { this.ref = ref; }}
              placeholder={plannedPomo.getIn(['tasks', 'recur']) || ''}
              onKeyDown={(event) => {
                updateRecurTask(event, day, hourblock);
                if (event.which === 13) {
                  this.ref.value = '';
                }
              }}
            />
          )
        }
      </div>);
  }
}

PlanningItem.defaultProps = {
  currentUser: Map(),
  day: 0,
  hourblock: 0,
  updatingRecurTask: false,
  updatingPlannedPomo: false,

  updatePlannedPomo: () => { },
  updateRecurTask: () => { },
};

PlanningItem.propTypes = {
  currentUser: PropTypes.object,
  day: PropTypes.number,
  hourblock: PropTypes.number,
  plannedPomo: PropTypes.object.isRequired,
  updatingRecurTask: PropTypes.bool,
  updatingPlannedPomo: PropTypes.bool,

  updatePlannedPomo: PropTypes.func,
  updateRecurTask: PropTypes.func,
  // PlannedPomoActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: currentUserSelector(state),

    day: ownProps.day,
    hourblock: ownProps.hourblock,
    plannedPomo: ownProps.plannedPomo,
    updatingRecurTask: state.ui.getIn(['hourblock', 'planningPage', 'updatingRecurTask']),
    updatingPlannedPomo: state.ui.getIn(['hourblock', 'planningPage', 'updatingPlannedPomo']),

    updatePlannedPomo: ownProps.updatePlannedPomo,
    updateRecurTask: ownProps.updateRecurTask,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // PlannedPomoActions: bindActionCreators(PlannedPomoActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningItem);
