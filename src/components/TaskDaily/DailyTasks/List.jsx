import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import {
  selectedYearlyTaskSelector,
  dailyTasksSelector
} from 'utility-redux/task';


import DailyTasksRow from './Row';

export class DailyTasksList extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Note you cannot just add [] as the would be the same object by reference
    this.monthList = {};

    // Using from last 3 months onwards
    for (let i = -1; i < 5; i += 1) {
      const currentMonth = [];
      for (let j = 0; j < moment().tz('Asia/Tokyo').startOf('month').add(i, 'month')
        .daysInMonth(); j += 1) {
        const dayMomentObject = moment().tz('Asia/Tokyo').startOf('month').add(i, 'month')
          .add(j, 'day');

        currentMonth.push({
          dayMomentObject,
          dayOfYearString: dayMomentObject.dayOfYear().toString(),
          weekString: dayMomentObject.isoWeek().toString(),
          isPast: dayMomentObject.valueOf() < moment().tz('Asia/Tokyo').startOf('day').valueOf(),
          isWeekend: dayMomentObject.day() === 0 || dayMomentObject.day() === 6,
        });
      }
      this.monthList[i] = currentMonth;
    }
  }

  state = {
    activeMonthIndex: 0,
  };


  render() {
    const {
      selectedYearlyTask,
      dailyTasks
    } = this.props;
    const { activeMonthIndex } = this.state;

    return (
      <React.Fragment>
        <span className="flex-container-row">
          {[-2, -1, 0, 1, 2, 3, 4].map(monthIndex => (
            <div
              className={`flex-1 ${activeMonthIndex === monthIndex && 'color-orange font-400'}`}
              key={monthIndex}
              role="button"
              tabIndex="-1"
              onClick={_ => this.setState({
                activeMonthIndex: monthIndex,
              })}
            >
              {(moment().tz('Asia/Tokyo').month() + 1 + 12 + monthIndex) % 12}
            </div>))}
        </span>

        {this.monthList[activeMonthIndex].filter(dayVal => !dayVal.isPast || (dailyTasks.has(dayVal.dayOfYearString) && dailyTasks.get(dayVal.dayOfYearString).size)).map(dayVal => (
          <DailyTasksRow
            key={dayVal.dayMomentObject.unix()}
            dayVal={dayVal}
            selectedYearlyTask={selectedYearlyTask}
          />
        ))}
      </React.Fragment>
    );
  }
}

DailyTasksList.defaultProps = {
  selectedYearlyTask: Map(),
  dailyTasks: Map(),
};

DailyTasksList.propTypes = {
  dailyTasks: PropTypes.object,
  selectedYearlyTask: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyTasks: dailyTasksSelector(state),
    selectedYearlyTask: selectedYearlyTaskSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyTasksList);
