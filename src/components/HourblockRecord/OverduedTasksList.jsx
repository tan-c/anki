import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  connect
} from 'react-redux';
import {
  overduedTasksSelector,
  TaskActions,
} from 'utility-redux/task';
import {
  List, Icon
} from 'semantic-ui-react';
import { Map } from 'immutable';
import moment from 'moment';

// import { bindActionCreators } from 'redux';
export class OverduedTasksList extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }
  state = {}

  render() {
    const { overduedTasksList } = this.props;

    return (
      <List
        celled
        // ordered
        inverted
        style={{
          border: `1px solid ${overduedTasksList.size ? '#DB4848 ' : 'transparent'}`,
          width: '100%'
        }}
      >
        {/* overduedTasksList is actually a valueSet */}
        {overduedTasksList.map(task => (
          <List.Item key={task.get('_id')}>
            {`${moment(task.get('targetCompletion')).format('MM-DD')}`}

            <span
              style={{
                width: 30,
                backgroundColor: task.hasIn(['project', 'name']) ? task.getIn(['project', 'category', 'color']) : 'grey',
                display: 'inline-block',
                overflow: 'hidden'
              }}
            >
              {task.getIn(['project', 'name'])}
            </span>

            <span>
              {task.get('content')}
            </span>

            <List.Content floated="right">
              <Icon
                name="close"
                style={{
                  width: 15,
                  opacity: 0.5,
                  color: 'white'
                }}
                onClick={(_) => {
                  const res = confirm(`Deleting this task: ${task.get('content')}`);

                  if (res) {
                    this.props.TaskActions.deleteRecord(task);
                  }
                }}
              />
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

OverduedTasksList.defaultProps = {
  overduedTasksList: Map(),
};

OverduedTasksList.propTypes = {
  overduedTasksList: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    overduedTasksList: overduedTasksSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverduedTasksList);
