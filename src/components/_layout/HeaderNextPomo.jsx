import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  PlannedPomoActions,
  nextTwoPlannedPomosSelector,
  todayPlannedPomosSelector
} from 'utility-redux/plannedPomo';
import {
  DailyRecordActions,
  todayDailyRecordSelector,
} from 'utility-redux/dailyRecord';
import { TaskActions, todayTasksSelector } from 'utility-redux/task';
import { Grid, Input, Icon } from 'semantic-ui-react';

import { Map } from 'immutable';
import moment from 'moment';
// import { bindActionCreators } from 'redux';

export class Footer extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  state = {
    currentSectionOfDay: 0
  }

  componentDidMount() {
    this.updateCurrentTimer();
    this.updateCurrentTimeLoop();
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeRunner);
  }

  updateCurrentTimeLoop = () => {
    this.updateTimeRunner = setInterval(() => {
      this.updateCurrentTimer();
    }, 1000 * 60);
  }

  updateCurrentTimer = () => {
    this.setState({ // eslint-disable-line react/no-set-state
      currentSectionOfDay: moment().tz('Asia/Tokyo').hour() * 2 + parseInt(moment().minute() / 30, 10)
    });
  }

  saveDailyPomo = (sectionOfDay, plannedPomo) => {
    const { todayDailyRecord } = this.props;
    const newDailyRecord = todayDailyRecord.setIn(['pomo', (sectionOfDay).toString()], {
      sectionOfDay,
      content: '',
      project: plannedPomo.getIn(['project', '_id']),
      isCompliant: true,
    });
    this.props.DailyRecordActions.update(newDailyRecord);
  }

  onChangePlannedPomo = (sectionOfDay, plannedPomo, event) => {
    const { name, value } = event.target;

    const field = name.indexOf('.') === -1 ? [name] : [name.split('.')[0], name.split('.')[1]];
    const newPlannedPomo = plannedPomo.setIn(field, value);

    const { todayPlannedPomos } = this.props;
    const newPlannedPomos = todayPlannedPomos.setIn(['plannedPomos', sectionOfDay.toString()], newPlannedPomo);
    this.props.PlannedPomoActions.update(newPlannedPomos);
  }

  getPomo = (todayPlannedPomos, sectionOfDay) => (todayPlannedPomos.hasIn(['plannedPomos', sectionOfDay]) ? todayPlannedPomos.getIn(['plannedPomos', sectionOfDay]) : Map());

  renderPlannedPomoRow = (sectionOfDay, nextPlannedPomo) => (
    <Grid.Row
      style={{
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Grid.Column
        width={3}
        textAlign="center"
      >
        {moment().tz('Asia/Tokyo').startOf('day').add(sectionOfDay / 2, 'hour')
          .format('HH:mm')}

        <span style={{
          backgroundColor: `${nextPlannedPomo.getIn(['project', 'category', 'color'])}`,
          padding: '0 5px',
          margin: '0 5px',
          color: 'white'
          // overflow: 'hidden'
        }}
        >
          {nextPlannedPomo.hasIn(['project', 'category']) ? nextPlannedPomo.getIn(['project', 'name']) : ''}
        </span>
      </Grid.Column>

      <Grid.Column width={12}>
        {'主要: '}
        {nextPlannedPomo.has('tasks') ? `${nextPlannedPomo.getIn(['tasks', 'main'])}` : 'No Main'}
        {'  次要: '}
        {nextPlannedPomo.has('tasks') ? `${nextPlannedPomo.getIn(['tasks', 'recur'])}` : 'No Recur'}
      </Grid.Column>

      {/* <Grid.Column width={8}>
        <Input
          fluid
          type="text"
          size="mini"
          name="tasks.main"
          ref={(ref) => { this.hourblockPlanneMinorInput = ref; }}
          placeholder={nextPlannedPomo.getIn(['tasks', 'main'])}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.onChangePlannedPomo(sectionOfDay, nextPlannedPomo, event);
              this.hourblockPlanneMinorInput.value = '';
            }
          }}
        />
      </Grid.Column>

      <Grid.Column width={3}>
        {nextPlannedPomo.has('tasks') ? `${nextPlannedPomo.getIn(['tasks', 'recur'])}` : 'No Recur'}
      </Grid.Column> */}

      <Grid.Column width={1}>
        <Icon
          name="check"
          disabled={!this.props.todayDailyRecord.count() || this.props.todayDailyRecord.hasIn(['pomo', sectionOfDay])}
          onClick={event => this.saveDailyPomo(sectionOfDay, nextPlannedPomo)}
        />
      </Grid.Column>
    </Grid.Row>
  )

  render() {
    const {
      todayPlannedPomos,
      isTasksOn,
      todayTasks
    } = this.props;
    const { currentSectionOfDay } = this.state;

    return (
      <React.Fragment>
        {/* {isTasksOn && todayTasks.count() > 0 && todayTasks.map(task => (
          <Grid.Row
            key={task.get('_id')}
          >
            <div
              style={{
                width: 60,
                backgroundColor: `${task.getIn(['project', 'category', 'color'])}`,
                overflow: 'hidden'
              }}
            >
              {task.hasIn(['project', 'category']) ? task.getIn(['project', 'name']) : 'No Cate'}
            </div>

            <Grid.Column
              className="width-40 border-right-white text-center"
            >
              {task.get('estimateHour')}
            </Grid.Column>

            <Grid.Column
              className="width-40 border-right-white text-center"
            >
              {task.get('recur')}
            </Grid.Column>

            <Grid.Column
              className="flex-1 padding-horizontal-5"
            >
              {task.get('content')}
            </Grid.Column>

            <i
              role="button"
              tabIndex="-1"
              className="fa fa-fw fa-check width-30 height-lineheight-30"
              onClick={(_) => {
                if (task.has('recur') && task.get('recur') !== 'none') {
                  const taskMap = {
                    daily: 'day',
                    weekly: 'week',
                    monthly: 'month',
                    yearly: 'year',
                  };
                  this.props.TaskActions.update(task.set('targetCompletion', moment(task.get('targetCompletion')).add(1, taskMap[task.get('recur')])), task);
                } else {
                  this.props.TaskActions.deleteRecord(task);
                }
              }}
            />
          </Grid.Row>
        ))} */}

        {!isTasksOn && (
          <Fragment>
            {this.renderPlannedPomoRow(currentSectionOfDay, this.getPomo(todayPlannedPomos, currentSectionOfDay))}
            {/* {this.renderPlannedPomoRow((currentSectionOfDay + 1) % 48, this.getPomo(todayPlannedPomos, (currentSectionOfDay + 1) % 48))}
            {this.renderPlannedPomoRow((currentSectionOfDay + 2) % 48, this.getPomo(todayPlannedPomos, (currentSectionOfDay + 2) % 48))}
            {this.renderPlannedPomoRow((currentSectionOfDay + 3) % 48, this.getPomo(todayPlannedPomos, (currentSectionOfDay + 3) % 48))} */}
          </Fragment>
        )}
      </React.Fragment>
    );
  }
}

Footer.defaultProps = {
  todayPlannedPomos: Map(),
  todayDailyRecord: Map(),
  isTasksOn: false,
  todayTasks: Map(),
};

Footer.propTypes = {
  todayPlannedPomos: PropTypes.object,
  todayDailyRecord: PropTypes.object,
  isTasksOn: PropTypes.bool,
  todayTasks: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    todayPlannedPomos: todayPlannedPomosSelector(state),
    todayDailyRecord: todayDailyRecordSelector(state),
    isTasksOn: state.ui.getIn(['common', 'isTasksOn']),
    todayTasks: todayTasksSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    DailyRecordActions: bindActionCreators(DailyRecordActions, dispatch),
    PlannedPomoActions: bindActionCreators(PlannedPomoActions, dispatch),
    TaskActions: bindActionCreators(TaskActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
