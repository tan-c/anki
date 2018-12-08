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
} from 'utility-redux/task';
import { todayMeasurementSelector } from 'utility-redux/dailyMeasurement';

export class SidebarComponent extends React.Component {
  render() {
    const {
      location,
      overduedTasksList,
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

        <Menu.Item
          active={location.pathname.indexOf('/hourblock') > -1}
        >
          <Icon name="calendar" />
          Hourblock
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to="/hourblock/record"
              active={location.pathname === '/hourblock/record'}
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
          to="/tasks"
          active={location.pathname.indexOf('/task') > -1}
        >
          Tasks
          {overduedTasksList.size && (
            <Label
              color={overduedTasksList.size >= 3 ? 'orange' : 'green'}
              size="tiny"
            >
              {overduedTasksList.size}
            </Label>
          )}
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
  overduedTasksList: 0,
  thisWeekTasks: Map(),
  todayMeasurement: Map(),
};

SidebarComponent.propTypes = {
  overduedTasksList: PropTypes.number,
  thisWeekTasks: PropTypes.object,
  todayMeasurement: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    overduedTasksList: overduedTasksSelector(state),
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
