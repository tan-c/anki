import React from 'react';

import toastr from 'toastr';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  Button, Form, Grid, Header, Segment
} from 'semantic-ui-react';

// import { bindActionCreators } from 'redux';
import {
  connect
} from 'react-redux';

// import { loadavg } from 'os';
import { UiActions } from 'utility-redux/ui';
import { UserActions } from 'utility-redux/user';

import LoginPageConnected from './LoginPage';

class AbyssinianPage extends React.Component {
  componentDidMount() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() < expiresAt * 1000) {
      this.relogin(localStorage.getItem('access_token'));
    }
  }

  relogin = (token) => {
    this.props.UserActions.create({
      token,
    }).then((res) => {
      if (res && res._id !== null) {
        toastr.info('Successfully re-loggedin');
        this.props.loggedIn(res);
      } else {
        toastr.error('No valid user');
      }
    });
  }

  render() {
    return (<LoginPageConnected pageName="Anki" />);
  }
}

AbyssinianPage.defaultProps = {
};

AbyssinianPage.propTypes = {
  // UiActions: PropTypes.object.isRequired
  UserActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loggedIn: currentUser => dispatch({
      type: 'SET_CURRENT_USER',
      currentUser
    }),
    UserActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbyssinianPage);
