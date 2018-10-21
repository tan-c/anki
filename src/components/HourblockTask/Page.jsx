import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import {
  TaskActions,
  currentYearlyTasksSortedSelector,
  totalProjectTasksCountSelector
} from 'utility-redux/task';

import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import { UiActions } from 'utility-redux/ui';

import { Grid, } from 'semantic-ui-react';
import MonthlyTasksListConnected from './MonthlyTasks/List';
import DailyTaskPlanningConnected from './DailyTasks/List';
import ProjectTaskListConnected from './ProjectTaskList';
import FocusedProjectTaskListConnected from './FocusedProjectTaskList';


export class TasksPage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  render() {
    const { currentYearlyTasksSorted, totalProjectTasksCount } = this.props;

    return (
      <Grid.Row columns={4}>
        <Grid.Column>
          {`Task - ${totalProjectTasksCount}`}
          <ProjectTaskListConnected />
          <FocusedProjectTaskListConnected />
        </Grid.Column>


        <Grid.Column>
          <div className="section-header">2018 Tasks</div>
          <div className="section-content">
            <div className="list-with-pinned-bottom">
              {currentYearlyTasksSorted.size > 0 && currentYearlyTasksSorted.map(task => (
                <div key={task.get('_id')} className="flex-container-row typical-setup">
                  <span className="flex-1">
                    <ProjectSelectConnected
                      onChangeEvent={event => this.props.TaskActions.update(task.set('project', event.target.value), task)}
                      value={task.getIn(['project', '_id'])}
                      color={task.getIn(['project', 'category', 'color'])}
                    />
                  </span>
                  <Input
                    inputName="content"
                    inputClassNames="flex-2"
                    record={task}
                    actions={this.props.TaskActions}
                  />
                  <i
                    className="fa fa-fw fa-eye"
                    role="button"
                    tabIndex="-1"
                    onClick={_ => this.props.UiActions.updateIn(['hourblock', 'taskPage', 'selectedYearlyTaskId'], task.get('_id'))}
                  />
                </div>))}
            </div>

            <div className="flex-container-row pinned-bottom border-top">
              <InputNewConnected
                inputName="content"
                newRecord={{
                  targetCompletion: moment().tz('Asia/Tokyo').startOf('year'),
                  type: 'yearly',
                }}
                actions={this.props.TaskActions}
              />
            </div>
          </div>
        </Grid.Column>

        <Grid.Column>
          <MonthlyTasksListConnected />
        </Grid.Column>

        <Grid.Column>
          <DailyTaskPlanningConnected />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

TasksPage.defaultProps = {
  currentYearlyTasksSorted: Map(),
  totalProjectTasksCount: 0
};

TasksPage.propTypes = {
  currentYearlyTasksSorted: PropTypes.object,
  totalProjectTasksCount: PropTypes.number,

  TaskActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    totalProjectTasksCount: totalProjectTasksCountSelector(state),

    currentYearlyTasksSorted: currentYearlyTasksSortedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
