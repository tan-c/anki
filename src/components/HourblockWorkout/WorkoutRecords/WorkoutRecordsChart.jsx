import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import Highcharts from 'highcharts';
// import { UiActions } from 'utility-redux/ui';

import { selectedWorkoutRecordsSortedSelector } from 'utility-redux/workoutRecord';

export class WorkoutRecordsChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.seriesData = [{ name: 'total', data: [] }];
    this.xAsixDates = [];
  }

  componentDidMount() {
    this.updateChartData();
  }

  // Separate function so that it would update when prop changes
  // But highlight should only link up after component has loaded
  updateChartData = () => {
    if (this.props.selectedWorkoutRecordsSorted.size) {
      const { selectedWorkoutRecordsSorted } = this.props;

      this.seriesData = [{ name: 'total', data: [] }];
      this.xAsixDates = [];

      selectedWorkoutRecordsSorted.forEach((workoutRecord) => {
        this.xAsixDates.unshift(moment(workoutRecord.get('startedAt')).tz('Asia/Tokyo').format('MM-DD'));
        this.seriesData[0].data.unshift(workoutRecord.get('rep') * workoutRecord.get('value'));
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
        // align: 'right',
        // x: -30,
        // verticalAlign: 'top',
        // y: 25,
        // floating: true,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        // shadow: false,
        },

        // plotOptions: {
        //   series: {
        //     label: {
        //       connectorAllowed: false,
        //     },
        //   },
        // },

        series: this.seriesData,
      });
    }
  }

  render() {
    this.updateChartData();

    return (
      <div id="chart" className="flex-1" data-role="workoutrecords-chart" />
    );
  }
}

WorkoutRecordsChart.defaultProps = {
  selectedWorkoutRecordsSorted: Map(),
};

WorkoutRecordsChart.propTypes = {
  selectedWorkoutRecordsSorted: PropTypes.object,
  // UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    selectedWorkoutRecordsSorted: selectedWorkoutRecordsSortedSelector(state),
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     UiActions: bindActionCreators(UiActions, dispatch),
//   };
// }

export default connect(mapStateToProps)(WorkoutRecordsChart);
