import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import keydown from 'react-keydown';
// import toastr from 'toastr';
// import Highlight from 'react-highlight'; // FIXME: removed as it introduced an older version of react
import { Map, fromJS } from 'immutable';
import { Card, Icon } from 'semantic-ui-react';

import {
  AnkiActions,
  currentAnkiSelector,
  revisionAnkisTotalSelector
} from 'utility-redux/anki/anki';

// require('./anki-modal.scss');

export class AnkiPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.updateAnki = this.updateAnki.bind(this);
  }

  state = {
    showAnswer: false
  };

  @keydown('space')
  toggleAnswer(event) {
    const { showAnswer } = this.state;
    this.setState({
      showAnswer: !showAnswer
    });
    // if (!showAnswer) {
    //   this.setState({
    //     showAnswer: true,
    //   });
    // } else {
    //   this.updateAnki(null, 2);
    // }
  }

  @keydown('1', '2')
  updateAnki(event, key = undefined) {
    if (this.state.showAnswer) {
      const nth = key === undefined ? event.which - 48 : key; // key value to number
      const { currentAnki } = this.props;

      const revision = currentAnki.get('revision').toJS();

      switch (nth) {
      case 1: // pass to tomorrow
        if (revision.round >= 1) {
          revision.passing += 1;
        }

        if (revision.round >= 5) {
          // Extra penalty for old stuff
          revision.passing += 1;
        }
        revision.nextTime = moment()
          .add(1, 'day')
          .toDate();
        break;
      case 2: // good
        revision.nextTime = moment()
          .add(
            (currentAnki.type === 'anki' ? 1.732 : 2.23) ** revision.round,
            'day'
          )
          .toDate();
        revision.round += 1;
        break;
      default:
        break;
      }

      if (revision.passing > 4 && revision.round >= 1) {
        revision.round -= 1;
        revision.passing -= 4;
      }

      this.setState(prevState => ({
        showAnswer: false
      }));

      const newCurrentAnki = currentAnki.mergeDeep(
        fromJS({
          revision
        })
      );

      this.props.AnkiActions.update(
        newCurrentAnki.set('lastUpdate', new Date())
      );
    }
  }

  render() {
    const { currentAnki, revisionAnkisTotal } = this.props;
    const { showAnswer } = this.state;

    let revisionElapsedDays = 0;
    let createdElapsedDays = 0;
    // update the revision time to be x days from now
    if (currentAnki.has('lastUpdate') !== undefined) {
      const revisionElapsedDaysUnparsed = (new Date().getTime()
          - new Date(currentAnki.get('lastUpdate')).getTime())
        / 60
        / 60
        / 1000
        / 24;
      revisionElapsedDays = parseInt(revisionElapsedDaysUnparsed, 10) + 1;
    }

    const createdElapsedDaysUnparsed = (new Date().getTime()
        - new Date(currentAnki.get('createdAt')).getTime())
      / 60
      / 60
      / 1000
      / 24;
    createdElapsedDays = parseInt(createdElapsedDaysUnparsed, 10) + 1;

    return (
      <Card
        fluid
        // id="modal-anki"
        className={`${window.isMobile && 'mobile'}`}
        data-role="modal-anki"
      >
        <div
          className="border-bottom-black flex-container-row"
          id="anki-question"
        >
          <span
            className="flex-1 padding-horizontal-10"
            style={{ overflow: 'auto' }}
          >
            <span className="height-lineheight-30 font-18">
              {currentAnki.get('question')}
            </span>
          </span>
        </div>

        {currentAnki.size > 0 && (
          <div id="anki-answer-thumbnail">
            <span className="pull-right bg-green label">
              {revisionAnkisTotal}
            </span>

            {!window.isMobile && (
              <React.Fragment>
                <span className="pull-right bg-green label">
                  {'Created: '}
                  {createdElapsedDays}
                  {'d Ago'}
                </span>

                <span className="pull-right bg-green label">
                  {`Rev: ${revisionElapsedDays} - ${currentAnki.getIn([
                    'revision',
                    'round'
                  ])}/${currentAnki.getIn(['revision', 'passing'])}`}
                </span>
              </React.Fragment>
            )}

            {currentAnki.has('tags') && currentAnki.get('tags').map((tag, index) => (
              <span
                className="pull-right bg-orange label"
                key={tag.get('_id')}
              >
                {tag.get('name')}
              </span>
            ))}
          </div>
        )}

        <div id="anki-answer" className="flex-component-center">
          {showAnswer && (
            <div
              id="anki-answer-content"
              className="margin-top-30 margin-bottom-50  padding-horizontal-20 font-18"
            >
              {currentAnki.get('answer')}
            </div>
          )}

          <div className="flex-horizontal-center" id="anki-answer-buttons">
            {!showAnswer && (
              <button
                type="button"
                className="btn-large"
                onClick={this.toggleAnswer}
              >
                  SHOW ANSWER
              </button>
            )}

            {showAnswer && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn-large"
                  onClick={event => this.updateAnki(event, 1)}
                >
                    PASS
                </button>

                <button
                  type="button"
                  className="btn-large bg-green"
                  onClick={evnet => this.updateAnki(event, 2)}
                >
                    GOOD
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </Card>
    );
  }
}

AnkiPage.defaultProps = {
  currentAnki: Map(),
  revisionAnkisTotal: 0
};

AnkiPage.propTypes = {
  currentAnki: PropTypes.object,
  revisionAnkisTotal: PropTypes.number,

  AnkiActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentAnki: currentAnkiSelector(state),
    revisionAnkisTotal: revisionAnkisTotalSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AnkiActions: bindActionCreators(AnkiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnkiPage);
