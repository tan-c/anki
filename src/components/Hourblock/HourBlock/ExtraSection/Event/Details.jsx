import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import moment from 'moment';
import { EventRecordActions } from 'utility-redux/hourblock/eventRecord';
import { UiActions } from 'utility-redux/common/ui';

export class EventDetails extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //   });
  // }

  updateEventDetails = (event) => {
    if (event.which === 13) {
      const { value, name } = event.target;
      const { selectedEventRecordId, eventRecords } = this.props;
      const record = eventRecords.get(selectedEventRecordId);
      const newRecord = record.setIn(['details', name], value);
      this.props.EventRecordActions.update(newRecord).then((rec) => {
        this[`${name}Input`].value = '';
      });
    }
  }

  render() {
    const { selectedEventRecordId, eventRecords } = this.props;
    const selectedEventRecord = eventRecords.get(selectedEventRecordId) || Map();
    const selectedEventRecords = eventRecords.valueSeq().filter(rec => rec.getIn(['event', '_id']) === selectedEventRecord.getIn(['event', '_id'])).sort((a, b) => {
      if (moment(a.get('startedAt')).unix() === moment(b.get('startedAt')).unix()) {
        return parseInt(a.get('sectionOfDay'), 10) - parseInt(b.get('sectionOfDay'), 10);
      }
      return moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix();
    });

    // FIXME: will always show second last even for past events
    const lastEvent = selectedEventRecords.has(1) ? selectedEventRecords.get(-2) : Map();

    return (
      <React.Fragment>
        {selectedEventRecordId.length > 0
          && (
            <section className="flex-1 border-white">
              <div className="flex-container-row section-header bg-green">
                <span className="flex-1">{selectedEventRecord.getIn(['event', 'name'])}</span>
                <span className="width-20">
                  <i
                    role="button" tabIndex="-1"
                    className="fa fa-fw fa-eye" onClick={(_) => {
                      this.props.UiActions.updateIn(['hourblock', 'hourblockPage', 'selectedEventRecordId'], '');
                    }}
                  />
                </span>
              </div>

              <div className="section-content">
                {['duration', 'venue', 'spending', 'value', 'comment'].filter(field => selectedEventRecord.getIn(['event', 'details', field])).map(field => (
                  <span className="flex-container-row typical-setup" key={field}>
                    <span className="flex-1 text-right">{field}</span>
                    <span className="flex-2">
                      <input
                        type="text"
                        name={field}
                        ref={(ref) => {
                          this[`${field}Input`] = ref;
                        }}
                        placeholder={selectedEventRecord.getIn(['details', field])}
                        onKeyDown={this.updateEventDetails}
                      />
                    </span>
                    <span className="flex-1">
                      {lastEvent.getIn(['details', field])}
                    </span>
                  </span>))}
              </div>
            </section>
          )}
      </React.Fragment>
    );
  }
}

EventDetails.defaultProps = {
  selectedEventRecordId: '',
  eventRecords: Map(),
};

EventDetails.propTypes = {
  selectedEventRecordId: PropTypes.string,
  eventRecords: PropTypes.object,

  EventRecordActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    selectedEventRecordId: state.ui.getIn(['hourblock', 'hourblockPage', 'selectedEventRecordId']),
    eventRecords: state.eventRecords,
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EventRecordActions: bindActionCreators(EventRecordActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
