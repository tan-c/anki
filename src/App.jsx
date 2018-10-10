import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import {
  Switch, Route, Redirect, withRouter
} from 'react-router-dom';

import { currentUserSelector } from 'utility-redux/common/user';
import { UiActions } from 'utility-redux/common/ui';
import './anki.scss';

import Auth0Lock from 'auth0-lock';
import toastr from 'toastr';

import LoginPageConnected from 'utility-react-component/Page/LoginPage';

import HeaderConnected from './components/_layout/Header';
import FooterConnected from './components/_layout/Footer';

import SubHeaderConnected from './components/_layout/SubHeader';
import SettingsConnected from './components/_layout/Settings';
import AnkiListConnected from './components/_layout/Anki/List';
import NoteConnected from './components/_layout/Note';

import AnkiPageConnected from './components/Anki/Page';
// import AnkiTagsPageConnected from './components/AnkiTags/Page';

import EyeModal from './components/_layout/Modal/Eye';
import ErrorBoundary from './ErrorBoundary';

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

  render() {
    const {
      currentUser, isAnkiOn, isNotesOn, isAnkiModalOn
    } = this.props;

    const eyeSaving = currentUser.hasIn(['config', 'eyeSaving'])
      && currentUser.getIn(['config', 'eyeSaving']);

    return (
      <ErrorBoundary>
        <div data-role="app">
          <div id="version">
            {process.env.GIT_VERSION
              ? process.env.GIT_VERSION.slice(0, 6)
              : 'Undefined'}
          </div>

          {currentUser.size === 0 && (
            <React.Fragment>
              <LoginPageConnected />
            </React.Fragment>
          )}

          {currentUser.size > 0 && (
            <React.Fragment>
              <HeaderConnected />
              <SubHeaderConnected />
              <FooterConnected />
              <SettingsConnected />

              {eyeSaving && <EyeModal />}

              <main className="flex-container" style={{ height: 'calc(100vh - 50px - 30px - 120px)' }}>
                {/* <div className="flex-container-row bg-orange-light" style={{ height: 160 }}>
                  <NoteConnected field="notesDailyPlan" />
                </div> */}

                <div className="flex-1 flex-container-row">
                  {isAnkiModalOn && (
                    <div className="width-100p bg-blue">
                      <Switch data-role="main-intelnote">
                        <Route exact path="/" component={AnkiPageConnected} />
                        {/* <Route path="/ankiTags" component={AnkiTagsPageConnected} /> */}
                        <Redirect from="/*" to="/" />
                      </Switch>
                    </div>
                  )}

                  {(isAnkiOn || isNotesOn) && (
                    <React.Fragment>
                      {isAnkiOn && <AnkiListConnected />}
                      {isNotesOn && <NoteConnected field="notes" />}
                    </React.Fragment>
                  )}
                </div>
              </main>
            </React.Fragment>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

App.defaultProps = {
  currentUser: Map()
};

App.propTypes = {
  isAnkiOn: PropTypes.bool.isRequired,
  isNotesOn: PropTypes.bool.isRequired,
  isAnkiModalOn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,

  UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    showModal: state.ui.getIn(['showModal']),
    isAnkiOn: state.ui.getIn(['common', 'isAnkiOn']),
    isNotesOn: state.ui.getIn(['common', 'isNotesOn']),
    isAnkiModalOn: state.ui.getIn(['common', 'isAnkiModalOn']),
    currentUser: currentUserSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
