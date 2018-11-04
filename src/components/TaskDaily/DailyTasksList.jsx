import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, isImmutable } from 'immutable';
import moment from 'moment';

import { TaskActions, dailyTasksSelector } from 'utility-redux/task';
import InputNewComponent from 'utility-react-component/Form/Input/New';
import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import {
  Icon
} from 'semantic-ui-react';

export class DailyTasksList extends React.Component {
  handleKeydownAddTask = (event, dayMomentObject, type) => {
    if (event.which === 13) {
      const { value } = event.target;
      this.props.TaskActions.create({
        content: value,
        targetCompletion: dayMomentObject,
        type,
      }).then((_) => {
        this[`${type}InputRef`][dayMomentObject.unix()].value = '';
      });
    }
  }

  render() {
    const { dayVal, dailyTasks } = this.props;
    return (
      <div
        data-role="dailytasks-list"
        className={`${dayVal.dayMomentObject.dayOfYear() === moment().dayOfYear() && 'border-orange-light'}`}
      >
        {(!dayVal.isPast || (dailyTasks.has(dayVal.dayOfYearString) && dailyTasks.get(dayVal.dayOfYearString).size > 0))
          && (
            <span className="flex-container-row typical-setup border-bottom-white-dotted text-left">
              <span className={`flex-1 ${dayVal.isWeekend && 'color-orange'}`}>
                {dayVal.dayMomentObject.format('MM-DD')}
              </span>

              {!dayVal.isPast && (
                <InputNewComponent
                  inputName="content"
                  inputClassNames="flex-3"
                  newRecord={{
                    targetCompletion: dayVal.dayMomentObject,
                    type: 'daily',
                  }}
                  actions={this.props.TaskActions}
                />
              )}

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
            </span>
          )
        }

        {dailyTasks.has(dayVal.dayOfYearString) && dailyTasks.get(dayVal.dayOfYearString).size > 0 && dailyTasks.get(dayVal.dayOfYearString).sort((a, b) => (b.getIn(['priority']) - a.getIn(['priority']))).map(task => (
          <React.Fragment key={task.get('_id')}>
            <div
              className={'flex-container-row typical-setup overflow-hidden border-bottom-white-20}'}
            >
              <span className="width-60 text-center" style={{ background: task.getIn(['project', 'category', 'color']) }}>
                <ProjectSelectConnected
                  value={task.size ? task.getIn(['project', '_id']) : ''}
                  onChangeEvent={(event) => {
                    const newTask = task.set('project', event.target.value);
                    this.props.TaskActions.update(newTask);
                  }}
                />
              </span>

              <i
                role="button"
                tabIndex="-1"
                className={`fa fa-fw fa-flag ${task.get('priority') === 2 && 'color-red'} ${task.get('priority') === 1 && 'color-orange'}`}
                onClick={(_) => {
                  this.props.TaskActions.update(task.set('priority', (task.get('priority') + 1) % 3), task);
                }}
              />

              <span className="width-20">
                <InputUncontrolledConnected
                  key="estimateHour"
                  inputName="estimateHour"
                  pathName={['estimateHour']}
                  inputClassNames="flex-1"
                  record={task}
                  actions={this.props.TaskActions}
                />
              </span>

              <span className="flex-1 text-left">
                {task.get('content')}
              </span>

              {task.get('recur') !== 'none'
                && (
                  <span className="width-15 bg-orange text-center">
                    {task.get('recur')[0].toUpperCase()}
                  </span>
                )
              }

              <Icon
                className={`width-15 ${task.has('recur') && task.get('recur') !== 'none' && 'color-green'}`}
                name="sync"
                onClick={_ => this.props.TaskActions.update(task.set('recur', task.get('recur') === 'daily' ? 'none' : 'daily', task))}
              />

              <i
                role="button" tabIndex="-1" className="fa fa-fw fa-check width-15"
                onClick={(_) => {
                  if (task.has('recur') && task.get('recur') !== 'none') {
                    const taskMap = {
                      daily: 'day',
                      weekly: 'week',
                      monthly: 'month',
                      yearly: 'year',
                    };
                    this.props.TaskActions.update(task.set('targetCompletion', moment(task.get('targetCompletion')).add(1, taskMap[task.get('recur')])), task);
                  } else {
                    this.props.TaskActions.deleteRecord(task);
                  }
                }}
              />
            </div>

            {task.has('reward') && (
              <div className="flex-container-row height-20 line-height-20">
                <i className="width-20 fa fa-fw fa-arrow-right line-height-20" />
                <i className="width-20 fa fa-fw fa-gift line-height-20" />
                <span className="flex-1">{task.get('reward')}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

DailyTasksList.defaultProps = {
  dayVal: Map(),
  dailyTasks: Map(),
};

DailyTasksList.propTypes = {
  dayVal: PropTypes.object,
  dailyTasks: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    dayVal: ownProps.dayVal,
    dailyTasks: dailyTasksSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyTasksList);
