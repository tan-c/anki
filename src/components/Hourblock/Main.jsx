import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from 'react-router-dom';
import HourblockPageConnected from './HourBlock/Page';
import PlanningPageConnected from './Planning/Page';
import TasksPageConnected from './Task/Page';
import SettingsPageConnected from './Settings/Page';

import FooterConnected from './_layout/Footer';
import LeftAsideConnected from './_layout/LeftAside';
import RightAsideConnected from './_layout/RightAside';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

import './hourblock.scss';

export class MainHourBlock extends React.Component {
  render() {
    const { showMonthlyCalendar } = this.props;

    return (
      <main id="hourblock" data-role="main-hourblock" className={`${window.isMobile && 'mobile'} ${showMonthlyCalendar && 'with-right-calendar'}`}>
        { !window.isMobile
        && (
          <React.Fragment>
            <FooterConnected />
            <LeftAsideConnected />
            {showMonthlyCalendar && <RightAsideConnected />}
          </React.Fragment>
        )
        }

        <Switch>
          <Route exact path="/hourblock" component={HourblockPageConnected} />
          <Route path="/hourblock/planning" component={PlanningPageConnected} />
          <Route path="/hourblock/tasks" component={TasksPageConnected} />
          <Route path="/hourblock/settings" component={SettingsPageConnected} />
        </Switch>
      </main>);
  }
}

MainHourBlock.defaultProps = {
  showMonthlyCalendar: false,
};

MainHourBlock.propTypes = {
  showMonthlyCalendar: PropTypes.bool,
};


function mapStateToProps(state, ownProps) {
  return {
    showMonthlyCalendar: state.ui.getIn(['hourblock', 'hourblockPage', 'showMonthlyCalendar']),
  };
}

export default connect(mapStateToProps)(MainHourBlock);
