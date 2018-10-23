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
import {
  overduedTasksSelector,
  thisWeekTasksSelector
} from 'utility-redux/task';
import { todayMeasurementSelector } from 'utility-redux/dailyMeasurement';

export class SidebarComponent extends React.Component {
  render() {
    const {
      location,
      overduedTasksCount,
      thisWeekTasks,
      todayMeasurement
    } = this.props;

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

        <Menu.Item>
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
              to="/hourblock/planning"
              active={location.pathname === '/hourblock/planning'}
            >
              Planning
            </Menu.Item>

            {/* {threeDayMeasurement.valueSeq().map(item => (
              <span className="font-24 margin-left-10 line-height-50" key={item.get('_id')}>
                {item.get('morningWeight')}
                kg -
              </span>
            ))} */}

            <Menu.Item
              as={Link}
              to="/hourblock/workout"
              active={location.pathname === '/hourblock/workout'}
            >
              Workout
              <Label
                color={todayMeasurement.get('morningWeight') > 0 ? 'grey' : 'red'}
                size="tiny"
              >
                {todayMeasurement.get('morningWeight')}
              </Label>
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
          to="/todo/calendar"
          active={location.pathname.indexOf('/todo') > -1}
        >
          {overduedTasksCount && (
            <Label
              color={overduedTasksCount >= 3 ? 'orange' : 'green'}
              size="tiny"
            >
              {overduedTasksCount}
            </Label>
          )}
          <Label
            color={thisWeekTasks.count() >= 6 ? 'orange' : 'green'}
            size="tiny"
          >
            {thisWeekTasks.count()}
          </Label>
          Todo
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/todo/calendar"
              active={location.pathname === '/todo/calendar'}
            >
              Calendar
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/todo/task"
              active={location.pathname === '/todo/task'}
            >
              Tasks
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

SidebarComponent.defaultProps = {
  overduedTasksCount: 0,
  thisWeekTasks: Map(),
  todayMeasurement: Map(),
};

SidebarComponent.propTypes = {
  overduedTasksCount: PropTypes.number,
  thisWeekTasks: PropTypes.object,
  todayMeasurement: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    overduedTasksCount: overduedTasksSelector(state),
    thisWeekTasks: thisWeekTasksSelector(state),
    todayMeasurement: todayMeasurementSelector(state),
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
