import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map } from 'immutable';
import { Grid, Icon } from 'semantic-ui-react';

import { AnkiActions, activeAnkiSelector } from 'utility-redux/anki';
import { UiActions } from 'utility-redux/ui';

export class AnkiRow extends React.Component {
  render() {
    const { anki, activeAnki } = this.props;

    return (
      <Grid.Row
        style={{
          padding: 0,
          minHeight: 30
        }}
      >
        <Grid.Column
          width={1}
        >
          {`${anki.getIn(['revision', 'round'])}/${anki.getIn(['revision', 'passing'])} - `}
        </Grid.Column>

        <Grid.Column
          width={12}
          textAlign="left"
        >
          {anki.get('question')}
        </Grid.Column>

        <Grid.Column
          width={3}
          textAlign="center"
        >
          <span style={{
            width: 20
          }}
          >
            {anki.has('tags') ? anki.get('tags').size : 0}
          </span>

          <Icon
            name="close"
            onClick={_ => this.props.AnkiActions.deleteRecord(anki)}
          />

          <Icon
            name="edit"
            onClick={_ => this.props.UiActions.updateIn(['activeAnkiId'], anki.get('_id'))
            }
          />
        </Grid.Column>
      </Grid.Row>
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
