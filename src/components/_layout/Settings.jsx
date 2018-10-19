import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { UserActions, currentUserSelector } from 'utility-redux/user';
import { AnkiTagActions } from 'utility-redux/ankiTag';
import InputNewComponent from 'utility-react-component/Form/Input/New';

export class Settings extends React.Component {
  // constructor(props, context) {
  // super(props, context);
  // }

  state = {
  }

  render() {
    const {
      isSettingOn,
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
    },
    // {
    //   type: 'mainpage',
    //   items: [],
    // }
    ];

    return (
      <div id="settings" className={`${isSettingOn && 'active'} padding-5`}>
        {configs.map(configType => (
          <div key={configType.type}>
            <div className="flex-container-row typical-setup border-bottom-white">
              {configType.type}
            </div>

            {configType.items.map(config => (
              <div
                key={config.name} className="flex-container-row typical-setup"
              >
                <span className="flex-1">
                  {config.displayName}
                  {config.value}
                </span>

                <span
                  className={`width-40 border-white text-center ${config.value ? 'bg-green' : 'bg-red'}`}
                  tabIndex={-1}
                  role="button"
                  onClick={() => {
                    this.props.UserActions.update(currentUser.setIn(['config', config.name], !config.value));
                  }}
                >
                  {config.value ? 'ON' : 'OFF'}
                </span>
              </div>))}

            <span className="spacing-20" />
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
      </div>
    );
  }
}

Settings.defaultProps = {
  currentUser: Map(),
  ankiTags: Map(),
  isSettingOn: false,
};

Settings.propTypes = {
  currentUser: PropTypes.object,
  ankiTags: PropTypes.object,
  isSettingOn: PropTypes.bool,

  UserActions: PropTypes.object.isRequired,
  AnkiTagActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: currentUserSelector(state),
    ankiTags: state.ankiTags,
    isSettingOn: state.ui.getIn(['common', 'isSettingOn']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
