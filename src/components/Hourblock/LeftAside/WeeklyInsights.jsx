import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import {
  todayTotalSelector,
  thisWeekMetricsSelector,
  lastWeekMetricsSelector,
  yearlyAverageSelector,
} from 'utility-redux/dailyRecord';

export class WeeklyInsights extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      todayTotal,
      yearlyAverage,
      thisWeekTotal,
      lastWeekTotal,
    } = this.props;

    return (
      <div style={{
        marginTop: 20
      }}
      >
        <div style={{
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
          fontSize: 12,
          textAlign: 'center',
          height: 40
        }}
        >
          <div style={{
            left: 0,
            bottom: 0,
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
          }}
          >
            {`${todayTotal}/${yearlyAverage.toFixed(1)}`}
            <br />
            {`${thisWeekTotal}/${lastWeekTotal}`}
          </div>

          <div
            className="bg-orange" style={{
              width: `${todayTotal <= yearlyAverage ? (todayTotal * 100) / yearlyAverage : 100}%`,
              left: 0,
              bottom: 0,
              height: 40,
              zIndex: -1,
              boxSizing: 'border-box',
              lineHeight: 20,
              fontSize: 10,
              position: 'relative'
            }}
          />
        </div>
      </div>
    );
  }
}

WeeklyInsights.defaultProps = {
  yearlyAverage: 0,
  todayTotal: 0,
  // todayTotalCompliance: 0,
  thisWeekTotal: 0,
  lastWeekTotal: 0,
};

WeeklyInsights.propTypes = {
  yearlyAverage: PropTypes.number,
  todayTotal: PropTypes.number,
  // todayTotalCompliance: PropTypes.number,
  thisWeekTotal: PropTypes.number,
  lastWeekTotal: PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyMeasurements: state.dailyMeasurements,

    todayTotal: todayTotalSelector(state),
    // todayTotalCompliance: todayTotalComplianceSelector(state),
    yearlyAverage: yearlyAverageSelector(state),
    thisWeekTotal: thisWeekMetricsSelector(state)[0],

    thisWeekTotalCalorie: thisWeekMetricsSelector(state)[3],

    lastWeekTotal: lastWeekMetricsSelector(state)[0],
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

export default connect(mapStateToProps)(WeeklyInsights);
