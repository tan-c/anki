import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import {
  Label, List
} from 'semantic-ui-react';


import { TaskActions, projectTasksSelector } from 'utility-redux/task';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';

export class ProjectTasksList extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  addSubTask = (event, task) => {
    if (event.which === 13) {
      this.props.TaskActions.update(task.update('subTasks', subTasks => subTasks.push(event.target.value)), task).then((_) => {
        this.newTaskInput.value = '';
      });
    }
  }

  render() {
    const { focusedProjectTasks, focusedProject } = this.props;

    return (
      <React.Fragment>
        <div className="list-with-pinned-bottom">
          {focusedProjectTasks.size > 0 && focusedProjectTasks.sort((a, b) => b.get('priority') - a.get('priority')).map((task, taskIndex) => (
            <List celled ordered key={task.get('_id')}>
              <List.Item>
                <List.Content style={{
                  display: 'flex'
                }}
                >
                  <Label
                    horizontal
                    tag
                    color="orange"
                  >
                    {`${task.get('subTasks').count() * 30 / 60}H`}
                  </Label>

                  <Label
                    horizontal
                    onClick={(_) => {
                      this.props.TaskActions.update(task.set('priority', task.get('priority') + 1), task);
                    }}
                  >
                    {task.get('priority')}
                  </Label>

                  <Input
                    inputName="content"
                    record={task}
                    actions={this.props.TaskActions}
                  />

                  <input
                    className="flex-1"
                    ref={(ref) => { this.newTaskInput = ref; }}
                    placeholder={`add new to ${task.get('content')}`}
                    onKeyDown={event => this.addSubTask(event, task)}
                  />

                  <i
                    role="button"
                    tabIndex="-1"
                    className="fa fa-fw fa-close"
                    onClick={_ => this.props.TaskActions.deleteRecord(task)}
                  />
                </List.Content>
              </List.Item>

              {task.get('subTasks').count() > 0
                && (
                  <List.Item>
                    <List divided inverted>
                      {task.get('subTasks').map((subTask, index) => (
                        <List.Item
                          key={subTask}
                        >
                          {`${index + 1}. ${subTask}`}
                          <List.Content floated="right">
                            <i
                              role="button"
                              tabIndex="-1"
                              className="fa fa-fw fa-close"
                              onClick={_ => this.props.TaskActions.update(task.deleteIn(['subTasks', index.toString()]), task)}
                            />
                          </List.Content>
                        </List.Item>))
                      }
                    </List>
                  </List.Item>
                )
              }
            </List>
          ))}
        </div>

        <div className="flex-container-row pinned-bottom border-top">
          <InputNewConnected
            inputName="content"
            inputClassNames="flex-5"
            newRecord={{
              type: 'project',
              project: focusedProject.get('_id'),
            }}
            actions={this.props.TaskActions}
          />
        </div>
      </React.Fragment>
    );
  }
}

ProjectTasksList.defaultProps = {
  focusedProjectTasks: Map(),
  focusedProject: Map(),
};

ProjectTasksList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTasksList);
