import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, isImmutable } from 'immutable';
import moment from 'moment';

import task, { TaskActions, weeklyTasksSelector } from 'utility-redux/task';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import InputNewComponent from 'utility-react-component/Form/Input/New';

import {
  List, Input, Grid, Segment,
  Button, Icon
} from 'semantic-ui-react';

export class WeeklyTasksList extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  getWeeklyTasks = () => {
    const { weeklyTasks } = this.props;
    const res = [];
    const currentWeekNumber = moment().tz('Asia/Tokyo').isoWeek();

    for (let i = 0; i <= 53; i += 1) {
      res.push({
        weekNumber: i,
        startDate: moment().tz('Asia/Tokyo').startOf('isoWeek').add(i - currentWeekNumber, 'week')
          .format('MM-DD'),
        tasks: weeklyTasks.has(i.toString()) ? weeklyTasks.get(i.toString()) : Map(),
      });
    }

    return res;
  }

  render() {
    const currentWeekNumber = moment().tz('Asia/Tokyo').isoWeek();

    return (
      <Segment.Group>
        {
          this.getWeeklyTasks().filter(weekObject => weekObject.tasks.count() > 0 || weekObject.weekNumber >= currentWeekNumber).map(weekObject => (
            <Segment
              inverted
              attached
              key={weekObject.weekNumber}
            >
              <Grid as={List.Item}>
                <Grid.Column width={6}>
                  {`${weekObject.startDate} - W${weekObject.weekNumber} - ${weekObject.tasks.count()}`}
                </Grid.Column>
                <Grid.Column width={6}>
                  <InputNewComponent
                    inputName="content"
                    inputClassNames=""
                    newRecord={{
                      targetCompletion: moment().tz('Asia/Tokyo').startOf('isoWeek').add(weekObject.weekNumber - currentWeekNumber, 'week'),
                      type: 'weekly',
                    }}
                    actions={this.props.TaskActions}
                  />
                </Grid.Column>
              </Grid>

              <Segment.Group>
                {weekObject.tasks.count() > 0 && weekObject.tasks.map(weeklyTask => (
                  <Segment
                    inverted
                    attached
                    as={Grid}
                    key={weeklyTask.get('_id')}
                  >
                    <Grid.Column
                      width={10}
                    >
                      {weeklyTask.get('content')}
                    </Grid.Column>
                    <Grid.Column
                      width={4}
                    >
                      <Icon
                        color={weeklyTask.get('recur') === 'weekly' ? 'green' : 'grey'}
                        name="sync"
                        onClick={(_) => {
                          const newTask = weeklyTask.set('recur', weeklyTask.get('recur') === 'weekly' ? 'none' : 'weekly');
                          this.props.TaskActions.update(newTask);
                        }}
                      />

                      <Icon
                        color="blue"
                        name={weeklyTask.get('recur') === 'weekly' ? 'check' : 'close'}
                        onClick={(_) => {
                          if (weeklyTask.get('recur') === 'weekly') {
                            const newTask = weeklyTask.set('targetCompletion', moment(weeklyTask.get('targetCompletion')).add(1, 'week'));
                            this.props.TaskActions.update(newTask);
                          } else {
                            this.props.TaskActions.deleteRecord(weeklyTask);
                          }
                        }}
                      />
                    </Grid.Column>
                  </Segment>
                ))}
              </Segment.Group>
            </Segment>
          ))}
      </Segment.Group>
    );
  }
}

WeeklyTasksList.defaultProps = {
  weeklyTasks: Map(),
};

WeeklyTasksList.propTypes = {
  weeklyTasks: PropTypes.object,

  TaskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    weeklyTasks: weeklyTasksSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyTasksList);
