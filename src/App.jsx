import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import {
  Sidebar, Segment, Container
} from 'semantic-ui-react';

// import { Menu, Container } from 'semantic-ui-react';

import {
  Switch, Route, Redirect, withRouter
} from 'react-router-dom';

import { currentUserSelector } from 'utility-redux/common/user';
// import { UiActions } from 'utility-redux/common/ui';

import '../../../node_modules/toastr/toastr.less';
import '../../../node_modules/semantic-ui-less/semantic.less';

// @import '~utility-style/main.scss';
// @import '~semantic-ui-css/semantic.min.css';
// import toastr from 'toastr';

import LoginPageConnected from 'utility-react-component/Page/LoginPage';

import HeaderConnected from './components/_layout/Header';
import FooterConnected from './components/_layout/Footer';
import SidebarConnected from './components/_layout/Sidebar';

import SubHeaderConnected from './components/_layout/SubHeader';
// import SettingsConnected from './components/_layout/Settings';
import AnkiListConnected from './components/AnkiNew/List';

import HousingPricesConnected from './components/HousingPrices/Page';

import NoteConnected from './components/_layout/UserNote';

import AnkiPageConnected from './components/AnkiLearn/Page';
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
      currentUser, isAnkiOn, isNotesOn,
      isSidebarOn
    } = this.props;

    const eyeSaving = currentUser.hasIn(['config', 'eyeSaving'])
      && currentUser.getIn(['config', 'eyeSaving']);

    return (
      <ErrorBoundary>
        <div id="version">
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
                left: isSidebarOn ? -50 : 0
              }}
              >
                <HeaderConnected />
                <SubHeaderConnected />
                {/* <FooterConnected /> */}
                {/* <SettingsConnected /> */}

                {eyeSaving && <EyeModal />}

                <Switch data-role="main-intelnote">
                  <Route exact path="/" component={AnkiPageConnected} />
                  <Route path="/housingPrices" component={HousingPricesConnected} />
                  <Redirect from="/*" to="/" />
                </Switch>

                {/* {isAnkiOn && <AnkiListConnected />}
                  {isNotesOn && <NoteConnected field="notes" />} */}
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

  isAnkiOn: PropTypes.bool.isRequired,
  isNotesOn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,

  // UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isSidebarOn: state.ui.getIn(['anki', 'isSidebarOn']),

    showModal: state.ui.getIn(['showModal']),
    isAnkiOn: state.ui.getIn(['common', 'isAnkiOn']),
    isNotesOn: state.ui.getIn(['common', 'isNotesOn']),
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
