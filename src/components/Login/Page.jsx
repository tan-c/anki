import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';

import { UserActions } from 'utility-redux/common/user';
import { UiActions } from 'utility-redux/common/ui';

export class LoginPage extends React.Component {
  componentDidMount() {
    if (this.isAuthenticated()) {
      this.getUserDetails();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = nextProps;
    const { authLock } = this.props;
    const isAuthenticatedOld = this.props.isAuthenticated;
    if (!isAuthenticatedOld && isAuthenticated) {
      authLock.hide();
      this.getUserDetails();
    }
  }

  getUserDetails = () => {
    const { authLock } = this.props;
    const accessToken = localStorage.getItem('access_token');
    authLock.getUserInfo(accessToken, (err, profile) => {
      this.props.UiActions.updateIn(['common', 'currentUserImageSrc'], profile.picture);

      if (profile.sub !== undefined) {
        this.props.UserActions.create().then((res) => {
          if (res && res._id !== null) {
            this.props.loggedIn();
            this.props.UiActions.updateIn(['common', 'currentUserId'], res._id);
          }
        });
      } else {
        toastr.error('Cannot get the user_id');
      }
    });
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    toastr.info('Localstorage cleared, redirecting...');
    location.reload();
  };

  render() {
    return (
      <div
        data-role="login-page"
        id="loginPage"
        className={`flex-container flex-center-item ${window.isMobile && 'mobile'}`}
      >
        <div id="title" className="animated tada">
          Anki
        </div>

        <div className="spacing" />
        {!this.isAuthenticated() && this.props.authLock.show()}

        {this.isAuthenticated() && (
          <span
            role="button"
            tabIndex="-1"
            className="bg-green height-60 line-height-60 width-100p font-24 font-600 text-center"
            onClick={this.logout}
          >
            Logout
          </span>
        )}
      </div>
    );
  }
}

LoginPage.defaultProps = {
  isAuthenticated: false,
};

LoginPage.propTypes = {
  // location: PropTypes.object.isRequired,
  loggedIn: PropTypes.func.isRequired,
  authLock: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,

  UserActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    authLock: ownProps.authLock,
    isAuthenticated: state.ui.getIn(['common', 'isAuthenticated']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loggedIn: _ => dispatch({
      type: 'GET_CURRENT_USER_INFO'
    }),
    UserActions: bindActionCreators(UserActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
