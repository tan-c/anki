import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import toastr from 'toastr';
import SelectConnected from 'utility-react-component/Form/Select';

import {
  Menu,
} from 'semantic-ui-react';

import { UiActions } from 'utility-redux/ui';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import { todayTasksSelector } from 'utility-redux/task';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import {
  revisionAnkisTotalSelector,
  filteredAnkisSelector
} from 'utility-redux/anki';
import { Map } from 'immutable';
// import { Button } from 'semantic-ui-react';

export class SubHeader extends React.Component {
  // switchApp = (newApp) => {
  //   const { currentUser } = this.props;
  //   this.props.UserActions.update(currentUser.setIn(['config', 'recentApp'], newApp));
  //   this.props.loadOtherApp(newApp, currentUser);
  // }

  render() {
    const {
      isTasksOn,
      revisionAnkisTotal,
      selectedAnkiTagId,
      ankiTags,
      filteredAnkis,
      todayTasks,
      location,
      selectedProjectId,
      updatingRecurTask,
      edittingTarget
    } = this.props;

    return (
      <React.Fragment>
        {/* <div
          role="menuitem"
          tabIndex="-1"
          className="width-60 height-lineheight-30 text-center bg-green"
        >
          {filteredAnkis.size}
        </div> */}

        {location.pathname.indexOf('anki') > -1
          && (
            <React.Fragment>
              <Menu.Item>
                <SelectConnected
                  onChangeEvent={
                    e => this.props.UiActions.updateIn(['selectedAnkiTagId'], e.target.value)
                  }
                  options={ankiTags}
                  className={`width-80 ${!selectedAnkiTagId.length && 'bg-red'}`}
                  value={selectedAnkiTagId}
                />
              </Menu.Item>

              <Menu.Item>
                {filteredAnkis.size}
                {'/'}
                {revisionAnkisTotal}
              </Menu.Item>
            </React.Fragment>
          )}

        {location.pathname.indexOf('planning') > -1
          && (
            <React.Fragment>
              <Menu.Item>
                <ProjectSelectConnected
                  onChangeEvent={event => this.props.UiActions.updateIn(['hourblock', 'planningPage', 'selectedProjectId'], event.target.value)}
                  value={selectedProjectId}
                  color=""
                />
              </Menu.Item>

              <Menu.Item
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'planningPage', 'updatingRecurTask'], !updatingRecurTask)}
              >
                Set Recur Task
              </Menu.Item>
            </React.Fragment>
          )
        }

        {location.pathname.indexOf('setting') > -1
          && (
            <React.Fragment>
              <Menu.Item
                className={`${edittingTarget === 'events' && 'active'}`}
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'events')}
              >
                Edit Events
              </Menu.Item>

              <Menu.Item
                className={`${edittingTarget === 'calories' && 'active'}`}
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'calories')}
              >
                Edit Measurement
              </Menu.Item>

              <Menu.Item
                className={`${edittingTarget === 'projects' && 'active'}`}
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'projects')}
              >
                Edit Categories/Projects
              </Menu.Item>

              <Menu.Item
                className={`${edittingTarget === 'dailyPomoCount' && 'active'}`}
                onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'edittingTarget'], 'dailyPomoCount')}
              >
                Show Daily Pomo
              </Menu.Item>
            </React.Fragment>
          )
        }

      </React.Fragment>
    );
  }
}

SubHeader.defaultProps = {
  isTasksOn: false,
  selectedAnkiTagId: '',
  revisionAnkisTotal: 0,
  ankiTags: Map(),
  filteredAnkis: Map(),
  todayTasks: Map(),

  selectedProjectId: '',
  edittingTarget: 'events',
  updatingRecurTask: false,
};

SubHeader.propTypes = {
  isTasksOn: PropTypes.bool,
  revisionAnkisTotal: PropTypes.number,
  selectedAnkiTagId: PropTypes.string,
  ankiTags: PropTypes.object,
  filteredAnkis: PropTypes.object,
  todayTasks: PropTypes.object,

  location: PropTypes.object.isRequired,
  updatingRecurTask: PropTypes.bool,
  selectedProjectId: PropTypes.string,
  edittingTarget: PropTypes.string,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isTasksOn: state.ui.getIn(['common', 'isTasksOn']),
    isAnkiModalOn: state.ui.getIn(['common', 'isAnkiModalOn']),
    selectedAnkiTagId: state.ui.get('selectedAnkiTagId'),
    ankiTags: state.ankiTags,
    filteredAnkis: filteredAnkisSelector(state),
    todayTasks: todayTasksSelector(state),

    revisionAnkisTotal: revisionAnkisTotalSelector(state),

    selectedProjectId: state.ui.getIn(['hourblock', 'planningPage', 'selectedProjectId']),
    updatingRecurTask: state.ui.getIn(['hourblock', 'planningPage', 'updatingRecurTask']),
    edittingTarget: state.ui.getIn(['hourblock', 'settingsPage', 'edittingTarget']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
