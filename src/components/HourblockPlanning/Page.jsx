import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';
import { Grid } from 'semantic-ui-react';

import { UiActions } from 'utility-redux/ui';
import { PlannedPomoActions, plannedPomoByDayOfWeekSelector } from 'utility-redux/plannedPomo';
import PlanningItemConnected from './Item';
import CategoryInsightsConnected from '../Hourblock/LeftAside/CategoryInsights';
import WeeklyInsightsConnected from '../Hourblock/LeftAside/WeeklyInsights';

export class PlanningPage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  getHourblocks = () => {
    const hourblocks = [];
    for (let i = 0; i < 48; i += 1) {
      hourblocks.push(i);
    }
    return hourblocks;
  }

  updatePlannedPomo = (hourblock, day, options = {
    isDeleting: false
  }) => {
    const { isDeleting } = options;
    const { plannedPomos, selectedProjectId } = this.props;
    const dayPlannedPomo = plannedPomos.get(day.toString());
    let newDayPlannedPomo = null;

    if (isDeleting) {
      this.props.UiActions.updateIn(['hourblock', 'planningPage', 'updatingPlannedPomo'], true);
      newDayPlannedPomo = dayPlannedPomo.setIn(['plannedPomos', hourblock.toString(), 'project'], null);
    } else {
      if (!selectedProjectId.length) {
        return;
      }
      this.props.UiActions.updateIn(['hourblock', 'planningPage', 'updatingPlannedPomo'], true);
      const originalPomo = dayPlannedPomo.getIn(['plannedPomos', hourblock.toString()]);
      if (originalPomo === null) {
        newDayPlannedPomo = dayPlannedPomo.setIn(['plannedPomos', hourblock.toString()], Map({
          project: selectedProjectId,
        }));
      } else {
        newDayPlannedPomo = dayPlannedPomo.setIn(['plannedPomos', hourblock.toString(), 'project'], selectedProjectId);
      }
    }

    this.props.PlannedPomoActions.update(newDayPlannedPomo).then((res) => {
      this.props.UiActions.updateIn([
        'hourblock', 'planningPage', 'updatingPlannedPomo'
      ], false);
    });
  }

  updateRecurTask = (event, day, hourblock) => {
    if (event.keyCode === 13) {
      const { plannedPomos } = this.props;
      const plannedPomoDay = plannedPomos.get(day.toString());
      const newItem = plannedPomoDay.setIn(['plannedPomos', hourblock.toString(), 'tasks', 'recur'], event.target.value);
      this.props.PlannedPomoActions.update(newItem);
    }
  }

  render() {
    const { plannedPomos } = this.props;

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column
            width={2}
            className="left-aside"
            style={{
              overflow: 'auto'
            }}
          >
            <CategoryInsightsConnected />
            <WeeklyInsightsConnected />
          </Grid.Column>

          <Grid.Column
            width={14}
            style={{
              overflow: 'auto'
            }}
          >

            {/* <Grid columns={3}>
            </Grid> */}
            <Grid columns={8}>
              <Grid.Column></Grid.Column>
              {plannedPomos.keySeq().map((key, index) => (
                <Grid.Column key={key}>
                  {parseInt(key, 10) + 1}
                </Grid.Column>))}
            </Grid>

            {this.getHourblocks().map(hourblock => (
              <Grid.Row
                className={`flex-container-row typical-setup border-bottom ${hourblock % 2 === 0 && 'border-top'} ${hourblock % 4 === 0 && 'border-top-white'}`}
                key={hourblock}
              >
                <span className="width-50">
                  {moment().tz('Asia/Tokyo').startOf('day').add(hourblock / 2, 'hour')
                    .format('HH:mm')}
                </span>

                {[0, 1, 2, 3, 4, 5, 6].map(day => (
                  <PlanningItemConnected
                    key={day}
                    hourblock={hourblock}
                    day={day}
                    plannedPomo={plannedPomos.getIn([day.toString(), 'plannedPomos', hourblock.toString()]) || Map()}
                    updatePlannedPomo={this.updatePlannedPomo}
                    updateRecurTask={this.updateRecurTask}
                  />
                ))}
              </Grid.Row>))}
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

PlanningPage.defaultProps = {
  selectedProjectId: '',
};

PlanningPage.propTypes = {
  plannedPomos: PropTypes.object.isRequired,
  selectedProjectId: PropTypes.string,

  UiActions: PropTypes.object.isRequired,
  PlannedPomoActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    plannedPomos: plannedPomoByDayOfWeekSelector(state),
    selectedProjectId: state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    PlannedPomoActions: bindActionCreators(PlannedPomoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanningPage);
