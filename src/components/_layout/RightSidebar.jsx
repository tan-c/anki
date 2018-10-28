import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import { Map } from 'immutable';

import { UiActions } from 'utility-redux/ui';
import { UserActions, currentUserSelector } from 'utility-redux/user';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import InputNewComponent from 'utility-react-component/Form/Input/New';

import {
  Header,
  Icon,
  Menu,
  Sidebar,
  Button,
  Label
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
      <React.Fragment>
        <Menu.Item>
          <Button>
            <Icon
              id="right-aside-button"
              color="black"
              name="cog"
              onClick={(_) => {
                this.props.UiActions.updateIn(['isRightSidebarOn'], false);
              }}
            />
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button
            color="blue"
            id="logout-button"
            fluid
            size="small"
            onClick={this.logout}
          >
            Logout
          </Button>
        </Menu.Item>

        <Menu.Item>
          <span className="height-25">
            {`欢迎回来, ${currentUser.get('userName')}`}
          </span>
          <br />
          <span className="height-25 font-12">{currentUser.get('email')}</span>
        </Menu.Item>

        {/* <Menu.Item
          as={Link}
          to="/housingPrices"
          active={location.href.indexOf('/housingPrices') > -1}
        >
          <Icon name="building" />
          Toshigo
        </Menu.Item> */}

        {configs.map(configType => (
          <Menu.Item key={configType.type}>
            {configType.type}

            <Menu.Menu>
              {configType.items.map(config => (
                <Menu.Item
                  key={config.name}
                  onClick={() => {
                    this.props.UserActions.update(currentUser.setIn(['config', config.name], !config.value));
                  }}
                >
                  {config.displayName}
                  <Label
                    color={`${config.value ? 'green' : 'red'}`}
                  >
                    {config.value ? 'ON' : 'OFF'}
                  </Label>
                </Menu.Item>
              ))}
            </Menu.Menu>
          </Menu.Item>
        ))}

        <Menu.Item>
          <InputNewComponent
            inputName="name"
            inputClassNames="flex-1"
            actions={this.props.AnkiTagActions}
          />
        </Menu.Item>

        <Menu.Item>
          <Icon name="graduation cap" />
          AnkiTags
          <Menu.Menu>
            {ankiTags.valueSeq().map(tag => (
              <Menu.Item
                key={tag.get('_id')}
              >
                {tag.get('name')}
                <Icon
                  name="close"
                  onClick={(_) => {
                    this.props.AnkiTagActions.deleteRecord(tag);
                  }}
                />
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu.Item>
      </React.Fragment>
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
    UiActions: bindActionCreators(UiActions, dispatch),
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSidebarComponent);
