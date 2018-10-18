import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, isImmutable } from 'immutable';
import moment from 'moment-timezone';

import {
  TaskActions,
  dailyTasksSelector,
} from 'utility-redux/hourblock/task';

import Input from 'utility-react-component/Form/Input/Uncontrolled';
import DefaultSelect from 'utility-react-component/Form/Select';
import InputNewConnected from 'utility-react-component/Form/Input/New';

class DailyTasksRow extends React.Component {
  render() {
    const { dailyTasks, selectedYearlyTask, dayVal } = this.props;

    return (
      <div className={`${dayVal.dayMomentObject.unix() === moment().tz('Asia/Tokyo').startOf('day').unix() && 'border-top-orange'} ${dayVal.dayMomentObject.isoWeekday() === 7 && 'margin-bottom-10'}`}>
        <div className="flex-container-row typical-setup">
          <span className={`flex-1 ${dayVal.dayMomentObject.isoWeekday() > 5 && 'color-orange'}`}>
            {dayVal.dayMomentObject.format('MM-DD')}
          </span>

          {dayVal.dayMomentObject.unix() >= moment().tz('Asia/Tokyo').startOf('day').unix()
          && (
            <InputNewConnected
              inputName="content"
              inputClassNames="flex-3"
              newRecord={{
                targetCompletion: dayVal.dayMomentObject,
                type: 'daily',
                project: selectedYearlyTask.getIn(['project', '_id']),
              }}
              actions={this.props.TaskActions}
            />
          )}

          {dayVal.dayMomentObject.unix() < moment().tz('Asia/Tokyo').startOf('day').unix()
          && <span className="flex-3" />
          }

          <span className="width-20">
            {dailyTasks.has(dayVal.dayOfYearString)
            && (
              <div>
                {dailyTasks.get(dayVal.dayOfYearString).size === 1 && dailyTasks.getIn([dayVal.dayOfYearString, '0', 'estimateHour'])}
                {dailyTasks.get(dayVal.dayOfYearString).size > 1
              && dailyTasks.get(dayVal.dayOfYearString).reduce((currentSum, b) => (isImmutable(currentSum) ? currentSum.get('estimateHour') : currentSum) + b.get('estimateHour'))}
              </div>
            )}
          </span>
        </div>

        {dailyTasks.has(dayVal.dayOfYearString) && dailyTasks.get(dayVal.dayOfYearString).map(task => (
          <React.Fragment key={task.get('_id')}>
            <div
              className={`${task.getIn(['project', '_id']) === selectedYearlyTask.getIn(['project', '_id']) && 'bg-orange'}  flex-container-row typical-setup border-bottom`}
              style={{ borderLeft: `5px solid ${task.hasIn(['project', 'category', 'color']) ? task.getIn(['project', 'category', 'color']) : 'white'}` }}
            >
              <Input
                inputName="content"
                inputClassNames="flex-4"
                record={task}
                actions={this.props.TaskActions}
              />

              <Input
                inputName="estimateHour"
                inputClassNames="flex-1"
                record={task}
                actions={this.props.TaskActions}
              />

              <DefaultSelect
                className="flex-1"
                onChangeEvent={(event) => {
                  this.props.TaskActions.update(task.set('recur', event.target.value));
                }}
                value={task.get('recur')}
                options={['none', 'daily', 'weekly', 'monthly', 'yearly']}
              />

              <i
                className="fa fa-fw fa-close width-15"
                role="button" tabIndex="-1"
                onClick={_ => this.props.TaskActions.deleteRecord(task)}
              />

              <i
                className="fa fa-fw fa-check width-15"
                role="button"
                tabIndex="-1"
                onClick={_ => this.props.TaskActions.update(task.setIn(['project', '_id'], selectedYearlyTask.getIn(['project', '_id'])))}
              />

              <i
                className="fa fa-fw fa-gift width-15"
                role="button"
                tabIndex="-1"
                onClick={_ => this.props.TaskActions.update(task.set('reward', ''))}
              />
            </div>

            {task.has('reward') && (
              <div className="flex-container-row typical-setup border-bottom-white border-left-white border-right-white">
                <Input
                  inputName="reward"
                  inputClassNames="flex-1"
                  record={task}
                  actions={this.props.TaskActions}
                />
              </div>
            )}
          </React.Fragment>

        ))}
      </div>
    );
  }
}

DailyTasksRow.defaultProps = {
  dailyTasks: Map(),
};

DailyTasksRow.propTypes = {
  dailyTasks: PropTypes.object,
  dayVal: PropTypes.object.isRequired,
  selectedYearlyTask: PropTypes.object.isRequired,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyTasks: dailyTasksSelector(state),
    selectedYearlyTask: ownProps.selectedYearlyTask,
    dayVal: ownProps.dayVal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyTasksRow);
