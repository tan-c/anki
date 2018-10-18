import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment';

import { EventRecordActions, selectedEventEventRecordsSelector } from 'utility-redux/hourblock/eventRecord';

export class EventRecordsList extends React.Component {
  render() {
    const { eventRecords, selectedEvent } = this.props;
    return (
      <React.Fragment>
        <div className="section-header">Event Records</div>
        <div className="section-content">
          { eventRecords.valueSeq().map(rec => (
            <div key={rec.get('_id')} className="margin-bottom-10">
              <div className="flex-container-row text-left bg-white-10">
                <span className="flex-1">
                  {moment(rec.get('startedAt')).add(parseInt(rec.get('sectionOfDay'), 10) / 2, 'hour').format('MM-DD HH:mm')}
                </span>
                <i role="button" tabIndex="-1" className="fa fa-fw fa-close" onClick={_ => this.props.EventRecordActions.deleteRecord(rec)} />
              </div>

              {['duration', 'venue', 'spending', 'value', 'comment'].filter(field => selectedEvent.getIn(['details', field])).map(field => (
                <div className="flex-container-row border-bottom-white-20" key={field}>
                  <span className="flex-1 text-right border-right-white-20">{field}</span>
                  <span className="flex-3 text-left">
                    {rec.getIn(['details', field])}
                  </span>
                </div>))}
            </div>))
          }
        </div>
      </React.Fragment>
    );
  }
}

EventRecordsList.defaultProps = {
  eventRecords: Map(),
  selectedEvent: Map(),
};

EventRecordsList.propTypes = {
  eventRecords: PropTypes.object,
  selectedEvent: PropTypes.object,

  EventRecordActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    eventRecords: selectedEventEventRecordsSelector(state),
    selectedEvent: state.events.get(state.ui.getIn(['hourblock', 'settingsPage', 'selectedEventId'])),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EventRecordActions: bindActionCreators(EventRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRecordsList);
