import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// import toastr from 'toastr';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import {
  Form, TextArea, Grid, Segment
} from 'semantic-ui-react';

import TextareaControlledConnected from 'utility-react-component/Form/TextareaControlled';
import {
  AnkiActions,
  ankisSortedSelector,
  activeAnkiSelector,
} from 'utility-redux/anki';

import { UiActions } from 'utility-redux/ui';

import AnkiRowConnected from './Row';

export class AnkiList extends React.Component {
  onKeyDownSaveAnki = (event) => {
    const { selectedAnkiTagId } = this.props;
    const question = this.questionInput.ref.value;
    const answer = this.answerInput.ref.value;

    if (event.which === 13 && event.metaKey) {
      const ankiInfo = {
        question,
        answer,
        type: 'anki',
      };

      if (selectedAnkiTagId.length) {
        ankiInfo.tags = [selectedAnkiTagId];
      }

      this.props.AnkiActions.create(ankiInfo).then((res) => {
        this.questionInput.ref.value = '';
        this.answerInput.ref.value = '';
      });
    }
  }

  toggleType = (anki) => {
    this.props.AnkiActions.update(anki.set('type', anki.get('type') === 'code' ? 'anki' : 'code'));
  }

  render() {
    const {
      activeAnki, ankisSorted,
    } = this.props;

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            {activeAnki.size > 0
              && (
                <Form>
                  <TextareaControlledConnected
                    inputName="question"
                    record={activeAnki}
                    actions={this.props.AnkiActions}
                    inputClassNames="width-100p height-60"
                    inputType="textarea"
                    textareaRow={2}
                    callback={(_) => { this.props.UiActions.updateIn(['activeAnkiId'], ''); }}
                  />

                  <TextareaControlledConnected
                    inputName="answer"
                    record={activeAnki}
                    actions={this.props.AnkiActions}
                    inputClassNames="width-100p height-100"
                    inputType="textarea"
                    textareaRow={4}
                    callback={(_) => { this.props.UiActions.updateIn(['activeAnkiId'], ''); }}
                  />
                </Form>
              )
            }

            {activeAnki.size === 0
              && (
                <Form>
                  <Form.Group>
                    <TextArea
                      rows="2"
                      type="text"
                      name="question"
                      ref={(ref) => { this.questionInput = ref; }}
                      placeholder={activeAnki.size ? activeAnki.get('question') : ''}
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextArea
                      rows="4"
                      type="text"
                      name="answer"
                      ref={(ref) => { this.answerInput = ref; }}
                      placeholder={activeAnki.size ? activeAnki.get('answer') : ''}
                      onKeyDown={this.onKeyDownSaveAnki}
                    />
                  </Form.Group>
                </Form>
              )
            }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Grid
              divided="vertically"
              style={{
                overflow: 'auto',
                maxHeight: 'calc(100vh - 300px)'
              }}
            >
              {ankisSorted.valueSeq().map(anki => (
                <AnkiRowConnected
                  anki={anki}
                  key={anki.get('_id')}
                />
              ))}
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

AnkiList.defaultProps = {
  activeAnki: Map(),
  // activeNote: Map(),
  ankisSorted: Map(),
  selectedAnkiTagId: ''
};

AnkiList.propTypes = {
  // activeNote: PropTypes.object,
  activeAnki: PropTypes.object,
  ankisSorted: PropTypes.object,
  selectedAnkiTagId: PropTypes.string,
  // activeNoteVariousAnkis: PropTypes.object,

  AnkiActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    activeAnki: activeAnkiSelector(state),
    // activeNote: activeNoteSelector(state),
    ankisSorted: ankisSortedSelector(state),
    selectedAnkiTagId: state.ui.getIn(['selectedAnkiTagId']),
    // activeNoteVariousAnkis: activeNoteVariousAnkisSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AnkiActions: bindActionCreators(AnkiActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnkiList);
