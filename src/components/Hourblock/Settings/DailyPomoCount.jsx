import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';

import { dailyRecordPomoCountByDayOfYearSelector } from 'utility-redux/hourblock/dailyRecord';

class DailyPomoCount extends React.Component {
  render() {
    const { dailyRecordPomoCountByDayOfYear } = this.props;

    return (
      <section className="flex-1">
        {dailyRecordPomoCountByDayOfYear.valueSeq().sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix()).map(item => (
          <div className="flex-container-row typical-setup border-bottom-white-20" key={item.get('_id')}>
            <span className="flex-1">
              {moment(item.get('startedAt')).format('MM-DD')}
              {' '}
-
              <span className={`${moment(item.get('startedAt')).isoWeekday() > 5 && 'color-orange'}`}>
                {moment(item.get('startedAt')).isoWeekday()}
              </span>
            </span>
            <span className="flex-1">
              {item.get('pomoCount')}
            </span>
            <span className="flex-1">
              {item.get('totalPomoCount')}
            </span>
          </div>))}
      </section>
    );
  }
}

DailyPomoCount.defaultProps = {
  dailyRecordPomoCountByDayOfYear: Map(),
};

DailyPomoCount.propTypes = {
  dailyRecordPomoCountByDayOfYear: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyRecordPomoCountByDayOfYear: dailyRecordPomoCountByDayOfYearSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPomoCount);
