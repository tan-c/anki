import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import toastr from 'toastr';
import SelectConnected from 'utility-react-component/Form/Select';
import moment from 'moment';
import {
  Menu, Icon, Modal, Button, Segment
} from 'semantic-ui-react';
import { currentUserSelector } from 'utility-redux/user';
import { UiActions } from 'utility-redux/ui';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import { todayTasksSelector } from 'utility-redux/task';
import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';

import {
  revisionAnkisTotalSelector,
  filteredAnkisSelector
} from 'utility-redux/anki';
import { Map } from 'immutable';
import SearchModal from '../_modal/Search';
import FileModal from '../_modal/File';
// import { Button } from 'semantic-ui-react';

export class Header extends React.Component {
  // switchApp = (newApp) => {
  //   const { currentUser } = this.props;
  //   this.props.UserActions.update(currentUser.setIn(['config', 'recentApp'], newApp));
  //   this.props.loadOtherApp(newApp, currentUser);
  // }
  // constructor(props, context) {
  // super(props, context);
  // }

  state = {
    showEyeTimeoutBlinking: false,
    currentTime: moment()
  };

  componentDidMount() {
    this.updateCurrentTime();
    // this.updateWeather();
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
      isTasksOn,
      revisionAnkisTotal,
      selectedAnkiTagId,
      ankiTags,
      filteredAnkis,
      todayTasks,
      location,
      selectedProjectId,
      updatingRecurTask,
      edittingTarget,
      isRightSidebarOn,
      currentUser,
      // weatherInfo,
      showModal,
    } = this.props;

    const { currentTime, showEyeTimeoutBlinking } = this.state;

    return (
      <React.Fragment>
        {/* <div
          role="menuitem"
          tabIndex="-1"
          className="width-60 height-lineheight-30 text-center bg-green"
        >
          {filteredAnkis.size}
        </div> */}
        {/* <Menu.Item>
          This Should Be Next Pomo and Not Menu...
        </Menu.Item> */}

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
                {`${filteredAnkis.size}}/${revisionAnkisTotal}`}
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

        {location.pathname.indexOf('notes') > -1
          && (
            <React.Fragment>
              <Menu.Item>
                <Modal
                  trigger={(
                    <Button onClick={_ => this.props.UiActions.updateIn(['himalayan', 'showModal'], 'file')}>
                      File Modal
                    </Button>
                  )}
                  open={showModal === 'file'}
                  onClose={() => {
                    this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
                  }}
                  basic
                  size="small"
                  style={{
                    background: 'white',
                    height: 400
                  }}
                >
                  <FileModal />
                </Modal>
              </Menu.Item>

              <Menu.Item>
                <Modal
                  trigger={(
                    <Button onClick={_ => this.props.UiActions.updateIn(['himalayan', 'showModal'], 'search')}>
                      Search Modal
                    </Button>
                  )}
                  open={showModal === 'search'}
                  onClose={() => {
                    this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
                  }}
                  basic
                  size="small"
                  style={{
                    background: 'white',
                    height: 400
                  }}
                >
                  <SearchModal />
                </Modal>
              </Menu.Item>
            </React.Fragment>
          )}

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

        {/* <Menu.Item
          position="right"
          style={{
            fontSize: 24,
            height: 40,
            lineHeight: '40px',
            padding: 0
          }}
        >
          {parseInt(weatherInfo.getIn(['current', 'temp']), 10)}
          {' '}
          -
          {parseInt(weatherInfo.getIn(['next', 'weather', 'temp']), 10)}
          °C
          {weatherInfo.getIn(['city', 'name'])}
        </Menu.Item> */}

        {/* <Menu.Item>
          <img
            alt="pic"
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
        </Menu.Item> */}
        <Menu.Menu position="right">
          <Menu.Item
            style={{
              fontSize: 24,
              height: 40,
              lineHeight: '40px',
              padding: '0 10px',
            }}
          >
            {currentTime.format('HH:mm')}
          </Menu.Item>

          <Menu.Item>
            <Icon
              id="right-aside-button"
              color="black"
              name="cog"
              onClick={(_) => {
                this.props.UiActions.updateIn(['isRightSidebarOn'], !isRightSidebarOn);
              }}
            />
          </Menu.Item>
        </Menu.Menu>
      </React.Fragment>
    );
  }
}

Header.defaultProps = {
  showModal: '',
  isRightSidebarOn: true,

  currentUser: Map(),
  // weatherInfo: Map(),

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

Header.propTypes = {
  showModal: PropTypes.string,
  isRightSidebarOn: PropTypes.bool,
  currentUser: PropTypes.object,
  // currentUserImageSrc: PropTypes.string.isRequired,
  // weatherInfo: PropTypes.object,
  updateWeather: PropTypes.func.isRequired,

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
    showModal: state.ui.getIn(['himalayan', 'showModal']),
    isRightSidebarOn: state.ui.getIn(['isRightSidebarOn']),

    currentUser: currentUserSelector(state),
    // currentUserImageSrc: state.ui.getIn(['common', 'currentUserImageSrc']),
    // weatherInfo: state.ui.getIn(['common', 'api', 'weatherInfo']),

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
    removeCurrentUser: currentUser => dispatch({
      type: 'DELETE_USER_SUCCESS',
      user: currentUser,
    }),
    updateWeather: _ => dispatch({
      type: 'SET_WEATHER_INFO',
    }),

    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
