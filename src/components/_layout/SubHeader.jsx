import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import toastr from 'toastr';
import SelectConnected from 'utility-react-component/Form/Select';

import {
  Menu
} from 'semantic-ui-react';

import { UiActions } from 'utility-redux/ui';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import { todayTasksSelector } from 'utility-redux/task';

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
      todayTasks
    } = this.props;

    return (
      <Menu
        data-role="subheader"
        id="subheader"
        className={`${window.isMobile && 'mobile'}`}
        attached
        style={{
          paddingLeft: 10,
          marginTop: 40
        }}
      >
        {/* <div
          role="menuitem"
          tabIndex="-1"
          className="width-60 height-lineheight-30 text-center bg-green"
        >
          {filteredAnkis.size}
        </div> */}
        <Menu.Item name="ankisCount">
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
        </Menu.Item>

        <Menu.Menu fitted="vertically">

        </Menu.Menu>
        {/* <Button size="mini">Mini</Button> */}
      </Menu>
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
};

SubHeader.propTypes = {
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
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeader));
