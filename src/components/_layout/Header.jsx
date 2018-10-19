import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';
import toastr from 'toastr';

import {
  Menu, Container, Button, Icon
} from 'semantic-ui-react';
import { currentUserSelector } from 'utility-redux/user';
import { UiActions } from 'utility-redux/ui';

export class Header extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }

  state = {
    showEyeTimeoutBlinking: false,
    currentTime: moment()
  };

  componentDidMount() {
    this.updateCurrentTime();
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeRunner);
  }

  updateCurrentTime = () => {
    this.updateTimeRunner = setInterval(() => {
      this.setState({
        // eslint-disable-line react/no-set-state
        showEyeTimeoutBlinking:
          moment().minutes() % 30 >= 29 && moment().seconds() % 2 === 0,
        currentTime: moment()
      });
    }, 3000);
  };

  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    toastr.info('Localstorage cleared, redirecting...');
    this.props.removeCurrentUser(this.props.currentUser);
  };

  render() {
    const { isSidebarOn, isSettingOn } = this.props;
    const { currentTime, showEyeTimeoutBlinking } = this.state;

    return (
      <Menu
        fixed="top"
        id="header"
        inverted
        color="blue"
        // inverted
        data-role="header"
        className={`${showEyeTimeoutBlinking && 'bg-orange'}`}
      >
        <Container>
          {/* {!window.isMobile && (
          <span className="height-50 padding-horizontal-10 line-height-25 text-right">
            <span className="height-25">
              {'欢迎回来,'}
              {currentUser.get('userName')}
            </span>
            <br />
            <span className="height-25 font-12">
              {currentUser.get('email')}
            </span>
          </span>
        )} */}

          {/* {!window.isMobile && (
          <img
            alt="pic"
            className="profile-image"
            src={
              currentUser.has('imageUrl')
                ? currentUser.get('imageUrl')
                : currentUserImageSrc
            }
          />
        )} */}
          <Menu.Menu>
            <Button
              color="blue"
              id="logout-button"
              onClick={(_) => {
                this.props.UiActions.updateIn(['anki', 'isSidebarOn'], !isSidebarOn);
              }}
            >
              Show Menu
            </Button>
          </Menu.Menu>

          <Menu.Item
            position="right"
            name="currentTime"
          >
            {currentTime.format('HH:mm')}
          </Menu.Item>

          <Menu.Menu position="right">
            <Button
              color="blue"
              id="logout-button"
              onClick={this.logout}
            >
              AN
            </Button>
          </Menu.Menu>


          <Menu.Item name="iconButtons" position="right">
            {/* <Button icon>
                <Icon
                  name="graduation cap"
                  color={`${isAnkiModalOn ? 'blue' : 'black'}`}
                  onClick={(_) => {
                    this.props.UiActions.updateIn(['common', 'isAnkiModalOn'], !isAnkiModalOn);
                  }}
                />
              </Button> */}
            <Icon
              name="cog"
              // color={`${isSettingOn ? 'blue' : ''}`}
              onClick={(_) => {
                this.props.UiActions.updateIn(['common', 'isSettingOn'], !isSettingOn);
              }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

Header.defaultProps = {
  isSettingOn: false,
  currentUser: Map(),
};

Header.propTypes = {
  isSettingOn: PropTypes.bool,
  isSidebarOn: PropTypes.bool,
  currentUser: PropTypes.object,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isSettingOn: state.ui.getIn(['common', 'isSettingOn']),
    isSidebarOn: state.ui.getIn(['anki', 'isSidebarOn']),

    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentUser: currentUser => dispatch({
      type: 'DELETE_USER_SUCCESS',
      user: currentUser,
    }),

    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
