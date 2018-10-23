import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { TaskActions, projectTasksSelector } from 'utility-redux/task';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';

export class FocusedProjectTaskList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTaskIndex: -1,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  addSubTask = (event) => {
    if (event.which === 13) {
      const { selectedTaskIndex } = this.state;
      const { focusedProjectTasks } = this.props;
      const taskToUpdate = focusedProjectTasks.sort((a, b) => b.get('priority') - a.get('priority')).get(selectedTaskIndex.toString());

      this.props.TaskActions.update(taskToUpdate.update('subTasks', subTasks => subTasks.push(event.target.value)), taskToUpdate).then((_) => {
        this.newTaskInput.value = '';
      });
    }
  }


  render() {
    const { focusedProjectTasks, focusedProject } = this.props;
    const { selectedTaskIndex } = this.state;

    return (
      <React.Fragment>
        <div className="list-with-pinned-bottom">
          {focusedProjectTasks.size > 0 && focusedProjectTasks.sort((a, b) => b.get('priority') - a.get('priority')).map((task, taskIndex) => (
            <div key={task.get('_id')}>
              <div className="flex-container-row typical-setup">
                <span
                  role="button" tabIndex="-1"
                  className="width-20" onClick={(_) => {
                    this.props.TaskActions.update(task.set('priority', task.get('priority') + 1), task);
                  }}
                >
                  {task.get('priority')}
                </span>

                <span
                  role="button"
                  tabIndex="-1"
                  className="flex-3"
                  onClick={_ => this.setState({
                    selectedTaskIndex: taskIndex,
                  })}
                >
                  <Input
                    inputName="content"
                    inputClassNames="flex-1"
                    record={task}
                    actions={this.props.TaskActions}
                  />
                </span>

                <i
                  role="button"
                  tabIndex="-1"
                  className="fa fa-fw fa-close"
                  onClick={_ => this.props.TaskActions.deleteRecord(task)}
                />
              </div>

              {task.get('subTasks').map((subTask, index) => (
                <div key={subTask} className="flex-container-row typical-setup text-left">
                  <span className="flex-20">-</span>
                  <div className="flex-1">
                    {index + 1}
.
                    {' '}
                    {subTask}
                  </div>
                  <i
                    role="button"
                    tabIndex="-1"
                    className="fa fa-fw fa-close"
                    onClick={_ => this.props.TaskActions.update(task.deleteIn(['subTasks', index.toString()]), task)}
                  />
                </div>))
              }
            </div>
          ))}
        </div>

        <div className="flex-container-row pinned-bottom border-top">
          {selectedTaskIndex === -1
            && (
              <InputNewConnected
                inputName="content"
                inputClassNames="flex-5"
                newRecord={{
                  type: 'project',
                  project: focusedProject.get('_id'),
                }}
                actions={this.props.TaskActions}
              />
            )
          }

          {selectedTaskIndex !== -1
            && (
              <input
                className="flex-1"
                ref={(ref) => { this.newTaskInput = ref; }}
                placeholder={`add new to ${focusedProjectTasks.sort((a, b) => b.get('priority') - a.get('priority')).getIn([selectedTaskIndex.toString(), 'content'])}`}
                onKeyDown={this.addSubTask}
              />
            )
          }

          <i
            role="button"
            tabIndex="-1"
            className={`fa fa-fw fa-eye width-30 height-lineheight-30 ${this.state.selectedTaskIndex !== -1 && 'color-green'}`}
            disabled={this.state.selectedTaskIndex === -1}
            onClick={_ => this.setState({
              selectedTaskIndex: -1
            })}
          />
        </div>
      </React.Fragment>
    );
  }
}

FocusedProjectTaskList.defaultProps = {
  focusedProjectTasks: Map(),
  focusedProject: Map(),
};

FocusedProjectTaskList.propTypes = {
  focusedProjectTasks: PropTypes.object,
  focusedProject: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const focusedProjectId = state.ui.getIn(['hourblock', 'hourblockPage', 'focusedProjectId']);
  return {
    focusedProjectTasks: projectTasksSelector(state).get(focusedProjectId),
    focusedProject: state.projects.get(focusedProjectId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusedProjectTaskList);
