import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment-timezone';

import { UiActions } from 'utility-redux/common/ui';
import { PlannedPomoActions, plannedPomoByDayOfWeekSelector } from 'utility-redux/hourblock/plannedPomo';
import PlanningItemConnected from './Item';

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

  updatePlannedPomo = (hourblock, day, isDeleting = false) => {
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
      this.props.UiActions.updateIn(['hourblock', 'planningPage', 'updatingPlannedPomo'], false);
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
      <div data-role="planning-page" className="page">
        <section className="flex-1">
          <div className="section-header">
            <span className="flex-container-row border-bottom">
              <span className="flex-1 border-right" />
              {plannedPomos.keySeq().map((key, index) => (
                <span className="flex-4 border-right" key={key}>
                  {parseInt(key, 10) + 1}
                </span>))}
            </span>
          </div>

          <div className="section-content">
            {this.getHourblocks().map(hourblock => (
              <span className={`flex-container-row typical-setup border-bottom ${hourblock % 2 === 0 && 'border-top'} ${hourblock % 4 === 0 && 'border-top-white'}`} key={hourblock}>
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
              </span>))}
          </div>
        </section>
      </div>
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
