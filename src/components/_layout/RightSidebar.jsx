import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import { Map } from 'immutable';

import { UserActions, currentUserSelector } from 'utility-redux/user';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import InputNewComponent from 'utility-react-component/Form/Input/New';

import {
  Header,
  Icon,
  Menu,
  Sidebar,
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
    const {
      currentUser,
      ankiTags
    } = this.props;

    const configs = [{
      type: 'common',
      items: [{
        name: 'eyeSaving',
        displayName: 'Eye Saving',
        value: currentUser.hasIn(['config', 'eyeSaving']) && currentUser.getIn(['config', 'eyeSaving']),
      }],
    }, {
      type: 'mainpage',
      items: [{
        name: 'showEventsInPomo',
        displayName: 'Show Events',
        value: currentUser.hasIn(['config', 'showEventsInPomo']) && currentUser.getIn(['config', 'showEventsInPomo']),
      }, {
        name: 'showMinorTask',
        displayName: 'Minor Task',
        value: currentUser.hasIn(['config', 'showMinorTask']) && currentUser.getIn(['config', 'showMinorTask']),
      }, {
        name: 'enableChangeRecur',
        displayName: 'Change Recur',
        value: currentUser.hasIn(['config', 'enableChangeRecur']) && currentUser.getIn(['config', 'enableChangeRecur']),
      }
      ]
    }];

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

        <Menu.Item>
          <span className="height-25">
            欢迎回来,
            {currentUser.get('userName')}
          </span>
          <br />
          <span className="height-25 font-12">{currentUser.get('email')}</span>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/housingPrices"
          active={location.href.indexOf('/housingPrices') > -1}
        >
          <Icon name="building" />
          Toshigo
        </Menu.Item>

        {configs.map(configType => (
          <div key={configType.type}>
            <div className="flex-container-row typical-setup border-bottom-white">
              {configType.type}
            </div>

            {configType.items.map(config => (
              <div key={config.name} className="flex-container-row typical-setup">
                <span className="flex-1">
                  {config.displayName}
                  {config.value}
                </span>
                <span
                  className={`width-40 border-white text-center ${config.value ? 'bg-green' : 'bg-red'}`} tabIndex={-1} role="button" onClick={() => {
                    this.props.UserActions.update(currentUser.setIn(['config', config.name], !config.value));
                  }}
                >
                  {config.value ? 'ON' : 'OFF'}
                </span>
              </div>
            ))}

          </div>
        ))}


        <div>
          <div className="border-bottom-white">
            AnkiTags
          </div>

          <InputNewComponent
            inputName="name"
            inputClassNames="flex-1"
            // newRecord={{
            //   // targetCompletion: dayVal.dayMomentObject,
            //   // type: 'daily',
            // }}
            actions={this.props.AnkiTagActions}
          />

          {ankiTags.valueSeq().map(tag => (
            <div
              className="flex-container-row"
              key={tag.get('_id')}
            >
              <span className="flex-1">
                {tag.get('name')}
              </span>
              <span className="width-20">
                <i
                  role="button"
                  tabIndex="-1"
                  className="line-height-30 width-20 fa fa-fw fa-close"
                  onClick={(_) => {
                    this.props.AnkiTagActions.deleteRecord(tag);
                  }}
                />
              </span>

            </div>
          ))}
        </div>
      </Sidebar>
    );
  }
}

RightSidebarComponent.defaultProps = {
  currentUser: Map(),
  ankiTags: Map(),
};

RightSidebarComponent.propTypes = {
  currentUser: PropTypes.object,
  ankiTags: PropTypes.object,

  UserActions: PropTypes.object.isRequired,
  AnkiTagActions: PropTypes.object.isRequired,
};


function mapStateToProps(state, ownProps) {
  return {
    currentUser: currentUserSelector(state),
    ankiTags: state.ankiTags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentUser: currentUser => dispatch({
      type: 'DELETE_USER_SUCCESS',
      user: currentUser,
    }),
    UserActions: bindActionCreators(UserActions, dispatch),
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSidebarComponent);
