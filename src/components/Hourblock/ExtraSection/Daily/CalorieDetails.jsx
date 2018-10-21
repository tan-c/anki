import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import toastr from 'toastr';

import SelectConnected from 'utility-react-component/Form/Select';
import {
  DailyRecordActions,
  currentDailyRecordSelector,
  getTodayTotalCaloriesSelector,
} from 'utility-redux/dailyRecord';

export class DailyCalorieDetails extends React.Component {
  state = {
    newCalorieItemType: '',
    newCalorieItemName: '',
    newCalorieItemAmount: 0,
  }
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     totalCalorie: 0,
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  addCalorieItem = () => {
    const { newCalorieItemType, newCalorieItemAmount, newCalorieItemName } = this.state;
    const { currentDailyRecord } = this.props;
    const newCalorieItem = {
      type: newCalorieItemType,
      name: newCalorieItemName,
      calorie: newCalorieItemAmount,
    };

    if (!newCalorieItemType.length || !newCalorieItemName.length) {
      toastr.error('Please adding a type or a name');
      return;
    }

    this.props.DailyRecordActions.update(currentDailyRecord.update('calorieItems', items => (items === undefined ? [newCalorieItem] : items.push(newCalorieItem)))).then((_) => {
      this.nameInput.value = '';
      this.valueInput.value = 0;
    });
  }

  updateCalorieItem = (index) => {
    const { currentDailyRecord } = this.props;
    this.props.DailyRecordActions.update(currentDailyRecord.update('calorieItems', v => v.slice(0, index).concat(v.slice(index + 1))));
  }

  render() {
    const { currentDailyRecord, todayTotalCalories } = this.props;
    const { newCalorieItemType, newCalorieItemAmount, newCalorieItemName } = this.state;

    return (
      <React.Fragment>
        <div className="flex-container-row typical-setup border-bottom-white-10">
          <SelectConnected
            onChangeEvent={
              e => this.setState({
                newCalorieItemType: e.target.value,
              })
            }
            options={['breakfast', 'lunch', 'dinner', 'snack']}
            className="width-80"
            value={newCalorieItemType}
          />

          <input
            type="text" className="flex-2"
            value={newCalorieItemName}
            ref={(r) => { this.nameInput = r; }}
            onChange={e => this.setState({
              newCalorieItemName: e.target.value,
            })}
          />

          <input
            type="number"
            className="width-40"
            value={newCalorieItemAmount}
            ref={(r) => { this.valueInput = r; }}
            onChange={e => this.setState({
              newCalorieItemAmount: e.target.value,
            })}
            onKeyDown={(event) => {
              if (event.which === 13) {
                this.addCalorieItem();
              }
            }}
          />
        </div>

        {currentDailyRecord.size > 0
        && (
          <React.Fragment>
            <div className="height-lineheight-30 text-center bg-white-10">
            Total Calories Today -
              {' '}
              {todayTotalCalories}
            </div>
            <div className="border-bottom-white border-top-white">
              {currentDailyRecord.has('calorieItems') && currentDailyRecord.get('calorieItems').map((item, index) => (<div className="flex-container-row typical-setup" key={item.get('_id')}>
                <span className="flex-1">{item.get('type')}</span>
                <span className="flex-1">{item.get('name')}</span>
                <span className="flex-1">{item.get('calorie')}</span>
                <i
                  role="button"
                  tabIndex="-1"
                  className="fa fa-fw fa-close width-20"
                  onClick={_ => this.updateCalorieItem(index)}
                />
              </div>
              ))}
            </div>
            <div className="spacing-10" />

          </React.Fragment>
        )
        }
      </React.Fragment>
    );
  }
}

DailyCalorieDetails.defaultProps = {
  todayTotalCalories: 0,
  // calories: Map(),
  currentDailyRecord: Map(),
};

DailyCalorieDetails.propTypes = {
  todayTotalCalories: PropTypes.number,
  currentDailyRecord: PropTypes.object,
  // calories: PropTypes.object,

  DailyRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    todayTotalCalories: getTodayTotalCaloriesSelector(state, ownProps.dayMomentObject),
    currentDailyRecord: currentDailyRecordSelector(state, ownProps.dayMomentObject),
    // calories: state.calories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    DailyRecordActions: bindActionCreators(DailyRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyCalorieDetails);
