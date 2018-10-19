import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { EventActions, eventsSortedByProjectThenCategorySelector } from 'utility-redux/event';
import { UiActions } from 'utility-redux/ui';

import ProjectSelectConnected from 'utility-react-component/Form/HourblockProjectSelect';
import Input from 'utility-react-component/Form/Input/Uncontrolled';
import InputNewConnected from 'utility-react-component/Form/Input/New';

export class EventsList extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  toggleField = (selectedEventId, field) => {
    const event = this.props.eventsSorted.get(selectedEventId);
    this.props.EventActions.update(event.setIn(['details', field], !event.getIn(['details', field])));
  }

  updateEventProject = (event, rec) => {
    const { value } = event.target;
    let newRecord = rec;
    if (value === '') {
      // Delete wont work, set to null instead
      newRecord = rec.set('project', null);
    } else {
      newRecord = rec.set('project', value);
    }
    this.props.EventActions.update(newRecord);
  }

  render() {
    const { eventsSorted, eventRecords, selectedEventId } = this.props;

    return (
      <React.Fragment>
        <section className="flex-1">
          <div className="section-header">Event List</div>
          <div className="section-content">
            <div className="list-with-pinned-bottom">
              {eventsSorted.valueSeq().map(rec => (
                <div
                  className={`flex-container-row typical-setup ${rec.get('_id') === selectedEventId && 'bg-orange'}`}
                  key={rec.get('_id')}
                >
                  <span className="flex-1">
                    <ProjectSelectConnected
                      onChangeEvent={event => this.updateEventProject(event, rec)}
                      value={rec.getIn(['project', '_id'])}
                      color={rec.getIn(['project', 'category', 'color'])}
                    />
                  </span>

                  <span role="button" tabIndex="-1" className="flex-2" onClick={_ => this.props.UiActions.updateIn(['hourblock', 'settingsPage', 'selectedEventId'], rec.get('_id'))}>
                    <Input
                      inputName="name"
                      record={rec}
                      actions={this.props.EventActions}
                    />
                  </span>

                  <span className="width-20">
                    {eventRecords.valueSeq().filter(record => record.getIn(['event', '_id']) === rec.get('_id')).count() === 0
                      && <i role="button" tabIndex="-1" className="fa fa-fw fa-close" onClick={_ => this.props.EventActions.deleteRecord(rec)} />
                    }
                  </span>
                </div>))
              }
            </div>

            <div className="flex-container-row pinned-bottom border-top">
              <InputNewConnected
                inputName="name"
                actions={this.props.EventActions}
              />
            </div>
          </div>
        </section>

        <section className="flex-1 border-white">
          <div className="section-header">
Details -
            {eventsSorted.getIn([selectedEventId, 'name'])}
          </div>
          {selectedEventId.length && ['duration', 'venue', 'spending', 'value', 'comment'].map(field => (
            <div className="flex-container-row" key={field}>
              <span className="flex-1">{field}</span>
              <i role="button" tabIndex="-1" className={`fa fa-fw fa-check ${eventsSorted.getIn([selectedEventId, 'details', field]) && 'color-green'}`} onClick={_ => this.toggleField(selectedEventId, field)} />
            </div>))}
        </section>
      </React.Fragment>
    );
  }
}

EventsList.defaultProps = {
  eventsSorted: Map(),
  eventRecords: Map(),
  selectedEventId: '',
};

EventsList.propTypes = {
  eventsSorted: PropTypes.object,
  eventRecords: PropTypes.object,
  selectedEventId: PropTypes.string,

  EventActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    eventsSorted: eventsSortedByProjectThenCategorySelector(state),
    eventRecords: state.eventRecords,
    selectedEventId: state.ui.getIn(['hourblock', 'settingsPage', 'selectedEventId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EventActions: bindActionCreators(EventActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
