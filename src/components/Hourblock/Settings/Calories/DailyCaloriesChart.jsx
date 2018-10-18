import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import Highcharts from 'highcharts';
// import { UiActions } from 'utility-redux/common/ui';

import { dailyRecordByDayOfYearSortedRecencySelector } from 'utility-redux/hourblock/dailyRecord';

export class DailyCaloriesChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.seriesData = [{ name: 'total', data: [] }];
    this.xAsixDates = [];
  }

  componentDidMount() {
    this.updateChartData();
  }

  getDailyTotalCalories = (dailyRecord) => {
    let totalTotalCalorie = 0;
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((meal) => {
      if (dailyRecord.hasIn(['calorie', meal])) {
        dailyRecord.getIn(['calorie', meal]).forEach((item) => {
          totalTotalCalorie += item.get('calorie');
        });
      }
    });
    return totalTotalCalorie;
  }

  updateChartData = () => {
    this.seriesData = [{ name: 'total', data: [] }];
    this.xAsixDates = [];

    const { dailyRecordsSortedRecency } = this.props;

    if (dailyRecordsSortedRecency.size) {
      // Only show recent month data
      dailyRecordsSortedRecency.valueSeq().filter(record => moment().tz('Asia/Tokyo').add(-30, 'day').unix() < moment(record.get('startedAt')).unix()).forEach((record) => {
        this.xAsixDates.unshift(moment(record.get('startedAt')).tz('Asia/Tokyo').format('MM-DD'));
        this.seriesData[0].data.unshift(this.getDailyTotalCalories(record));
      });
    }

    if (document.getElementById('chart') !== null) {
      Highcharts.chart('chart', {
        // chart: {
        //   type: 'column',
        // },

        title: {
          text: '',
        },

        xAxis: {
          categories: this.xAsixDates,
        },

        yAxis: {
          min: 0,
          // max: 500,
          title: {
            text: '',
          },
          labels: {
            format: '{value}',
          },
        },

        legend: {
          enabled: false,
        },

        series: this.seriesData,
      });
    }
  }

  render() {
    this.updateChartData();

    return (
      <div id="chart" className="flex-1" data-role="dailycalories-chart" />
    );
  }
}

DailyCaloriesChart.defaultProps = {
  dailyRecordsSortedRecency: Map(),
};

DailyCaloriesChart.propTypes = {
  dailyRecordsSortedRecency: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyRecordsSortedRecency: dailyRecordByDayOfYearSortedRecencySelector(state),
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     UiActions: bindActionCreators(UiActions, dispatch),
//   };
// }

export default connect(mapStateToProps)(DailyCaloriesChart);
