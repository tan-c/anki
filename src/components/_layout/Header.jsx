import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';

import {
  Menu, Container, Button, Icon
} from 'semantic-ui-react';
import { currentUserSelector } from 'utility-redux/user';
import { threeDayMeasurementSelector } from 'utility-redux/dailyMeasurement';
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
      threeDayMeasurement,
      currentUserImageSrc,
    } = this.props;

    const { currentTime, showEyeTimeoutBlinking } = this.state;

    const currentApp = currentUser.hasIn(['config', 'recentApp']) ? currentUser.getIn(['config', 'recentApp']) : '';

    return (
      <Menu
        fixed="top"
        id="header"
        inverted
        color="blue"
        // inverted
        data-role="header"
        className={`${showEyeTimeoutBlinking && 'bg-orange'}`}
        style={{
          height: 50
        }}
      >

        {!window.isMobile && (
          <span className="height-50 border-right padding-horizontal-10">
            {threeDayMeasurement.valueSeq().map(item => (
              <span className="font-24 margin-left-10 line-height-50" key={item.get('_id')}>
                {item.get('morningWeight')}
                kg -
              </span>
            ))}
          </span>
        )}

        {!window.isMobile && (
          <span
            className="height-50 border-right padding-horizontal-10"
          >
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
          </span>
        )}

        {!window.isMobile && (
          <span className="height-50 padding-horizontal-10 line-height-25 text-right">
            <span className="height-25">
              欢迎回来,
              {currentUser.get('userName')}
            </span>
            <br />
            <span className="height-25 font-12">{currentUser.get('email')}</span>
          </span>
        )}

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

          {!window.isMobile && (
            <img
              alt="pic"
              className="profile-image"
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
          )}

          <Menu.Menu>
            <Button
              color="blue"
              onClick={(_) => {
                this.props.UiActions.updateIn(['isLeftSidebarOn'], !isLeftSidebarOn);
              }}
            >
              Show Left Menu
            </Button>
            <Button
              color="blue"
              onClick={(_) => {
                this.props.UiActions.updateIn(['isRightSidebarOn'], !isRightSidebarOn);
              }}
            >
              Show Right Menu
            </Button>
          </Menu.Menu>

          <Menu.Item
            position="right"
            name="currentTime"
            style={{
              fontSize: 24,
              height: 50,
              lineHeight: 50,
            }}
          >
            {currentTime.format('HH:mm')}
          </Menu.Item>

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
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

Header.defaultProps = {
  isLeftSidebarOn: true,
  isRightSidebarOn: true,

  currentUser: Map(),
  weatherInfo: Map(),
  threeDayMeasurement: Map(),
};

Header.propTypes = {
  isLeftSidebarOn: PropTypes.bool,
  isRightSidebarOn: PropTypes.bool,

  currentUser: PropTypes.object,
  currentUserImageSrc: PropTypes.string.isRequired,
  weatherInfo: PropTypes.object,
  threeDayMeasurement: PropTypes.object,

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
    threeDayMeasurement: threeDayMeasurementSelector(state),
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
