import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import { selectedYearlyTaskSelector } from 'utility-redux/task';


import DailyTasksRow from './Row';

export class DailyTasksList extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Note you cannot just add [] as the would be the same object by reference
    this.monthList = [];
    for (let i = 0; i < 12; i += 1) {
      const currentMonth = [];
      for (let j = 0; j < moment().tz('Asia/Tokyo').startOf('year').add(i, 'month')
        .daysInMonth(); j += 1) {
        const dayMomentObject = moment().tz('Asia/Tokyo').startOf('year').add(i, 'month')
          .add(j, 'day');
        currentMonth.push({
          dayMomentObject,
          dayOfYearString: dayMomentObject.dayOfYear().toString(),
          weekString: dayMomentObject.isoWeek().toString(),
          isPast: dayMomentObject.valueOf() < moment().tz('Asia/Tokyo').startOf('day').valueOf(),
          isWeekend: dayMomentObject.day() === 0 || dayMomentObject.day() === 6,
        });
      }
      this.monthList.push(currentMonth);
    }

    this.state = {
      activeMonth: moment().month(),
      showPast: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { selectedYearlyTask } = this.props;
    const { activeMonth, showPast } = this.state;

    return (
      <React.Fragment>
        <span className="flex-container-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
            <div
              className={`flex-1 ${activeMonth === month - 1 && 'color-orange font-400'}`} key={month} role="button" tabIndex="-1"
              onClick={_ => this.setState({
                activeMonth: month - 1,
              })}
            >
              {month}
            </div>))}
        </span>

        {this.monthList[activeMonth].filter(dayVal => dayVal.isPast === showPast).map(dayVal => (
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
};

DailyTasksList.propTypes = {
  selectedYearlyTask: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    selectedYearlyTask: selectedYearlyTaskSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyTasksList);
