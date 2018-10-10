import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map } from 'immutable';

import { AnkiActions, activeAnkiSelector } from 'utility-redux/anki/anki';
import { UiActions } from 'utility-redux/common/ui';

export class AnkiRow extends React.Component {
  render() {
    const { anki, activeAnki } = this.props;

    return (
      <div
        data-role="anki-row"
        className={`flex-container-row typical-setup ${
          activeAnki.get('_id') === anki.get('_id')
            ? 'bg-orange'
            : 'border-black-20'
        }`}
      >
        <span className="width-30 color-white text-center bg-green">
          {anki.getIn(['revision', 'round'])}
          {'/'}
          {anki.getIn(['revision', 'passing'])}
        </span>

        <span className="flex-1 margin-left-5">{anki.get('question')}</span>

        <span className="width-20 bg-orange text-center text-white">
          {anki.has('tags') ? anki.get('tags').size : 0}
        </span>
        <i
          role="button"
          tabIndex="-1"
          className="fa fa-close fa-fw font-14"
          onClick={_ => this.props.AnkiActions.deleteRecord(anki)}
        />

        <i
          role="button"
          tabIndex="-1"
          className="fa fa-fw fa-edit font-14"
          onClick={_ => this.props.UiActions.updateIn(['activeAnkiId'], anki.get('_id'))
          }
        />
      </div>
    );
  }
}

AnkiRow.defaultProps = {
  anki: Map(),
  activeAnki: Map()
};

AnkiRow.propTypes = {
  anki: PropTypes.object,
  activeAnki: PropTypes.object,

  AnkiActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    anki: ownProps.anki,
    activeAnki: activeAnkiSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AnkiActions: bindActionCreators(AnkiActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnkiRow);
