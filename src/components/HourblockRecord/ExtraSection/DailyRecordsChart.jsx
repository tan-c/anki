import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import Highcharts from 'highcharts';

import { dailyRecordByDayOfYearSortedRecencySelector } from 'utility-redux/dailyRecord';
import { categoriesSortedSelector } from 'utility-redux/category';
import { projectsByIdSortedSelector } from 'utility-redux/project';

export class DailyRecordsChart extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  componentDidMount() {
    this.updateChartData();
  }

  // Separate function so that it would update when prop changes
  // But highlight should only link up after component has loaded
  updateChartData = () => {
    // Reset Data First
    this.categoryCount = {};
    this.seriesData = [];
    this.colors = [];
    this.calorieCount = [];
    this.complianceCount = [];
    this.xAsixDates = [];

    this.wakeData = [];
    this.restData = [];

    const {
      dailyRecordByDayOfYearSortedRecency,
      categories,
      projects
    } = this.props;

    if (categories.size && dailyRecordByDayOfYearSortedRecency.size) {
      categories.valueSeq().forEach((category, index) => {
        this.categoryCount[category.get('_id')] = 0;
        this.seriesData[index] = {
          name: category.get('name'),
          data: [],
        };
        this.colors.push(category.get('color'));
      });

      dailyRecordByDayOfYearSortedRecency.valueSeq().forEach((dailyRecord) => {
        // Only show past 8 days
        const startedAt = moment(dailyRecord.get('startedAt')).tz('Asia/Tokyo');
        if (startedAt.dayOfYear() <= moment().tz('Asia/Tokyo').dayOfYear() && startedAt.dayOfYear() > moment().tz('Asia/Tokyo').dayOfYear() - 8) {
          this.xAsixDates.unshift(startedAt.format('MM-DD'));

          Object.keys(this.categoryCount).forEach((catId) => { // reset all category count
            this.categoryCount[catId] = 0;
          });

          dailyRecord.get('pomo').forEach((pomo) => {
            if (pomo !== null) {
              let categoryId = '';
              if (pomo.has('category') && pomo.get('category') !== null) {
                categoryId = pomo.get('category');
              } else if (pomo.hasIn(['project', '_id'])) { // Populated Record
                categoryId = pomo.getIn(['project', 'category', '_id']);
              } else if (projects.hasIn([pomo.get('project'), 'category', '_id'])) {
                categoryId = projects.getIn([pomo.get('project'), 'category', '_id']);
              } else { // The ProjectId for the pomo has been deleted
                // FIXME: do nothing for now.
              }

              if (categoryId.length) {
                this.categoryCount[categoryId] += 1;
              }
            }
          });

          Object.values(this.categoryCount).forEach((v, index) => {
            this.seriesData[index].data.unshift(v);
          });

          // Summing up total calories for the days
          let totalCompliance = 0;
          dailyRecord.get('pomo').forEach((p) => {
            if (p !== null && p.get('isCompliant')) {
              totalCompliance += 1;
            }
          });
          this.complianceCount.unshift(parseFloat((totalCompliance / 48 * 100).toFixed(2)));
          // let totalTotalCalorie = 0;
          // ['breakfast', 'lunch', 'dinner', 'snack'].forEach((meal) => {
          //   if (dailyRecord.hasIn(['calorie', meal])) {
          //     dailyRecord.getIn(['calorie', meal]).forEach((item) => {
          //       totalTotalCalorie += item.has('calorie') ? item.get('calorie') : 0;
          //     });
          //   }
          // });
          // this.calorieCount.unshift(totalTotalCalorie);

          // const defaultValue = 0;
          // ['wake', 'rest'].forEach((sleepItem) => {
          //   if (dailyRecord.hasIn(['sleep', sleepItem])) {
          //     this[`${sleepItem}Data`].unshift(parseInt(dailyRecord.getIn(['sleep', sleepItem, 'hour']) + dailyRecord.getIn(['sleep', sleepItem, 'minute']), 10));
          //   } else {
          //     this[`${sleepItem}Data`].unshift(defaultValue);
          //   }
          // });
        }
      });
    }

    this.seriesData.push({
      yAxis: 1, // Note: need to specific the axis in order to combine the charts
      type: 'spline',
      name: 'Compliance',
      data: this.complianceCount,
    });
    //   {
    //   yAxis: 1, // Note: need to specific the axis in order to combine the charts
    //   type: 'spline',
    //   name: 'Calorie',
    //   data: this.calorieCount,
    // }

    // {
    //   yAxis: 1,
    //   type: 'spline',
    //   name: 'Wanke',
    //   data: this.wakeData,
    // }, {
    //   yAxis: 1,
    //   type: 'spline',
    //   name: 'Rest',
    //   data: this.restData,
    // }


    if (document.getElementById('chart') !== null) {
      Highcharts.chart('chart', {
        chart: {
          type: 'column',
        },

        title: {
          text: '',
        },

        colors: this.colors,
        xAxis: {
          categories: this.xAsixDates,
        },

        yAxis: [{
          min: 0,
          max: 48,
          opposite: true,
          title: {
            text: '',
          },

          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
            },
          },
        }, {
          min: 0,
          max: 100, // 3000,
          title: {
            text: '',
          },
          labels: {
            format: '{value}',
          },
        }],

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

        plotOptions: {
          column: {
            stacking: 'normal',
          },
        },

        series: this.seriesData,
      });
    }
  }

  render() {
    this.updateChartData();

    return (
      <div id="chart" className="flex-1" data-role="dailyrecords-chart" />
    );
  }
}

DailyRecordsChart.defaultProps = {
  projects: Map(),
  dailyRecordByDayOfYearSortedRecency: Map(),
  categories: Map(),
};

DailyRecordsChart.propTypes = {
  projects: PropTypes.object,
  dailyRecordByDayOfYearSortedRecency: PropTypes.object,
  categories: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    projects: projectsByIdSortedSelector(state),
    dailyRecordByDayOfYearSortedRecency: dailyRecordByDayOfYearSortedRecencySelector(state),
    categories: categoriesSortedSelector(state),
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     UiActions: bindActionCreators(UiActions, dispatch),
//   };
// }

export default connect(mapStateToProps)(DailyRecordsChart);
