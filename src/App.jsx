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
import LeftSidebarConnected from './components/_layout/LeftSidebar';
import HousingDataConnected from './components/HousingData/Page';
import HourblockRecordConnected from './components/HourblockRecord/Page';

import HourblockPlanningPageConnected from './components/HourblockPlanning/Page';
import HourblockSettingPageConnected from './components/HourblockSettings/Page';

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
    } = this.props;

    const {
      viewGreaterThan450
    } = this.state;

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
                    component={HourblockRecordConnected}
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
                    path="/housingDatas"
                    component={HousingDataConnected}
                  />
                  <Redirect from="/housingDatas/*" to="/housingDatas" />
                  <Redirect from="/*" to="/" />
                </Switch>
              </Responsive>
            </React.Fragment>
          )
        }
      </ErrorBoundary>
    );
  }
}

App.defaultProps = {
  currentUser: Map()
};

App.propTypes = {
  currentUser: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
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
