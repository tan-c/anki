import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import {
  Header,
  Icon, Menu, Sidebar,
  Button
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export class RightSidebarComponent extends React.Component {
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    toastr.info('Localstorage cleared, redirecting...');
    this.props.removeCurrentUser(this.props.currentUser);
  };

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="right"
        inverted
        vertical
        visible
        width="thin"
        style={{
          // width: 140,
        }}
      >
        <Menu.Item>
          <Button
            color="blue"
            id="logout-button"
            onClick={this.logout}
          >
            Logout
          </Button>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          active={location.href.split('//')[1].split('/')[2] === ''}
        >
          <Icon name="home" />
          Home
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/hourblock"
          active={location.href.indexOf('/hourblock') > -1}
        >
          <Icon name="calendar" />
          Hourblock
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/notes"
          active={location.href.indexOf('/notes') > -1}
        >
          <Icon name="sticky note outline" />
          IntelNote
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/housingPrices"
          active={location.href.indexOf('/housingPrices') > -1}
        >
          <Icon name="building" />
          Toshigo
        </Menu.Item>
      </Sidebar>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentUser: currentUser => dispatch({
      type: 'DELETE_USER_SUCCESS',
      user: currentUser,
    }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSidebarComponent);
