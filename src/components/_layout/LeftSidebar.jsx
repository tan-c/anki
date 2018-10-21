import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Icon, Menu,
  Input,
  Image,
  Label
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { overduedTasksSelector } from 'utility-redux/task';

export class SidebarComponent extends React.Component {
  render() {
    const { location, overduedTasksCount } = this.props;

    return (
      <React.Fragment>
        <Menu.Item>
          <Image
            src="/logo-white-long.png"
            size="small"
          />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          active={location.pathname === '/'}
        >
          <Icon name="home" />
          Home
        </Menu.Item>

        <Menu.Item
          active={location.pathname === '/hourblock'}
        >
          <Icon name="calendar" />
          Hourblock

          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/hourblock"
              active={location.pathname === '/hourblock'}
            >
              Dashboard
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/hourblock/calendar"
              active={location.pathname === '/hourblock/calendar'}
            >
              <Label
                color="teal"
                size="tiny"
              >
                {overduedTasksCount}
              </Label>
              Calendar
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
              to="/hourblock/task"
              active={location.pathname === '/hourblock/task'}
            >
              Tasks
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/hourblock/workout"
              active={location.pathname === '/hourblock/workout'}
            >
              Workout
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
          as={Link}
          to="/notes"
          active={location.pathname === '/notes'}
        >
          <Icon name="sticky note outline" />
          IntelNote
        </Menu.Item>

        <Menu.Item
          active={location.pathname === '/anki'}
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
            <Menu.Item
              as={Link}
              to="/anki/tag"
              active={location.pathname === '/anki/tag'}
            >
              Anki Tag
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/housingPrices"
          active={location.pathname === '/housingPrices'}
        >
          <Icon name="building" />
          Toshigo
        </Menu.Item>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    overduedTasksCount: overduedTasksSelector(state),
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
