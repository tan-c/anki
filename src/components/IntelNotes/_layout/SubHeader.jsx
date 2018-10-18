import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
// import { Map } from 'immutable';
// import toastr from 'toastr';

import { UiActions } from 'utility-redux/common/ui';
// import { UserActions, currentUserSelector } from 'utility-redux/common/user';

export class SubHeader extends React.Component {
  // state = {
  //   subscription: navigator.serviceWorker.customizedContent === undefined ? null : navigator.serviceWorker.customizedContent.subscription,
  // }
  // constructor(props, context) {
  //   super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { pathname } = nextProps.location;
  //
  //   this.setState({
  //     updatingPlannedTaskMain: pathname.indexOf('planning') > -1,
  //   });
  // }

  render() {
    const {
      currentModal, isSettingOn
    } = this.props;
    // const { subscription } = this.state;


    return (
      <div data-role="subheader" id="subheader" className={`flex-container-row ${window.isMobile && 'mobile'}`}>
        <div
          id="subheader-links"
          className="flex-3 text-left"
        >
          {!window.isMobile && (
            <span
              className={`width-100 ${currentModal === 'search' && 'active'}`}
              role="button"
              tabIndex="-1"
              onClick={_ => this.props.UiActions.updateIn(['himalayan', 'showModal'], currentModal === 'search' ? '' : 'search')}
            >
                Search Modal
            </span>
          )}

          {!window.isMobile && (
            <span
              className={`width-100 ${currentModal === 'file' && 'active'}`}
              role="button"
              tabIndex="-1"
              onClick={_ => this.props.UiActions.updateIn(['himalayan', 'showModal'], currentModal === 'file' ? '' : 'file')}
            >
                File Column
            </span>
          )}
        </div>

        {/* {!window.isMobile
        && (
          <i
            role="button"
            tabIndex="-1"
            className={`line-height-30 width-20 fa fa-fw fa-bullhorn ${Notification.permission === 'denied' ? 'color-red' : 'color-green'}`}
            onClick={(_) => {
            }}
          />
        )
        } */}

        {/* <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-rss ${subscription && subscription.endpoint !== undefined && 'color-green'}`}
        /> */}

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-cog ${isSettingOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isSettingOn'], !isSettingOn);
          }}
        />
      </div>
    );
  }
}

SubHeader.defaultProps = {
  currentModal: '',
  isSettingOn: false,
};

SubHeader.propTypes = {
  currentModal: PropTypes.string,
  isSettingOn: PropTypes.bool,
  // location: PropTypes.object.isRequired,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    currentModal: state.ui.getIn(['himalayan', 'showModal']),
    isSettingOn: state.ui.getIn(['common', 'isSettingOn']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
