import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Map } from 'immutable';
import moment from 'moment-timezone';

import { Grid } from 'semantic-ui-react';
import MonthlyTasksListConnected from './MonthlyTasksList';
import DailyTasksListConnected from './DailyTasksList';


export class RightAside extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeMonth: moment().tz('Asia/Tokyo').month(),
      todayMoment: moment().tz('Asia/Tokyo').startOf('day'),
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  // filter(dayVal => !dayVal.isPast || dailyTasks.has(dayVal.dayOfYearString)

  createMonthlyList = () => {
    const { todayMoment } = this.state;
    const monthList = [];
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
          isPast: dayMomentObject.valueOf() < todayMoment.valueOf(),
          isWeekend: dayMomentObject.day() === 0 || dayMomentObject.day() === 6,
        });
      }
      monthList.push(currentMonth);
    }

    return monthList;
  }

  render() {
    const { activeMonth } = this.state;
    const monthList = this.createMonthlyList();

    return (
      <Grid.Row>
        <Grid.Column>
          <span className="flex-container-row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
              <div
                key={month}
                role="button" tabIndex="-1"
                className={`flex-1 ${activeMonth === month - 1 && 'color-orange font-400'}`}
                onClick={_ => this.setState({
                  activeMonth: month - 1,
                })}
              >
                {month}
              </div>))}
          </span>

          <MonthlyTasksListConnected activeMonth={activeMonth} />

          {monthList[activeMonth].map(dayVal => (
            <DailyTasksListConnected
              key={dayVal.dayMomentObject.unix()}
              dayVal={dayVal}
            />
          ))}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default RightAside;
