import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map } from 'immutable';

import {
  TaskActions,
  selectedYearlyTaskSelector,
} from 'utility-redux/task';

import Input from 'utility-react-component/Form/Input/Uncontrolled';

export class MonthlyTasksRow extends React.Component {
  render() {
    const { task, selectedYearlyTask } = this.props;

    return (
      <React.Fragment>
        <div
          data-role="monthlytasks-row"
          className={`${task.getIn(['project', '_id']) === selectedYearlyTask.getIn(['project', '_id']) && 'bg-orange'} flex-container-row typical-setup border-bottom`}
          style={{ borderLeft: `5px solid ${task.hasIn(['project', 'category', 'color']) ? task.getIn(['project', 'category', 'color']) : 'white'}` }}
        >
          <Input
            inputName="content"
            inputClassNames="flex-3"
            record={task}
            actions={this.props.TaskActions}
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
