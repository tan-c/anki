import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import { Map } from 'immutable';
// import toastr from 'toastr';

import { UiActions } from 'utility-redux/common/ui';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';
import { overduedTasksSelector } from 'utility-redux/hourblock/task';

// import { currentUserSelector } from 'utility-redux/common/user';

export class SubHeader extends React.Component {
  // state = {
  //   subscription: navigator.serviceWorker.customizedContent === undefined ? null : navigator.serviceWorker.customizedContent.subscription,
  // }

  render() {
    const {
      location, selectedProjectId,
      updatingRecurTask, edittingTarget,
      isSettingOn, showMonthlyCalendar,
      overduedTasksCount
    } = this.props;

    // const { subscription } = this.state;

    // const currentApp = currentUser.hasIn(['config', 'recentApp']) ? currentUser.getIn(['config', 'recentApp']) : '';

    return (
      <div data-role="subheader" id="subheader" className={`flex-container-row ${window.isMobile && 'mobile'}`}>
        <div id="subheader-links" className="flex-3 text-left">
          {location.pathname.indexOf('planning') > -1
            && (
              <React.Fragment>
                <span className="width-100">
                  <ProjectSelectConnected
                    onChangeEvent={event => this.props.UiActions.updateIn(['hourblock', 'planningPage', 'selectedProjectId'], event.target.value)}
                    value={selectedProjectId}
                    color=""
                  />
                </span>

                <span role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'planningPage', 'updatingRecurTask'], !updatingRecurTask)}>
                Set Recur Task
                </span>
              </React.Fragment>
            )
          }

          {location.pathname.indexOf('settings') > -1
            && (
              <React.Fragment>
                <span className={`${edittingTarget === 'events' && 'active'}`} role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'events')}>Edit Events</span>

                <span className={`${edittingTarget === 'workouts' && 'active'}`} role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'workouts')}>Edit Workouts</span>

                <span className={`${edittingTarget === 'calories' && 'active'}`} role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'calories')}>Edit Measurement</span>

                <span className={`${edittingTarget === 'projects' && 'active'}`} role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'projects')}>Edit Categories/Projects</span>

                <span className={`${edittingTarget === 'dailyPomoCount' && 'active'}`} role="menuitem" tabIndex="-1" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'dailyPomoCount')}>Show Daily Pomo</span>
              </React.Fragment>
            )
          }
        </div>

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-calendar ${showMonthlyCalendar && 'color-green'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'showMonthlyCalendar'], !showMonthlyCalendar);
          }}
        />

        {overduedTasksCount > 0 && (
          <span className="bg-red">
            {overduedTasksCount}
            {' '}
            {'Tasks'}
          </span>
        )}


        {/* {!window.isMobile
        && (
          <i
            role="button"
            tabIndex="-1"
            className={`line-height-30 width-20 fa fa-fw fa-bullhorn ${Notification.permission === 'denied' ? 'color-red' : 'color-green'}`}
            onClick={(_) => {
            }}
          />
        )
        } */}

        {/* <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-rss ${subscription && subscription.endpoint !== undefined && 'color-green'}`}
        /> */}

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-cog ${isSettingOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isSettingOn'], !isSettingOn);
          }}
        />
      </div>
    );
  }
}

SubHeader.defaultProps = {
  overduedTasksCount: 0,

  selectedProjectId: '',
  edittingTarget: 'events',

  updatingRecurTask: false,
  showMonthlyCalendar: true,
  isSettingOn: false,
};

SubHeader.propTypes = {
  overduedTasksCount: PropTypes.number,

  location: PropTypes.object.isRequired,
  updatingRecurTask: PropTypes.bool,
  selectedProjectId: PropTypes.string,
  edittingTarget: PropTypes.string,
  isSettingOn: PropTypes.bool,
  showMonthlyCalendar: PropTypes.bool,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // currentUser: currentUserSelector(state),
    overduedTasksCount: overduedTasksSelector(state),

    selectedProjectId: state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']),
    updatingRecurTask: state.ui.getIn(['hourblock', 'planningPage', 'updatingRecurTask']),
    edittingTarget: state.ui.getIn(['hourblock', 'settingsPage', 'edittingTarget']),
    showMonthlyCalendar: state.ui.getIn(['hourblock', 'hourblockPage', 'showMonthlyCalendar']),
    isSettingOn: state.ui.getIn(['common', 'isSettingOn']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOtherApp: (newApp, currentUser) => dispatch({ // Will only work once as sagas not in while loop
      type: `GET_${newApp.toUpperCase()}_RESOURCES`,
      currentUser: currentUser.toJS()
    }),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
