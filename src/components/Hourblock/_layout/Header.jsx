import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';
import toastr from 'toastr';

// import { UiActions } from 'utility-redux/common/ui';
import { currentUserSelector } from 'utility-redux/common/user';
import { threeDayMeasurementSelector } from 'utility-redux/hourblock/dailyMeasurement';

export class Header extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }

  state = {
    showEyeTimeoutBliking: false,
    currentTime: moment(),
  }

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
      this.setState({ // eslint-disable-line react/no-set-state
        showEyeTimeoutBliking: moment().minutes() % 30 >= 29 && moment().seconds() % 2 === 0,
        currentTime: moment(),
      });
    }, 3000);
  }

  updateWeather = () => {
    this.props.updateWeather();
    setInterval(() => {
      this.props.updateWeather();
    }, 1000 * 60 * 60);
  }

  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    toastr.info('Localstorage cleared, redirecting...');
    location.reload();
  };

  render() {
    const {
      currentUser,
      weatherInfo,
      threeDayMeasurement,
      currentUserImageSrc,
    } = this.props;

    const currentApp = currentUser.hasIn(['config', 'recentApp']) ? currentUser.getIn(['config', 'recentApp']) : '';

    const { currentTime, showEyeTimeoutBliking } = this.state;

    return (
      <header data-role="header" className={`flex-container-row ${showEyeTimeoutBliking && 'bg-orange'}`}>
        <div id="logo" />
        <span className="flex-1 height-50 border-right" />

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
          <span className="height-50 border-right padding-horizontal-10">
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

        {!window.isMobile && <img alt="pic" className="profile-image" src={currentUser.has('imageUrl') ? currentUser.get('imageUrl') : currentUserImageSrc} />}

        <div id="currentTime" className="border-left">
          {currentTime.format('HH:mm')}
        </div>

        <div
          id="more-icon"
          className="border-left width-60 font-36 bg-green"
          role="button"
          tabIndex="-1"
          onClick={_ => this.logout()}
        >
          H
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  currentUser: Map(),
  weatherInfo: Map(),
  threeDayMeasurement: Map(),
};

Header.propTypes = {
  // authLock: PropTypes.object.isRequired,
  currentUserImageSrc: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
  weatherInfo: PropTypes.object,
  threeDayMeasurement: PropTypes.object,

  updateWeather: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // authLock: ownProps.authLock,
    currentUser: currentUserSelector(state),
    currentUserImageSrc: state.ui.getIn(['common', 'currentUserImageSrc']),
    weatherInfo: state.ui.getIn(['common', 'api', 'weatherInfo']),
    threeDayMeasurement: threeDayMeasurementSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateWeather: _ => dispatch({
      type: 'SET_WEATHER_INFO',
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
