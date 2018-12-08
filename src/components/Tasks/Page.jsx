import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Map } from 'immutable';
import moment from 'moment-timezone';

import { Grid } from 'semantic-ui-react';
import WeeklyTasksListConnected from './WeeklyTasksList';
import YearlyTasksListConnected from './YearlyTasksList';
import DailyTaskPlanningConnected from './DailyTasks/List';

export class RightAside extends React.Component {
  // constructor(props, context) {
  //   super(props, context);

  //   this.state = {
  //     // activeMonth: moment().tz('Asia/Tokyo').month(),
  //     todayMoment: moment().tz('Asia/Tokyo').startOf('day'),
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  // filter(dayVal => !dayVal.isPast || dailyTasks.has(dayVal.dayOfYearString)

  // createMonthlyList = () => {
  //   const { todayMoment } = this.state;
  //   const monthList = [];
  //   for (let i = 0; i < 12; i += 1) {
  //     const currentMonth = [];
  //     for (let j = 0; j < moment().tz('Asia/Tokyo').startOf('year').add(i, 'month')
  //       .daysInMonth(); j += 1) {
  //       const dayMomentObject = moment().tz('Asia/Tokyo').startOf('year').add(i, 'month')
  //         .add(j, 'day');
  //       currentMonth.push({
  //         dayMomentObject,
  //         dayOfYearString: dayMomentObject.dayOfYear().toString(),
  //         weekString: dayMomentObject.isoWeek().toString(),
  //         isPast: dayMomentObject.valueOf() < todayMoment.valueOf(),
  //         isWeekend: dayMomentObject.day() === 0 || dayMomentObject.day() === 6,
  //       });
  //     }
  //     monthList.push(currentMonth);
  //   }

  //   return monthList;
  // }

  render() {
    return (
      <Grid.Row>
        <Grid.Column
          width={6}
          style={{
            overflow: 'auto'
          }}
        >
          <YearlyTasksListConnected />
        </Grid.Column>

        {/* <Grid.Column style={{
          overflow: 'auto'
        }}
        >
          <WeeklyTasksListConnected />
        </Grid.Column> */}

        <Grid.Column
          width={10}
          style={{
            overflow: 'auto'
          }}
        >
          <DailyTaskPlanningConnected />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default RightAside;
