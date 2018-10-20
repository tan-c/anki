import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import EventListConnected from './Events/List';
import EventRecordsListConnected from './Events/EventRecords/List';

import WorkoutListConnected from './Workouts/List';
import WorkoutRecordsListConnected from './Workouts/WorkoutRecords/List';

// import CaloriesListConnected from './Calories/List';
import DailyMeasurementsListConnected from './Calories/DailyMeasurementsList';

import SelectedProjectDetailsConnected from './Projects/SelectedProjectDetails';
import CategoriesListConnected from './Projects/Categories/List';

import DailyPomoCountConnected from './DailyPomoCount';

export class SettingsPage extends React.Component {
  render() {
    const { edittingTarget } = this.props;

    return (
      <div data-role="settings-page" className="flex-container-row page">
        {edittingTarget === 'events'
          && (
            <React.Fragment>
              <EventListConnected />

              <section className="flex-1">
                <EventRecordsListConnected />
              </section>
            </React.Fragment>
          )
        }

        {edittingTarget === 'workouts'
          && (
            <React.Fragment>
              <section className="flex-1">
                <WorkoutListConnected />
              </section>
              <section className="flex-1 flex-container no-bg">
                <WorkoutRecordsListConnected />
              </section>
            </React.Fragment>
          )
        }


        {edittingTarget === 'calories'
          && (
            <React.Fragment>
              {/* <section className="flex-1">
              <CaloriesListConnected />
            </section> */}
              <section className="flex-1 flex-container no-bg">
                <DailyMeasurementsListConnected />
              </section>
            </React.Fragment>
          )
        }

        {edittingTarget === 'projects'
          && (
            <React.Fragment>
              <section className="flex-2">
                <CategoriesListConnected />
              </section>
              <section className="flex-1">
                <SelectedProjectDetailsConnected />
              </section>
            </React.Fragment>
          )
        }

        {edittingTarget === 'dailyPomoCount'
          && (
            <section className="flex-2">
              <DailyPomoCountConnected />
            </section>
          )
        }
      </div>
    );
  }
}

SettingsPage.defaultProps = {
  edittingTarget: 'projects',
};

SettingsPage.propTypes = {
  edittingTarget: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    edittingTarget: state.ui.getIn(['hourblock', 'settingsPage', 'edittingTarget']),
  };
}

export default connect(mapStateToProps)(SettingsPage);