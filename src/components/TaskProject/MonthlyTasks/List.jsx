import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import InputNewConnected from 'utility-react-component/Form/Input/New';

import {
  TaskActions,
  monthlyTasksSelector,
  selectedYearlyTaskSelector,
} from 'utility-redux/task';

import MonthlyTasksRowConnected from './Row';

export class MonthlyTasksList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { selectedYearlyTask, monthlyTasks } = this.props;

    return (
      <React.Fragment>
        <div className="section-header" style={{ background: selectedYearlyTask.getIn(['project', 'category', 'color']) }}>
          {selectedYearlyTask.get('content')}
          {' '}
          Details
          {' '}
        </div>

        <div className="section-content">
          {selectedYearlyTask.size && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => (
            <div key={month} className="margin-bottom-10">
              <div className="flex-container-row typical-setup">
                <span className="flex-1">
                  {moment().tz('Asia/Tokyo').startOf('year').add(month, 'month')
                    .format('MMM')}
                </span>

                <InputNewConnected
                  inputName="content"
                  inputClassNames="flex-3"
                  newRecord={{
                    targetCompletion: moment().tz('Asia/Tokyo').startOf('year').add(month, 'month'),
                    type: 'monthly',
                    project: selectedYearlyTask.getIn(['project', '_id']),
                  }}
                  actions={this.props.TaskActions}
                />
                <span className="width-20" />
              </div>

              {monthlyTasks.has(month.toString()) && monthlyTasks.get(month.toString()).map(task => (
                <MonthlyTasksRowConnected key={task.get('_id')} task={task} />
              ))}
            </div>))
          }
        </div>
      </React.Fragment>
    );
  }
}

MonthlyTasksList.defaultProps = {
  monthlyTasks: Map(),
  selectedYearlyTask: Map(),
};

MonthlyTasksList.propTypes = {
  monthlyTasks: PropTypes.object,
  selectedYearlyTask: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    monthlyTasks: monthlyTasksSelector(state),
    selectedYearlyTask: selectedYearlyTaskSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyTasksList);
