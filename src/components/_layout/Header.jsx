import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';
import toastr from 'toastr';

import { Menu, Container, Button } from 'semantic-ui-react';

// import { UiActions } from 'utility-redux/common/ui';
import { currentUserSelector } from 'utility-redux/common/user';

export class Header extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }

  state = {
    showEyeTimeoutBliking: false,
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
        showEyeTimeoutBliking:
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
    location.reload();
  };

  render() {
    const { currentUser } = this.props;

    const { currentTime, showEyeTimeoutBliking } = this.state;

    return (
      <Menu
        fixed="top"
        inverted
        color="blue"
        // inverted
        data-role="header"
        className={`${showEyeTimeoutBliking && 'bg-orange'}`}
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

          <Menu.Item
            position="right"
            name="currentTime"
          >
            {currentTime.format('HH:mm')}
          </Menu.Item>

          <Menu.Menu position="right">
            <Button
              color="blue"
              onClick={_ => this.logout()}
            >
              AN
            </Button>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

Header.defaultProps = {
  currentUser: Map()
};

Header.propTypes = {
  currentUser: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
