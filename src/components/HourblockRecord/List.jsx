import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
import { withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import toastr from 'toastr';

import { PlannedPomoActions, plannedPomoByDayOfWeekSelector } from 'utility-redux/plannedPomo';
import { DailyRecordActions, dailyRecordByDayOfYearSelector } from 'utility-redux/dailyRecord';

import { UiActions } from 'utility-redux/ui';

import HourBlockRowRecordConnected from './Row/Record';
import HourBlockRowPlannedConnected from './Row/Planned';

export class HourBlockList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const calendarList = {};
    for (let i = 0; i <= 47; i += 1) {
      calendarList[i] = {
        sectionOfDay: i,
        sectionName: moment().tz('Asia/Tokyo').startOf('day').add(i * 30, 'minute')
          .format('HH:mm'),
        content: '',
      };
    }

    this.state = {
      calendarList,
      isUpdatingPlannedPomo: false,
    };

    setInterval((_) => {
      this.updateCurrentSection();
    }, 1000 * 60 * 2); // 2 minutes the ui update for currentSectionOfDay should be populated
  }

  componentDidMount() {
    this.updateCurrentSection();
  }

  // TODO: bring back saving pomo from SW in the future
  // componentWillReceiveProps(nextProps) {
  //   const { location, history, plannedPomos } = this.props;

  //   // This is for the trigger from clicking the notification
  //   const keyAction = 'swAction=applyPomo';
  //   if (location.search.indexOf(keyAction) === -1 && nextProps.location.search.indexOf(keyAction) > -1) {
  //     const pomoIndex = nextProps.location.search.split('pomoIndex=')[1]; // .split("&")[1]

  //     const plannedPomo = plannedPomos.getIn(['plannedPomos', pomoIndex.toString()]);
  //     if (!plannedPomo.hasIn(['project', '_id'])) {
  //       toastr.error('This Pomo Has No Project Set');
  //       return;
  //     }

  //     this.addPomoRecord({
  //       target: {
  //         value: plannedPomo.getIn(['project', '_id']),
  //       },
  //     }, pomoIndex);

  //     history.push({ search: '' });
  //   }
  // }

  onChangePlannedPomo = (sectionOfDay, plannedPomo, event) => {
    this.setState({
      isUpdatingPlannedPomo: true,
    });

    const { name, value } = event.target;

    const field = name.indexOf('.') === -1 ? [name] : [name.split('.')[0], name.split('.')[1]];
    const newPlannedPomo = plannedPomo.setIn(field, value);

    const { plannedPomos } = this.props;
    const newPlannedPomos = plannedPomos.setIn(['plannedPomos', sectionOfDay.toString()], newPlannedPomo);

    this.props.PlannedPomoActions.update(newPlannedPomos).then((_) => {
      this.setState({
        isUpdatingPlannedPomo: false,
      });
    });
  }

  updateCurrentSection = () => {
    const nextSectionOfDay = moment().hour() * 2 + parseInt(moment().minute() / 30, 10); // 1-indexed

    const { currentSectionOfDay } = this.props;

    if (currentSectionOfDay !== nextSectionOfDay && document.getElementById('hourblockList') !== null) {
      this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'currentSectionOfDay'], nextSectionOfDay);
      document.getElementById('hourblockList').scrollTop = nextSectionOfDay * 25; // Scroll to current section
    }
  }

  addPomoRecord = (event, sectionOfDay) => {
    const {
      currentDayRecord,
      plannedPomos,
      projects
    } = this.props;
    const plannedPomo = plannedPomos.getIn(['plannedPomos', sectionOfDay.toString()]);
    // const mainTask = plannedPomo !== undefined && plannedPomo.hasIn(['tasks', 'main']) ? plannedPomo.getIn(['tasks', 'main']) : '';

    const newDailyRecord = currentDayRecord.setIn(['pomo', (sectionOfDay).toString()], {
      sectionOfDay,
      content: event.target.content === undefined ? '' : event.target.content,
      project: event.target.value,
      category: projects.getIn([event.target.value, 'category', '_id']),
      isCompliant: event.target.isCompliant,
    });

    this.props.DailyRecordActions.update(newDailyRecord);

    // NOTE: This will reset the project
    // if (sectionOfDay >= 12) {
    //   plannedPomo = plannedPomo.set('project', null);
    // }

    // Also reset the selected project if not locked
    this.onChangePlannedPomo(sectionOfDay, plannedPomo, {
      target: {
        name: 'tasks.main',
        value: '',
      },
    });
  };

  render() {
    const { calendarList } = this.state;
    const {
      currentDayRecord,
      plannedPomos,
      currentSectionOfDay,
      isoWeekDay,
    } = this.props;
    const { isUpdatingPlannedPomo } = this.state;
    const defaultProps = Map();

    return (
      <div
        className="section-content"
        id="hourblockList"
        data-role="hourblock-list"
      >
        {Object.values(calendarList).map((item, index) => (
          <div
            className={`flex-container-row typical-setup height-30 ${item.sectionOfDay % 4 === 0 ? 'border-top-white-70 margin-top-30' : 'border-top-white-20'}}`}
            key={item.sectionOfDay}
          >
            <div
              className={`flex-3 flex-container-row ${currentSectionOfDay === item.sectionOfDay && 'border-bright-green'}`}
            >
              <HourBlockRowPlannedConnected
                sectionOfDay={item.sectionOfDay}
                isToday={isoWeekDay === moment().isoWeekday()}
                sectionName={item.sectionName}
                currentDayRecord={currentDayRecord}
                currentSectionOfDay={currentSectionOfDay}
                onChangePlannedPomo={this.onChangePlannedPomo}
                isUpdatingPlannedPomo={isUpdatingPlannedPomo}
                plannedPomo={plannedPomos.getIn(['plannedPomos', (item.sectionOfDay).toString()]) || defaultProps}
                recordPomo={currentDayRecord.getIn(['pomo', (item.sectionOfDay).toString()]) || defaultProps}
              />
            </div>

            <div
              className={`width-60 flex-container-row ${currentSectionOfDay === item.sectionOfDay && 'bg-bright-green'}`}
            >
              <HourBlockRowRecordConnected
                sectionOfDay={item.sectionOfDay}
                isToday={isoWeekDay === moment().isoWeekday()}
                currentSectionOfDay={currentSectionOfDay}
                recordPomo={currentDayRecord.getIn(['pomo', (item.sectionOfDay).toString()]) || defaultProps}
                addPomoRecord={this.addPomoRecord}
                plannedPomo={plannedPomos.getIn(['plannedPomos', (item.sectionOfDay).toString()]) || defaultProps}
                isUpdatingPlannedPomo={isUpdatingPlannedPomo}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

HourBlockList.defaultProps = {
  projects: Map(),
  currentDayRecord: Map(),
  plannedPomos: Map(),
  currentSectionOfDay: 0,
};

HourBlockList.propTypes = {
  projects: PropTypes.object,

  // location: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,

  isoWeekDay: PropTypes.number.isRequired,
  currentSectionOfDay: PropTypes.number,
  currentDayRecord: PropTypes.object,
  plannedPomos: PropTypes.object,

  PlannedPomoActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
  DailyRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects,

    isoWeekDay: ownProps.dayMomentObject.isoWeekday(),
    // projectsById: state.projects,
    currentSectionOfDay: state.ui.getIn(['hourblock', 'hourblockPage', 'currentSectionOfDay']),

    plannedPomos: plannedPomoByDayOfWeekSelector(state).get((ownProps.dayMomentObject.isoWeekday() - 1).toString()),
    // todayPlannedPomos: todayPlannedPomosSelector(state),
    currentDayRecord: dailyRecordByDayOfYearSelector(state).get(ownProps.dayMomentObject.dayOfYear().toString()),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PlannedPomoActions: bindActionCreators(PlannedPomoActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
    DailyRecordActions: bindActionCreators(DailyRecordActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HourBlockList));
