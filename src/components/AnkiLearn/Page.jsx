import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import keydown from 'react-keydown';
// import toastr from 'toastr';
// import Highlight from 'react-highlight'; // FIXME: removed as it introduced an older version of react
import { Map, fromJS } from 'immutable';
import {
  Card, Grid, Button, Header, Container, Divider
} from 'semantic-ui-react';

import {
  AnkiActions,
  currentAnkiSelector,
  revisionAnkisTotalSelector
} from 'utility-redux/anki';

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
      <Grid.Row>
        <Card
          fluid
          // id="modal-anki"
          data-role="modal-anki"
          style={{
            minHeight: 300
          }}
        >
          <Container>
            <Grid>
              <Grid.Column floated="left" width={5} />
              <Grid.Column floated="right" width={5} textAlign="right">
                {currentAnki.size > 0 && (
                  <React.Fragment>
                    <span className="pull-right bg-green label">
                      {revisionAnkisTotal}
                    </span>

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

                    {currentAnki.has('tags') && currentAnki.get('tags').map((tag, index) => (
                      <span
                        className="pull-right bg-orange label"
                        key={tag.get('_id')}
                      >
                        {tag.get('name')}
                      </span>
                    ))}
                  </React.Fragment>
                )}
              </Grid.Column>
            </Grid>
          </Container>

          <Header as="h3" textAlign="center">
            {currentAnki.get('question')}
          </Header>

          {showAnswer
            && (
              <Container text textAlign="center">
                {currentAnki.get('answer')}
              </Container>
            )
          }

          <Divider />

          <Container textAlign="center">
            {!showAnswer && (
              <Button
                primary
                onClick={this.toggleAnswer}
              >
                SHOW ANSWER
              </Button>
            )}

            {showAnswer && (
              <React.Fragment>
                <Button
                  className="btn-large"
                  onClick={event => this.updateAnki(event, 1)}
                >
                  PASS
                </Button>

                <Button
                  color="green"
                  onClick={evnet => this.updateAnki(event, 2)}
                >
                  GOOD
                </Button>
              </React.Fragment>
            )}
          </Container>
        </Card>
      </Grid.Row>
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
