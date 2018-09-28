import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import toastr from 'toastr';
import SelectConnected from 'utility-react-component/Form/Select';

import { UiActions } from 'utility-redux/common/ui';
import { AnkiTagActions } from 'utility-redux/anki/ankiTag';
import { todayTasksSelector } from 'utility-redux/hourblock/task';

import {
  revisionAnkisTotalSelector,
  filteredAnkisSelector
} from 'utility-redux/anki/anki';
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
      isSettingOn,
      isAnkiOn,
      isNotesOn,
      isAnkiModalOn,
      isTasksOn,
      revisionAnkisTotal,
      selectedAnkiTagId,
      ankiTags,
      filteredAnkis,
      todayTasks
    } = this.props;

    return (
      <div data-role="subheader" id="subheader" className={`flex-container-row ${window.isMobile && 'mobile'}`}>
        {/* <div
          role="menuitem"
          tabIndex="-1"
          className="width-60 height-lineheight-30 text-center bg-green"
        >
          {filteredAnkis.size}
        </div> */}

        <SelectConnected
          onChangeEvent={
            e => this.props.UiActions.updateIn(['selectedAnkiTagId'], e.target.value)
          }
          options={ankiTags}
          className={`width-80 ${!selectedAnkiTagId.length && 'bg-red'}`}
          value={selectedAnkiTagId}
        />
        <div
          role="menuitem"
          tabIndex="-1"
          className="width-60 height-lineheight-30 text-center bg-green"
        >
          {filteredAnkis.size}
          {'/'}
          {revisionAnkisTotal}
        </div>

        <div id="subheader-links" className="flex-3 text-left" />

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-graduation-cap ${isAnkiModalOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isAnkiModalOn'], !isAnkiModalOn);
          }}
        />

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-list-alt ${isAnkiOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isAnkiOn'], !isAnkiOn);
          }}
        />

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-sticky-note ${isNotesOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isNotesOn'], !isNotesOn);
          }}
        />

        <i
          role="button"
          tabIndex="-1"
          className={`line-height-30 width-20 fa fa-fw fa-cog ${isSettingOn && 'color-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isSettingOn'], !isSettingOn);
          }}
        />

        <span
          role="button"
          tabIndex="-1"
          className={`${isTasksOn && 'bg-blue'}`}
          onClick={(_) => {
            this.props.UiActions.updateIn(['common', 'isTasksOn'], !isTasksOn);
          }}
        >
          {`${todayTasks.count()} Tasks`}
        </span>
        {/* <Button size="mini">Mini</Button> */}
      </div>
    );
  }
}

SubHeader.defaultProps = {
  isSettingOn: false,
  isAnkiOn: false,
  isNotesOn: true,
  isAnkiModalOn: false,
  isTasksOn: false,
  selectedAnkiTagId: '',
  revisionAnkisTotal: 0,
  ankiTags: Map(),
  filteredAnkis: Map(),
  todayTasks: Map(),
};

SubHeader.propTypes = {
  isSettingOn: PropTypes.bool,
  isAnkiOn: PropTypes.bool,
  isNotesOn: PropTypes.bool,
  isAnkiModalOn: PropTypes.bool,
  isTasksOn: PropTypes.bool,
  revisionAnkisTotal: PropTypes.number,
  selectedAnkiTagId: PropTypes.string,
  ankiTags: PropTypes.object,
  filteredAnkis: PropTypes.object,
  todayTasks: PropTypes.object,

  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isSettingOn: state.ui.getIn(['common', 'isSettingOn']),
    isAnkiOn: state.ui.getIn(['common', 'isAnkiOn']),
    isNotesOn: state.ui.getIn(['common', 'isNotesOn']),
    isTasksOn: state.ui.getIn(['common', 'isTasksOn']),
    isAnkiModalOn: state.ui.getIn(['common', 'isAnkiModalOn']),
    selectedAnkiTagId: state.ui.get('selectedAnkiTagId'),
    ankiTags: state.ankiTags,
    filteredAnkis: filteredAnkisSelector(state),
    todayTasks: todayTasksSelector(state),

    revisionAnkisTotal: revisionAnkisTotalSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // loadOtherApp: (newApp, currentUser) => dispatch({ // Will only work once as sagas not in while loop
    //   type: `GET_${newApp.toUpperCase()}_RESOURCES`,
    //   currentUser: currentUser.toJS(), // For intelnote
    // }),
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
