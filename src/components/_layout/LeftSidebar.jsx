import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import {
  Icon, Menu,
  Image,
  Label
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

export class SidebarComponent extends React.Component {
  render() {
    const {
      location,
      thisWeekTasks,
    } = this.props;

    return (
      <React.Fragment>
        <Menu.Item>
          <Image
            src="/logo-white-long.png"
            size="small"
          />
        </Menu.Item>

        {/* <Menu.Item
          as={Link}
          to="/"
          active={location.pathname === '/'}
        >
          <Icon name="home" />
          Home
        </Menu.Item> */}

        <Menu.Item>
          <Icon name="calendar" />
          Hourblock
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/hourblock/record"
              active={location.pathname === '/' || location.pathname === '/hourblock/record'}
            >
              Record
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/hourblock/planning"
              active={location.pathname === '/hourblock/planning'}
            >
              Planning
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/hourblock/setting"
              active={location.pathname === '/hourblock/setting'}
            >
              Settings
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          active={location.pathname.indexOf('/anki') > -1}
        >
          <Icon name="graduation cap" />
          Anki
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/anki/list"
              active={location.pathname === '/anki/list'}
            >
              Anki List
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/anki/learn"
              active={location.pathname === '/anki/learn'}
            >
              Anki Learn
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/housingDatas"
          active={location.pathname === '/housingDatas'}
        >
          <Icon name="building" />
          Toshigo
        </Menu.Item>
      </React.Fragment>
    );
  }
}

SidebarComponent.defaultProps = {
  thisWeekTasks: Map(),
};

SidebarComponent.propTypes = {
  thisWeekTasks: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

SidebarComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarComponent));
