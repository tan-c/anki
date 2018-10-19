import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import keydown from 'react-keydown';

import {
  Sidebar, Segment, Container
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
import SidebarConnected from './components/_layout/Sidebar';

import SubHeaderConnected from './components/_layout/SubHeader';
// import SettingsConnected from './components/_layout/Settings';
import AnkiListConnected from './components/AnkiNew/List';
import IntelNotesConnected from './components/IntelNotes/IntelNote';
import HousingPricesConnected from './components/HousingPrices/Page';
import HourblockConnected from './components/Hourblock/Main';

import NoteConnected from './components/_layout/UserNote';
import AnkiPageConnected from './components/AnkiLearn/Page';
// import AnkiTagsPageConnected from './components/AnkiTags/Page';

import EyeModal from './components/_layout/Modal/Eye';
import ErrorBoundary from './ErrorBoundary';

import './index.scss';
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
      isSidebarOn
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
            <Sidebar.Pushable>
              {isSidebarOn && <SidebarConnected />}

              {/* <div className="flex-container-row bg-orange-light" style={{ height: 160 }}>
                  <NoteConnected field="notesDailyPlan" />
                </div> */}

              <Sidebar.Pusher style={{
                left: isSidebarOn ? -60 : 0
              }}
              >
                <HeaderConnected />
                <SubHeaderConnected />
                {/* <FooterConnected /> */}
                {/* <SettingsConnected /> */}

                {eyeSaving && <EyeModal />}

                <Switch data-role="main-intelnote">
                  <Route
                    exact
                    path="/"
                    component={() => <NoteConnected field="notes" />}
                  />
                  <Route
                    path="/anki"
                    component={AnkiPageConnected}
                  />
                  <Route
                    path="/ankiLearn"
                    component={AnkiListConnected}
                  />
                  <Route
                    path="/hourblock"
                    component={HourblockConnected}
                  />
                  <Route
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
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          )
        }
      </ErrorBoundary>
    );
  }
}

App.defaultProps = {
  currentUser: Map(),
  isSidebarOn: false,
};

App.propTypes = {
  isSidebarOn: PropTypes.bool,
  // history: PropTypes.object.isRequired,

  currentUser: PropTypes.object,

  // UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isSidebarOn: state.ui.getIn(['anki', 'isSidebarOn']),

    showModal: state.ui.getIn(['showModal']),
    currentUser: currentUserSelector(state)
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
