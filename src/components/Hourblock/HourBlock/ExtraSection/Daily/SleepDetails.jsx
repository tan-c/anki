import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { DailyRecordActions, currentDailyRecordSelector } from 'utility-redux/hourblock/dailyRecord';
import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';

export class DailySleepDetails extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { currentDailyRecord } = this.props;
    return (
      <React.Fragment>
        {['wake', 'rest'].map(field => (
          <span key={field} className="flex-container-row typical-setup">
            <span className="flex-1">{field}</span>
            {['hour', 'minute'].map(type => (
              <InputUncontrolledConnected
                key={type}
                inputName={type}
                pathName={['sleep', field, type]}
                inputClassNames="flex-1"
                record={currentDailyRecord}
                actions={this.props.DailyRecordActions}
              />))}
          </span>))}
      </React.Fragment>
    );
  }
}

DailySleepDetails.defaultProps = {
  currentDailyRecord: Map(),
};

DailySleepDetails.propTypes = {
  currentDailyRecord: PropTypes.object,

  DailyRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    currentDailyRecord: currentDailyRecordSelector(state, ownProps.dayMomentObject),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    DailyRecordActions: bindActionCreators(DailyRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailySleepDetails);
