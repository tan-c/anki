import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import keydown from 'react-keydown';

import {
  Sidebar,
  Segment,
  Container,
  Grid,
  Menu
} from 'semantic-ui-react';

// import { Menu, Container } from 'semantic-ui-react';

import {
  Switch, Route, Redirect, withRouter
} from 'react-router-dom';

import { currentUserSelector } from 'utility-redux/user';
// import { UiActions } from 'utility-redux/ui';

import '../../../node_modules/toastr/toastr.less';
import '../../../node_modules/semantic-ui-less/semantic.less';

// @import '~semantic-ui-css/semantic.min.css';
// import toastr from 'toastr';

import LoginPageConnected from 'utility-react-component/Page/LoginPage';

import HeaderConnected from './components/_layout/Header';
import FooterConnected from './components/_layout/Footer';
import LeftSidebarConnected from './components/_layout/LeftSidebar';
import RightSidebarConnected from './components/_layout/RightSidebar';

import SubHeaderConnected from './components/_layout/SubHeader';
// import SettingsConnected from './components/_layout/Settings';
import AnkiListConnected from './components/AnkiList/List';
import IntelNotesConnected from './components/IntelNotes/Page';
import HousingPricesConnected from './components/HousingPrices/Page';
import HourblockConnected from './components/Hourblock/Page';

import NoteConnected from './components/UserNote';
import AnkiPageConnected from './components/AnkiLearn/Page';
import AnkiTagsPageConnected from './components/AnkiTags/Page';

import HourblockPlanningPageConnected from './components/HourblockPlanning/Page';
import HourblockTaskPageConnected from './components/HourblockTask/Page';
import HourblockSettingPageConnected from './components/HourblockSettings/Page';
import HourblockCalendarPageConnected from './components/HourblockCalendar/Page';
import HourblockWorkoutPageConnected from './components/HourblockWorkout/Page';


import EyeModal from './components/_modal/Eye';
import ErrorBoundary from './ErrorBoundary';

import './index.scss';
// import { callbackify } from 'util';
// import { subscribeUser } from './helper/notification';

window.isMobile = Math.min(document.documentElement.clientWidth, screen.width) <= 450; // P9 is 424

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Prevent default bounce effect
    document.addEventListener('touchmove', (event) => {
      event.preventDefault();
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { currentUser, history } = this.props;

  //   if (!currentUser.has('config') && nextProps.currentUser.has('config')) {
  //     const currentApp = nextProps.currentUser.getIn(['config', 'recentApp']);
  //     const path = currentApp.slice(0, 2);
  //     if (history.location.pathname.indexOf(path) === -1) {
  //       // Only push if not on this path
  //       // As pushing same path twice gives you erro
  //       history.push(`/${path}`);
  //     }
  //   }

  //   // if (currentUser.size === 0 && nextProps.currentUser.size > 0) {
  //   //   subscribeUser();
  //   // }
  // }


  @keydown('esc')
  dismissAllModel() {
    this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
  }

  render() {
    const {
      currentUser,
      isLeftSidebarOn,
      isRightSidebarOn
    } = this.props;

    const eyeSaving = currentUser.hasIn(['config', 'eyeSaving'])
      && currentUser.getIn(['config', 'eyeSaving']);

    return (
      <ErrorBoundary>
        <div
          id="version" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            background: 'red',
            zIndex: 111
          }}
        >
          {process.env.GIT_VERSION
            ? process.env.GIT_VERSION.slice(0, 6)
            : 'Undefined'}
        </div>

        {!currentUser.has('_id') || currentUser.get('_id') === null
          ? <LoginPageConnected pageName="Anki" />
          : (
            <React.Fragment>
              {isLeftSidebarOn && (
                <Sidebar
                  as={Menu}
                  animation="push"
                  inverted
                  vertical
                  visible
                  width="thin"
                  style={{
                    width: 140,
                  }}
                >
                  <LeftSidebarConnected />
                </Sidebar>
              )}

              {isRightSidebarOn && <RightSidebarConnected />}

              <Menu
                fixed="top"
                inverted
                color="blue"
                // inverted
                data-role="header"
                style={{
                  height: 50,
                  width: `${isLeftSidebarOn ? 'calc(100% - 140px)' : '100%'}`,
                  left: 0, // `${isLeftSidebarOn ? '140px' : 0}`,
                  zIndex: 100,
                  position: 'absolute'
                }}
              >
                <HeaderConnected />
              </Menu>

              <Menu
                attached
                data-role="subheader"
                id="subheader"
                style={{
                  paddingLeft: 10,
                  marginTop: 50,
                  height: 30,
                  width: `${isLeftSidebarOn ? 'calc(100% - 140px)' : '100%'}`,
                  marginLeft: `${isLeftSidebarOn ? '140px' : 0}`,
                  zIndex: 100,
                  position: 'absolute'
                }}
              >
                <SubHeaderConnected />
              </Menu>

              <Grid style={{
                width: `${isLeftSidebarOn ? 'calc(100% - 140px)' : '100%'}`,
                left: `${isLeftSidebarOn ? '140px' : 0}`,
                position: 'absolute',
                overflow: 'auto',
                zIndex: 1,
                height: 'calc(100vh - 80px)',
                background: 'black',
                color: 'white',
                top: 80,
                margin: 0
              }}
              >
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => <NoteConnected field="notes" />}
                  />
                  <Route
                    path="/anki/list"
                    component={AnkiPageConnected}
                  />
                  <Route
                    path="/anki/learn"
                    component={AnkiListConnected}
                  />
                  <Route
                    path="/anki/tag"
                    component={AnkiTagsPageConnected}
                  />
                  <Route
                    exact
                    path="/hourblock"
                    component={HourblockConnected}
                  />
                  <Route
                    path="/hourblock/calendar"
                    component={HourblockCalendarPageConnected}
                  />
                  <Route
                    path="/hourblock/workout"
                    component={HourblockWorkoutPageConnected}
                  />
                  <Route
                    path="/hourblock/planning"
                    component={HourblockPlanningPageConnected}
                  />
                  <Route
                    path="/hourblock/task"
                    component={HourblockTaskPageConnected}
                  />
                  <Route
                    path="/hourblock/setting"
                    component={HourblockSettingPageConnected}
                  />
                  <Route
                    exact
                    path="/notes"
                    component={IntelNotesConnected}
                  />
                  <Route
                    path="/housingPrices"
                    component={HousingPricesConnected}
                  />
                  <Redirect from="/housingPrices/*" to="/housingPrices" />
                  <Redirect from="/*" to="/" />
                </Switch>
              </Grid>

              {/* <FooterConnected /> */}
              {/* <SettingsConnected /> */}

              {eyeSaving && <EyeModal />}
              {/* </Sidebar.Pusher>
                  </Sidebar.Pushable> */}
            </React.Fragment>
          )
        }
      </ErrorBoundary>
    );
  }
}

App.defaultProps = {
  currentUser: Map(),
  isLeftSidebarOn: false,
  isRightSidebarOn: true,
};

App.propTypes = {
  isLeftSidebarOn: PropTypes.bool,
  isRightSidebarOn: PropTypes.bool,
  // history: PropTypes.object.isRequired,

  currentUser: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    isLeftSidebarOn: state.ui.getIn(['isLeftSidebarOn']),
    isRightSidebarOn: state.ui.getIn(['isRightSidebarOn']),

    showModal: state.ui.getIn(['showModal']),
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // UiActions: bindActionCreators(UiActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
