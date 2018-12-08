import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import { Header, Label, List } from 'semantic-ui-react';

import {
  TaskActions,
  yearlyTasksSortedSelector
} from 'utility-redux/task';

import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import { UiActions } from 'utility-redux/ui';

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
    const {
      yearlyTasksSorted,
      currentYearlyTaskSelectedId
    } = this.props;

    return (
      <Fragment>
        <Header
          as="h3"
          inverted
          content={`Yearly Tasks - ${yearlyTasksSorted.size}`}
        />

        <List
          divided
          selection
          style={{
            height: 'calc(100% - 80px)',
            overflow: 'auto'
          }}
        >
          {yearlyTasksSorted.size > 0 && yearlyTasksSorted.map(task => (
            <List.Item
              key={task.get('_id')} className="flex-container-row"
              style={{
                display: 'flex',
                backgroundColor: currentYearlyTaskSelectedId === task.get('_id') ? '#e67e22' : 'transparent'
              }}
            >
              <Label
                color={task.get('priority') >= 3 ? 'red' : task.get('priority') >= 1 ? 'orange' : 'grey'} // eslint-disable-line
                horizontal
                onClick={(_) => {
                  this.props.TaskActions.update(task.set('priority', task.get('priority') + 1), task);
                }}
              >
                {task.get('priority')}
              </Label>

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

              <span
                style={{ color: 'white' }}
              >
                {task.get('dailyTasksAssociated')}
              </span>

              <i
                style={{ color: currentYearlyTaskSelectedId === task.get('id') ? 'green' : 'grey' }}
                className="fa fa-fw fa-eye"
                role="button"
                tabIndex="-1"
                onClick={_ => this.props.UiActions.updateIn(['taskPage', 'selectedYearlyTaskId'], task.get('_id'))}
              />
            </List.Item>
          ))}
        </List>

        <div className="flex-container-row pinned-bottom border-top">
          <span className="flex-1">
            <InputNewConnected
              inputName="content"
              newRecord={{
                targetCompletion: moment().tz('Asia/Tokyo').startOf('year'),
                type: 'yearly',
              }}
              actions={this.props.TaskActions}
            />
          </span>
        </div>
      </Fragment>
    );
  }
}

TasksPage.defaultProps = {
  yearlyTasksSorted: Map(),
  currentYearlyTaskSelectedId: ''
};

TasksPage.propTypes = {
  yearlyTasksSorted: PropTypes.object,
  currentYearlyTaskSelectedId: PropTypes.string,

  TaskActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    yearlyTasksSorted: yearlyTasksSortedSelector(state),
    currentYearlyTaskSelectedId: state.ui.getIn(['taskPage', 'selectedYearlyTaskId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
