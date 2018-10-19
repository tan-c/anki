import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';

import { DailyMeasurementActions } from 'utility-redux/dailyMeasurement';
import InputNewConnected from 'utility-react-component/Form/Input/New';
import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';
import DailyCaloriesChartConnected from './DailyCaloriesChart';

export class DailyMeasurementsList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { dailyMeasurements, todayDate } = this.props;
    const fieldList = ['weight', 'height', 'waist', 'armCircumference', 'thighCircumference'];

    return (
      <React.Fragment>
        <section className="flex-1">
          <div className="section-header">
            Daily Measurement Item List
          </div>
          <div className="section-content">
            <div className="list-with-pinned-bottom">
              <span className="flex-container-row">
                <span className="flex-2" />
                {fieldList.map(field => <span key={field} className="flex-1">{field}</span>)}
              </span>

              {dailyMeasurements.valueSeq().map(dailyMeasurement => (
                <div className="flex-container-row typical-setup" key={dailyMeasurement.get('_id')}>
                  <span className="flex-2">
                    {moment(dailyMeasurement.get('startedAt')).format('MM-DD')}
                  </span>
                  {fieldList.map(field => (
                    <InputUncontrolledConnected
                      key={field}
                      inputName={field}
                      inputClassNames="flex-1"
                      record={dailyMeasurement}
                      actions={this.props.DailyMeasurementActions}
                    />
                  ))}
                </div>))}
            </div>
            <div className="flex-container-row pinned-bottom border-top">
              <InputNewConnected
                newRecord={{
                  startedAt: todayDate,
                }}
                inputClassNames="flex-1"
                actions={this.props.DailyMeasurementActions}
              />
            </div>
          </div>
        </section>
        <section className="flex-1">
          <DailyCaloriesChartConnected />
        </section>
      </React.Fragment>
    );
  }
}

DailyMeasurementsList.defaultProps = {
};

DailyMeasurementsList.propTypes = {
  todayDate: PropTypes.object.isRequired,
  dailyMeasurements: PropTypes.object.isRequired,
  DailyMeasurementActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    todayDate: moment().tz('Asia/Tokyo').startOf('day').toDate(),
    dailyMeasurements: state.dailyMeasurements,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    DailyMeasurementActions: bindActionCreators(DailyMeasurementActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMeasurementsList);
