import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { Grid } from 'semantic-ui-react';
import EventListConnected from './Events/List';
import EventRecordsListConnected from './Events/EventRecords/List';

import SelectedProjectDetailsConnected from './Projects/SelectedProjectDetails';
import CategoriesListConnected from './Projects/CategoriesList';

import CategoryInsightsConnected from '../Hourblock/LeftAside/CategoryInsights';
import WeeklyInsightsConnected from '../Hourblock/LeftAside/WeeklyInsights';

import DailyPomoCountConnected from './DailyPomoCount';

export class SettingsPage extends React.Component {
  render() {
    const { edittingTarget } = this.props;

    return (
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

        {edittingTarget === 'events'
          && (
            <React.Fragment>
              <Grid.Column
                width={9}
              >
                <EventListConnected />
              </Grid.Column>

              <Grid.Column
                width={5}
              >
                <EventRecordsListConnected />
              </Grid.Column>
            </React.Fragment>
          )
        }

        {edittingTarget === 'projects'
          && (
            <React.Fragment>
              <Grid.Column
                width={9}
              >
                <CategoriesListConnected />
              </Grid.Column>

              <Grid.Column
                width={5}
              >
                <SelectedProjectDetailsConnected />
              </Grid.Column>
            </React.Fragment>
          )
        }

        {edittingTarget === 'dailyPomoCount'
          && (
            <Grid.Column width={14}>
              <DailyPomoCountConnected />
            </Grid.Column>
          )
        }
      </Grid.Row>
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
