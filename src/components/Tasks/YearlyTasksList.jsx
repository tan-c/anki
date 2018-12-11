import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import {
  Header, Label, List, Input
} from 'semantic-ui-react';

import {
  TaskActions,
  yearlyTasksSortedSelector
} from 'utility-redux/task';

import InputControlled from 'utility-react-component/Form/Input/Controlled';
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
              {/* <Label
                color={task.get('priority') >= 3 ? 'red' : task.get('priority') >= 1 ? 'orange' : 'grey'} // eslint-disable-line
                horizontal
                onClick={(_) => {
                  this.props.TaskActions.update(task.set('priority', task.get('priority') + 1), task);
                }}
              >
                {task.get('priority')}
              </Label> */}

              <Input
                style={{
                  width: 40
                }}
                size="mini"
                focus
                placeholder={task.get('priority')}
                onKeyDown={(event) => {
                  if (event.which === 13) {
                    this.props.TaskActions.update(task.set('priority', event.target.value), task);
                  }
                }}
              />

              <span className="width-60">
                <ProjectSelectConnected
                  onChangeEvent={event => this.props.TaskActions.update(task.set('project', event.target.value), task)}
                  value={task.getIn(['project', '_id'])}
                  color={task.getIn(['project', 'category', 'color'])}
                />
              </span>

              <InputControlled
                inputName="content"
                inputClassNames="flex-2"
                record={task}
                actions={this.props.TaskActions}
              />

              <Input
                style={{
                  width: 120
                }}
                size="mini"
                focus
                type="date"
                value={task.has('targetCompletion') ? moment(task.get('targetCompletion')).format('YYYY-MM-DD') : ''}
                onChange={(event) => {
                  this.props.TaskActions.update(task.set('targetCompletion', event.target.value), task);
                }}
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

              <i
                className="fa fa-fw fa-check width-15"
                role="button"
                tabIndex="-1"
                style={{
                  color: task.get('dailyTasksAssociated') ? 'grey' : 'green'
                }}
                disabled={task.get('dailyTasksAssociated')}
                onClick={(_) => {
                  this.props.TaskActions.deleteRecord(task);
                }}
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
