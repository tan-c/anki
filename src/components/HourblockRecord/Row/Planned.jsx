import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { currentUserSelector } from 'utility-redux/user';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import InputNewConnected from 'utility-react-component/Form/Input/New';

import {
  Icon,
  Popup,
  List,
  Input
} from 'semantic-ui-react';

// import { DailyRecordActions } from 'utility-redux/dailyRecord';
// FIXME: should be using the input controlled here but keydown event is different
// import InputControlled from 'utility-react-component/Form/Input/Controlled';

export class HourBlockRowPlanned extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mainTask: props.plannedPomo.hasIn(['tasks', 'main']) ? props.plannedPomo.getIn(['tasks', 'main']) : '',
      minorTask: props.plannedPomo.hasIn(['tasks', 'minor']) ? props.plannedPomo.getIn(['tasks', 'minor']) : '',
      // recurTask: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    ['main', 'minor'].forEach((t) => {
      if (nextProps.plannedPomo.hasIn(['tasks', t]) && nextProps.plannedPomo.getIn(['tasks', t]) !== this.state[`${t}Task`]) {
        this.setState({
          [`${t}Task`]: nextProps.plannedPomo.getIn(['tasks', t]),
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    Object.keys(nextProps).forEach((key) => {
      if (JSON.stringify(this.props[key]) !== JSON.stringify(nextProps[key])) {
        shouldUpdate = true;
      }
    });

    Object.keys(nextState).forEach((key) => {
      if (JSON.stringify(this.state[key]) !== JSON.stringify(nextProps[key])) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  render() {
    const { mainTask, minorTask } = this.state;
    const {
      sectionOfDay, onChangePlannedPomo, plannedPomo, sectionName,
      currentUser,
      currentSectionOfDay,
      isToday,
      recordPomo,
    } = this.props;

    // const mainTaskLocked = plannedPomo.has('mainTaskLocked') && plannedPomo.get('mainTaskLocked');
    const isTodayPast = isToday && currentSectionOfDay > sectionOfDay;
    const disableMainTaskInput = isToday && currentSectionOfDay > sectionOfDay;

    // const isUnFinished = !recordPomo.hasIn(['project', '_id']) && isTodayPast;

    return (
      <React.Fragment>
        <span
          className={'width-50 height-lineheight-30}'}
        >
          {sectionName}
        </span>

        <span
          className="width-80 border-right-white height-lineheight-30"
          style={{
            backgroundColor: plannedPomo.getIn(['project', 'category', 'color']),
            textAlign: 'center'
          }}
        >
          <ProjectSelectConnected
            className="width-80 border-right-white height-lineheight-30"
            value={plannedPomo.getIn(['project', '_id'])}
            onChangeEvent={event => onChangePlannedPomo(sectionOfDay, plannedPomo, event)}
            color={plannedPomo.getIn(['project', 'category', 'color'])}
          />
        </span>
      </React.Fragment>
    );
  }
}

HourBlockRowPlanned.defaultProps = {
  isToday: false,

  currentUser: Map(),
  currentSectionOfDay: 0,
  sectionOfDay: 0,
  sectionName: '',
  plannedPomo: Map(),
  recordPomo: Map(),
  onChangePlannedPomo: () => { }
};

HourBlockRowPlanned.propTypes = {
  isToday: PropTypes.bool,
  currentSectionOfDay: PropTypes.number,
  currentUser: PropTypes.object,
  sectionOfDay: PropTypes.number,
  sectionName: PropTypes.string,
  plannedPomo: PropTypes.object,
  recordPomo: PropTypes.object,
  onChangePlannedPomo: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    isToday: ownProps.isToday,
    currentSectionOfDay: ownProps.currentSectionOfDay,
    sectionOfDay: ownProps.sectionOfDay,
    sectionName: ownProps.sectionName,
    plannedPomo: ownProps.plannedPomo,
    recordPomo: ownProps.recordPomo,
    onChangePlannedPomo: ownProps.onChangePlannedPomo,

    currentUser: currentUserSelector(state),
    isUpdatingPlannedPomo: ownProps.isUpdatingPlannedPomo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // DailyRecordActions: bindActionCreators(DailyRecordActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourBlockRowPlanned);
