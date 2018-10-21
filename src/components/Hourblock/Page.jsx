import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
// import { Map } from 'immutable';
import { currentUserSelector } from 'utility-redux/user';
import { totalProjectTasksCountSelector } from 'utility-redux/task';
import DailyRecordsChartConnected from './DailyRecordsChart';
// import { UiActions } from 'utility-redux/ui';

import HourBlockListConnected from './List';

import EventDetailsConnected from './ExtraSection/Event/Details';

import ProjectTaskListConnected from './ExtraSection/Task/ProjectTaskList';
import FocusedProjectTaskListConnected from './ExtraSection/Task/FocusedProjectTaskList';

import DailyWorkoutRecordsDetailsConnected from './ExtraSection/Daily/WorkoutRecordsDetails';
import DailyCalorieDetailsConnected from './ExtraSection/Daily/CalorieDetails';
import DailySleepDetailsConnected from './ExtraSection/Daily/SleepDetails';
import DailyMeasurementsConnected from './ExtraSection/Daily/Measurements';
import CategoryInsightsConnected from './LeftAside/CategoryInsights';
import WeeklyInsightsConnected from './LeftAside/WeeklyInsights';

import RightAsideConnected from './RightAside';
import FooterConnected from './Footer';

export class HourBlockPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showingItemType: 'daily',
      dayObjectOffset: 0,
      // NOTE - This should be based on localtimezone
      dayMomentObject: moment().startOf('day'),
    };
  }

  updateDayMomentObject = (offset) => {
    const { dayObjectOffset } = this.state;
    const newDayObjectOffset = offset === 0 ? offset : dayObjectOffset + offset;
    this.setState({
      dayObjectOffset: newDayObjectOffset,
      // NOTE - This should be based on localtimezone
      dayMomentObject: moment().startOf('day').add(newDayObjectOffset, 'day'),
    });
  }

  // {loadingPomoList &&
  //   <div className="loading-spinner">
  //     <i className="fa fa-cog fa-spin fa-1x fa-fw" />
  //   </div>
  // }

  renderHourBlockList = () => {
    const { dayMomentObject } = this.state;
    return (
      <Fragment>
        {!window.isMobile && (
          <div className="bg-white-20 height-40 flex-container-row">
            <span
              className={`flex-1 text-left height-40 line-height-40 font-400 font-24 margin-left-10 ${dayMomentObject.dayOfYear() === moment().dayOfYear() ? 'color-green' : ''}`}
            >
              {dayMomentObject.format('YYYY-MM-DD ddd')}
              {' '}
              - W
              {dayMomentObject.isoWeek()}
            </span>

            <div className="flex-1 text-right margin-right-10">
              <div className="font-400 color-green height-20 line-height-20">QUICK LINK</div>
              <br />
              <div className="height-20 line-height-20">
                <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(-1)}>Last Day</span>
                <span>|</span>
                <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(0)}>Today</span>
                <span>|</span>
                <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(1)}>Next Day</span>
              </div>
            </div>
          </div>
        )}

        <HourBlockListConnected dayMomentObject={dayMomentObject} />
      </Fragment>
    );
  }

  renderRightSection = () => {
    const { dayMomentObject, showingItemType } = this.state;
    const { totalProjectTasksCount } = this.props;

    return (
      <Fragment>
        <span className="flex-container-row typical-setup border-green">
          <span
            className={`flex-1 ${showingItemType === 'tasks' ? 'bg-green' : ''} ${showingItemType === 'tasks' && totalProjectTasksCount > 0 ? 'bg-red' : ''}`}
            role="button"
            tabIndex="-1"
            onClick={_ => this.setState({ showingItemType: 'tasks' })}
          >
            {`Task - ${totalProjectTasksCount}`}
          </span>
          <span
            className={`border-right-green flex-1 ${showingItemType === 'daily' && 'bg-green'}`} role="button" tabIndex="-1"
            onClick={_ => this.setState({ showingItemType: 'daily' })}
          >
            Daily
          </span>
          <span
            className={`border-right-green flex-1 ${showingItemType === 'gym' && 'bg-green'}`} role="button" tabIndex="-1"
            onClick={_ => this.setState({ showingItemType: 'gym' })}
          >
            Gym
          </span>
        </span>

        {showingItemType === 'tasks'
          && (
            <React.Fragment>
              <section className="flex-1">
                <ProjectTaskListConnected />
              </section>
              <section className="flex-1">
                <FocusedProjectTaskListConnected />
              </section>
            </React.Fragment>
          )
        }

        {showingItemType === 'daily'
          && (
            <React.Fragment>
              <section className="flex-2">
                <DailyMeasurementsConnected dayMomentObject={dayMomentObject} showingItemType={showingItemType} />
                <DailySleepDetailsConnected dayMomentObject={dayMomentObject} />
                <div className="spacing-10" />
                <DailyCalorieDetailsConnected dayMomentObject={dayMomentObject} />
              </section>
              {!window.isMobile && <DailyRecordsChartConnected />}
            </React.Fragment>
          )

        }

        {showingItemType === 'gym'
          && (
            <section className="flex-2">
              <DailyMeasurementsConnected dayMomentObject={dayMomentObject} showingItemType={showingItemType} />
              <div className="spacing-10" />
              <DailyWorkoutRecordsDetailsConnected dayMomentObject={dayMomentObject} />
            </section>
          )
        }

        {!window.isMobile && <EventDetailsConnected />}
      </Fragment>
    );
  }

  render() {
    const { showTaskSection } = this.props;

    if (window.isMobile) {
      return (
        <div className="flex-container page" data-role="hourblock-page">
          {showTaskSection && (
            <section className="flex-container flex-1 no-bg">
              {this.renderRightSection()}
            </section>
          )}

          <section className="flex-1">
            {this.renderHourBlockList()}
          </section>
        </div>
      );
    }

    return (
      <main id="hourblock">
        <aside id="left-menu" className={`${window.isMobile && 'mobile'}`}>
          <CategoryInsightsConnected />
          <WeeklyInsightsConnected />
        </aside>

        <RightAsideConnected />
        <FooterConnected />

        <div
          className="flex-container-row page" data-role="hourblock-page"
        >
          <section className="flex-5">
            {this.renderHourBlockList()}
          </section>

          {showTaskSection && (
            <section className="flex-container flex-2 no-bg">
              {this.renderRightSection()}
            </section>
          )}
        </div>
      </main>
    );
  }
}

HourBlockPage.defaultProps = {
  showTaskSection: false,
  totalProjectTasksCount: 0
};

HourBlockPage.propTypes = {
  showTaskSection: PropTypes.bool,
  totalProjectTasksCount: PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  return {
    showTaskSection: currentUserSelector(state).hasIn(['config', 'showTaskSection']) && currentUserSelector(state).getIn(['config', 'showTaskSection']),
    totalProjectTasksCount: totalProjectTasksCountSelector(state),
  };
}

export default connect(mapStateToProps)(HourBlockPage);
