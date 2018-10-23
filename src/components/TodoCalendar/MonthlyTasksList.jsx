import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
import { Map } from 'immutable';

import InputNewConnected from 'utility-react-component/Form/Input/New';
import { TaskActions, monthlyTasksSelector } from 'utility-redux/task';

import {
  List, Input, Grid, Segment,
  Button, Icon
} from 'semantic-ui-react';

export class MonthlyTasksList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showMonthlyTaskRewards: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { monthlyTasks, activeMonth } = this.props;
    const { showMonthlyTaskRewards } = this.state;

    return (
      <div data-role="monthlytasks-list" className="margin-top-10 margin-bottom-10 border-white">
        <span className="flex-container-row typical-setup border-bottom-white-dotted text-left">
          <InputNewConnected
            inputName="content"
            inputClassNames="flex-3"
            placeholderContent="generic montly task..."
            newRecord={{
              targetCompletion: moment().tz('Asia/Tokyo').startOf('year').add(activeMonth, 'months')
                .toDate(),
              type: 'monthly',
            }}
            actions={this.props.TaskActions}
          />

          <i
            role="button" tabIndex="-1"
            className={`width-15 fa fa-fw fa-gift ${showMonthlyTaskRewards && 'color-green'}`} onClick={_ => this.setState({
              showMonthlyTaskRewards: !showMonthlyTaskRewards,
            })}
          />
        </span>

        {monthlyTasks.has(activeMonth.toString()) && monthlyTasks.get(activeMonth.toString()).sort((a, b) => a.getIn(['project', 'category', 'naturalId']) - b.getIn(['project', 'category', 'naturalId'])).map(task => (
          <React.Fragment key={task.get('_id')}>
            <div className="flex-container-row typical-setup border-bottom-white-20">
              <span className="width-10" style={{ background: task.getIn(['project', 'category', 'color']) }} />
              <span className="flex-1 text-left">
                {task.get('content')}
              </span>

              <Icon
                color={task.get('recur') === 'monthly' ? 'green' : 'grey'}
                name="sync"
                onClick={(_) => {
                  const newTask = task.set('recur', task.get('recur') === 'monthly' ? 'none' : 'monthly');
                  this.props.TaskActions.update(newTask);
                }}
              />

              <Icon
                name={task.get('recur') === 'monthly' ? 'check' : 'close'}
                onClick={(_) => {
                  if (task.get('recur') === 'monthly') {
                    const newTask = task.set('targetCompletion', moment(task.get('targetCompletion')).add(1, 'month'));
                    this.props.TaskActions.update(newTask);
                  } else {
                    this.props.TaskActions.deleteRecord(task);
                  }
                }}
              />
            </div>

            {showMonthlyTaskRewards && task.has('reward') && (
              <div className="flex-container-row height-20 line-height-20">
                <i className="width-20 fa fa-fw fa-arrow-right line-height-20" />
                <i className="width-20 fa fa-fw fa-gift line-height-20" />
                <span className="flex-1">{task.get('reward')}</span>
              </div>
            )}
          </React.Fragment>
        ))
        }
      </div>
    );
  }
}

MonthlyTasksList.defaultProps = {
  monthlyTasks: Map(),
};

MonthlyTasksList.propTypes = {
  monthlyTasks: PropTypes.object,
  activeMonth: PropTypes.number.isRequired,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    activeMonth: ownProps.activeMonth,
    monthlyTasks: monthlyTasksSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyTasksList);