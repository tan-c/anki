import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Map } from 'immutable';
import {
  Icon, Label, Menu, Table
} from 'semantic-ui-react';

import { dailyRecordPomoCountByDayOfYearSelector } from 'utility-redux/dailyRecord';

class DailyPomoCount extends React.Component {
  render() {
    const { dailyRecordPomoCountByDayOfYear } = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Valid Pomo Count</Table.HeaderCell>
            <Table.HeaderCell>Total Pomo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dailyRecordPomoCountByDayOfYear.valueSeq().sort((a, b) => moment(a.get('startedAt')).unix() - moment(b.get('startedAt')).unix()).map(item => (
            <Table.Row
              key={item.get('_id')}
            >
              <Table.Cell
                className={`${moment(item.get('startedAt')).isoWeekday() > 5 && 'color-orange'}`}
              >
                {moment(item.get('startedAt')).format('YYYY-MM-DD, dddd')}
              </Table.Cell>

              <Table.Cell>
                {item.get('pomoCount')}
              </Table.Cell>

              <Table.Cell>
                {item.get('totalPomoCount')}
              </Table.Cell>
            </Table.Row>))}
        </Table.Body>
      </Table>
    );
  }
}

DailyPomoCount.defaultProps = {
  dailyRecordPomoCountByDayOfYear: Map(),
};

DailyPomoCount.propTypes = {
  dailyRecordPomoCountByDayOfYear: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    dailyRecordPomoCountByDayOfYear: dailyRecordPomoCountByDayOfYearSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyPomoCount);
