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
  Menu,
  Responsive
} from 'semantic-ui-react';

// import { Menu, Container } from 'semantic-ui-react';

import {
  Switch, Route, Redirect, withRouter
} from 'react-router-dom';

import { currentUserSelector } from 'utility-redux/user';
// import { UiActions } from 'utility-redux/ui';

import '../../node_modules/toastr/toastr.less';
import '../../node_modules/semantic-ui-less/semantic.less';

// @import '~semantic-ui-css/semantic.min.css';
// import toastr from 'toastr';

import AbyssinianPageConnected from './components/Abyssinian/Page';


import HeaderConnected from './components/_layout/Header';
import FooterNextPomoConnected from './components/_layout/FooterNextPomo';
import LeftSidebarConnected from './components/_layout/LeftSidebar';
import RightSidebarConnected from './components/_layout/RightSidebar';

import AnkiListConnected from './components/AnkiList/List';
import IntelNotesConnected from './components/IntelNotes/Page';
import HousingDataConnected from './components/HousingData/Page';
import HourblockRecordConnected from './components/HourblockRecord/Page';

import NoteConnected from './components/UserNote';
import AnkiLearnPageConnected from './components/AnkiLearn/Page';
import AnkiTagsPageConnected from './components/AnkiTags/Page';

import HourblockPlanningPageConnected from './components/HourblockPlanning/Page';
import HourblockSettingPageConnected from './components/HourblockSettings/Page';
import HourblockWorkoutPageConnected from './components/HourblockWorkout/Page';

import TaskDailyPageConnected from './components/TaskDaily/Page';

import EyeModal from './components/_modal/Eye';
import ErrorBoundary from './ErrorBoundary';

import './index.scss';
// import { callbackify } from 'util';
// import { subscribeUser } from './helper/notification';

// window.isMobile = Math.min(document.documentElement.clientWidth, screen.width) <= 450; // P9 is 424

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Prevent default bounce effect
    document.addEventListener('touchmove', (event) => {
      event.preventDefault();
    });
  }

  state = {
    viewGreaterThan450: true
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

  componentDidMount() {
    this.handleOnUpdate();
  }

  handleOnUpdate = () => {
    this.setState({
      viewGreaterThan450: Math.min(document.documentElement.clientWidth, screen.width) >= 450
    });
  }

  @keydown('esc')
  dismissAllModel() {
    this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
  }

  render() {
    const {
      currentUser,
      isRightSidebarOn,
      isHeaderNextPomoOn
    } = this.props;

    const {
      viewGreaterThan450
    } = this.state;

    const eyeSaving = currentUser.hasIn(['config', 'eyeSaving'])
      && currentUser.getIn(['config', 'eyeSaving']);

    return (
      <ErrorBoundary>
        <div
          id="version"
          style={{
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
          ? <AbyssinianPageConnected />
          : (
            <React.Fragment>
              <Responsive
                minWidth={450}
              >
                <Sidebar
                  as={Menu}
                  animation="push"
                  inverted
                  vertical
                  visible
                  width="thin"
                >
                  <LeftSidebarConnected />
                </Sidebar>
              </Responsive>

              {isRightSidebarOn && (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  direction="right"
                  // inverted
                  vertical
                  visible
                  width="thin"
                  style={{
                    // width: 140,
                  }}
                >
                  <RightSidebarConnected />
                </Sidebar>
              )}

              {isHeaderNextPomoOn && (
                <Grid style={{
                  position: 'fixed',
                  bottom: 0,
                  left: '10%',
                  width: '80%',
                  height: 20,
                  lineHeight: '20px',
                  border: '1px solid black',
                  background: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 1000,
                  padding: 0,
                  margin: 0
                }}
                >
                  <FooterNextPomoConnected />
                </Grid>
              )}


              <Responsive
                onUpdate={this.handleOnUpdate}
                as={Menu}
                fixed="top"
                inverted
                color="blue"
                data-role="header"
                style={{
                  height: 30,
                  width: `${viewGreaterThan450 ? 'calc(100% - 140px)' : '100%'}`,
                  left: `${viewGreaterThan450 ? '140px' : 0}`,
                  zIndex: 100,
                  position: 'absolute'
                }}
              >
                <HeaderConnected />
              </Responsive>


              <Responsive
                onUpdate={this.handleOnUpdate}
                as={Grid}
                style={{
                  width: `${viewGreaterThan450 ? 'calc(100% - 140px)' : '100%'}`,
                  left: `${viewGreaterThan450 ? '140px' : 0}`,
                  position: 'absolute',
                  overflow: 'auto',
                  zIndex: 1,
                  height: 'calc(100vh)',
                  background: 'black',
                  color: 'white',
                  margin: 0,
                  // top: 60,
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
                    component={AnkiListConnected}
                  />
                  <Route
                    path="/anki/learn"
                    component={AnkiLearnPageConnected}
                  />
                  <Route
                    path="/anki/tag"
                    component={AnkiTagsPageConnected}
                  />
                  <Route
                    exact
                    path="/hourblock/record"
                    component={HourblockRecordConnected}
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
                    path="/hourblock/setting"
                    component={HourblockSettingPageConnected}
                  />
                  <Route
                    path="/task/daily"
                    component={TaskDailyPageConnected}
                  />
                  <Route
                    exact
                    path="/notes"
                    component={IntelNotesConnected}
                  />
                  <Route
                    path="/housingDatas"
                    component={HousingDataConnected}
                  />
                  <Redirect from="/housingDatas/*" to="/housingDatas" />
                  <Redirect from="/*" to="/" />
                </Switch>
              </Responsive>

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
  isRightSidebarOn: true,
  isHeaderNextPomoOn: true,
};

App.propTypes = {
  isRightSidebarOn: PropTypes.bool,
  isHeaderNextPomoOn: PropTypes.bool,
  // history: PropTypes.object.isRequired,

  currentUser: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    isRightSidebarOn: state.ui.getIn(['isRightSidebarOn']),
    isHeaderNextPomoOn: state.ui.getIn(['isHeaderNextPomoOn']),

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
