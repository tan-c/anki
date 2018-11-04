
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';

import { Map } from 'immutable';

import {
  TaskActions,
  selectedYearlyTaskSelector,
} from 'utility-redux/task';

import {
  Icon
} from 'semantic-ui-react';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

export class MonthlyTasksRow extends React.Component {
  render() {
    const { task, selectedYearlyTask } = this.props;

    return (
      <React.Fragment>
        <div
          data-role="monthlytasks-row"
          className={`${task.hasIn(['project', '_id']) && task.getIn(['project', '_id']) === selectedYearlyTask.getIn(['project', '_id']) && 'bg-orange'} flex-container-row typical-setup border-bottom`}
          style={{ borderLeft: `5px solid ${task.hasIn(['project', 'category', 'color']) ? task.getIn(['project', 'category', 'color']) : 'white'}` }}
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

          <Input
            inputName="content"
            inputClassNames="flex-3"
            record={task}
            actions={this.props.TaskActions}
          />

          <Icon
            color={task.get('recur') === 'monthly' ? 'green' : 'grey'}
            name="sync"
            onClick={(_) => {
              const newTask = task.set('recur', task.get('recur') === 'monthly' ? 'none' : 'monthly');
              this.props.TaskActions.update(newTask);
            }}
          />

          <i
            className="fa fa-fw fa-check width-15"
            role="button"
            tabIndex="-1"
            onClick={(_) => {
              if (task.get('recur') === 'monthly') {
                const newTask = task.set('targetCompletion', moment(task.get('targetCompletion')).add(1, 'month'));
                this.props.TaskActions.update(newTask);
              } else {
                this.props.TaskActions.deleteRecord(task);
              }
            }}
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
    );
  }
}

MonthlyTasksRow.defaultProps = {
  selectedYearlyTask: Map(),
};

MonthlyTasksRow.propTypes = {
  task: PropTypes.object.isRequired,
  selectedYearlyTask: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    task: ownProps.task,
    selectedYearlyTask: selectedYearlyTaskSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyTasksRow);
