import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { DailyMeasurementActions, currentDayMeasurementSelector } from 'utility-redux/dailyMeasurement';
import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';

export class DailyMeasurements extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const items = [{
      id: 'morningWeight',
      name: 'Weight',
      type: 'daily',
    }, {
      id: 'weight',
      name: 'Weight Post Gym',
      type: 'gym',
    }, {
      id: 'waist',
      name: 'Waist',
      type: 'gym',
    }, {
      id: 'armCircumference',
      name: 'Arm Circum',
      type: 'gym',
    }, {
      id: 'chestCircumference',
      name: 'Chest Circum',
      type: 'gym',
    }, {
      id: 'thighCircumference',
      name: 'Thigh Circum',
      type: 'gym',
    }];

    const { currentDayMeasurementRecord } = this.props;
    const showingItemType = 'gym';

    return (
      <React.Fragment>
        {currentDayMeasurementRecord.size === 0
          && <span>Loading Current Daily Record</span>
        }
        {currentDayMeasurementRecord.size > 0
          && (
            <React.Fragment>
              {items.filter(i => i.type === showingItemType).map(item => (
                <span key={item.id} className={`flex-container-row typical-setup ${(item.id === 'morningWeight') && (!currentDayMeasurementRecord.has(item.id) || currentDayMeasurementRecord.get(item.id) === 0) && 'bg-red'}`}>
                  <span className="flex-1">{item.name}</span>
                  <InputUncontrolledConnected
                    inputName={item.id}
                    inputClassNames="flex-1"
                    record={currentDayMeasurementRecord}
                    actions={this.props.DailyMeasurementActions}
                  />
                </span>))}
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

DailyMeasurements.defaultProps = {
  currentDayMeasurementRecord: Map(),
};

DailyMeasurements.propTypes = {
  // dayMomentObject: PropTypes.object.isRequired,
  currentDayMeasurementRecord: PropTypes.object,

  DailyMeasurementActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // dayMomentObject: ownProps.dayMomentObject,
    currentDayMeasurementRecord: currentDayMeasurementSelector(state, ownProps.dayMomentObject),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    DailyMeasurementActions: bindActionCreators(DailyMeasurementActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMeasurements);
