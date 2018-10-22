import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';

import {
  Menu, Icon
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

    if (!window.isMobile) {
      this.updateWeather();
    }
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

  updateWeather = () => {
    this.props.updateWeather();
    setInterval(() => {
      this.props.updateWeather();
    }, 1000 * 60 * 60);
  }

  render() {
    const {
      isLeftSidebarOn,
      isRightSidebarOn,
      currentUser,
      weatherInfo,
      currentUserImageSrc,
    } = this.props;

    const { currentTime, showEyeTimeoutBlinking } = this.state;

    const currentApp = currentUser.hasIn(['config', 'recentApp']) ? currentUser.getIn(['config', 'recentApp']) : '';

    // className = {`${showEyeTimeoutBlinking && 'bg-orange'}`

    return (
      <React.Fragment>
        <span className="font-24 margin-left-10 line-height-50">
          {parseInt(weatherInfo.getIn(['current', 'temp']), 10)}
          {' '}
          -
          {parseInt(weatherInfo.getIn(['next', 'weather', 'temp']), 10)}
          °C
        </span>

        <span className="margin-left-5 height-25">
          {weatherInfo.getIn(['city', 'name'])}
        </span>

        {/* <Menu.Item>
          <img
            alt="pic"
            src={
              currentUser.has('imageUrl')
                ? currentUser.get('imageUrl')
                : currentUserImageSrc
            }
            style={{
              width: 36,
              borderRadius: 1000,
              height: 36,
            }}
          />
        </Menu.Item> */}

        {/* <Menu.Menu>
            <Button
              color="white"
              onClick={(_) => {
                this.props.UiActions.updateIn(['isLeftSidebarOn'], !isLeftSidebarOn);
              }}
            >
              Show Left Menu
            </Button>
          </Menu.Menu> */}

        <Menu.Item
          style={{
            fontSize: 24,
            height: 50,
            lineHeight: 50,
          }}
        >
          {currentTime.format('HH:mm')}
        </Menu.Item>

        <Menu.Item position="right">
          <Icon
            color="yellow"
            name="graduation cap"
            onClick={(_) => {
              this.props.UiActions.updateIn(['isRightSidebarOn'], !isRightSidebarOn);
            }}
          />
        </Menu.Item>
      </React.Fragment>
    );
  }
}

Header.defaultProps = {
  isLeftSidebarOn: true,
  isRightSidebarOn: true,

  currentUser: Map(),
  weatherInfo: Map(),
};

Header.propTypes = {
  isLeftSidebarOn: PropTypes.bool,
  isRightSidebarOn: PropTypes.bool,

  currentUser: PropTypes.object,
  currentUserImageSrc: PropTypes.string.isRequired,
  weatherInfo: PropTypes.object,

  updateWeather: PropTypes.func.isRequired,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isLeftSidebarOn: state.ui.getIn(['isLeftSidebarOn']),
    isRightSidebarOn: state.ui.getIn(['isRightSidebarOn']),

    currentUser: currentUserSelector(state),
    currentUserImageSrc: state.ui.getIn(['common', 'currentUserImageSrc']),
    weatherInfo: state.ui.getIn(['common', 'api', 'weatherInfo']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentUser: currentUser => dispatch({
      type: 'DELETE_USER_SUCCESS',
      user: currentUser,
    }),
    updateWeather: _ => dispatch({
      type: 'SET_WEATHER_INFO',
    }),

    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
