import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { thisWeekMetricsSelector, lastWeekMetricsSelector } from 'utility-redux/hourblock/dailyRecord';
import { calorieWeeklySelector } from 'utility-redux/hourblock/dailyMeasurement';

export class Footer extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      thisWeekTotal, lastWeekTotal, calorieWeeklyMaintain, thisWeekTotalCalorie, calorieWeeklyWeightLoss,
    } = this.props;
    return (
      <footer data-role="footer">
        <div id="calorie-progress-bar" className={`${thisWeekTotalCalorie > calorieWeeklyWeightLoss && 'bg-red'}`} style={{ width: `${(thisWeekTotalCalorie / calorieWeeklyMaintain) * 100}%` }} />
        <div id="pomo-progress-bar" style={{ width: `${(thisWeekTotal / lastWeekTotal) * 100}%` }} />
      </footer>
    );
  }
}

Footer.defaultProps = {
};

Footer.propTypes = {
  thisWeekTotal: PropTypes.number.isRequired,
  lastWeekTotal: PropTypes.number.isRequired,

  calorieWeeklyMaintain: PropTypes.number.isRequired,
  calorieWeeklyWeightLoss: PropTypes.number.isRequired,

  thisWeekTotalCalorie: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    thisWeekTotal: thisWeekMetricsSelector(state)[0],
    thisWeekTotalCalorie: thisWeekMetricsSelector(state)[3],
    lastWeekTotal: lastWeekMetricsSelector(state)[0],

    calorieWeeklyMaintain: calorieWeeklySelector(state)[0],
    calorieWeeklyWeightLoss: calorieWeeklySelector(state)[1],
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

export default connect(mapStateToProps)(Footer);
