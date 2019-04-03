import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
// import { Map } from 'immutable';
import { currentUserSelector } from 'utility-redux/user';
import { Grid } from 'semantic-ui-react';

// import { UiActions } from 'utility-redux/ui';

import HourBlockListConnected from './List';
import CategoryInsightsConnected from '../Hourblock/LeftAside/CategoryInsights';
import WeeklyInsightsConnected from '../Hourblock/LeftAside/WeeklyInsights';
import DailyRecordsChartConnected from './DailyRecordsChart';

import FooterConnected from './Footer';

export class HourBlockPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dayObjectOffset: 0,
      // NOTE - This should be based on localtimezone
      dayMomentObject: moment().startOf('day'),
    };
  }

  updateDayMomentObject = (offset) => {
    const { dayObjectOffset } = this.state;
    const newDayObjectOffset = offset === 0 ? offset : dayObjectOffset + offset;
    this.setState({
      dayObjectOffset: newDayObjectOffset,
      // NOTE - This should be based on localtimezone
      dayMomentObject: moment().startOf('day').add(newDayObjectOffset, 'day'),
    });
  }

  // {loadingPomoList &&
  //   <div className="loading-spinner">
  //     <i className="fa fa-cog fa-spin fa-1x fa-fw" />
  //   </div>
  // }

  renderHourBlockList = () => {
    const { dayMomentObject } = this.state;
    return (
      <Fragment>
        <Grid>
          <Grid.Column
            width={10}
            className={`text-left height-40 line-height-40 font-400 font-24 margin-left-10 ${dayMomentObject.dayOfYear() === moment().dayOfYear() ? 'color-green' : ''}`}
          >
            {dayMomentObject.format('YYYY-MM-DD ddd')}
            {' '}
            - W
            {dayMomentObject.isoWeek()}
          </Grid.Column>

          <Grid.Column
            width={6}
            className="flex-1 text-right margin-right-10"
          >
            <div className="font-400 color-green height-20 line-height-20">QUICK LINK</div>
            <br />
            <div className="height-20 line-height-20">
              <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(-1)}>Last Day</span>
              <span>|</span>
              <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(0)}>Today</span>
              <span>|</span>
              <span role="button" tabIndex="-1" onClick={_ => this.updateDayMomentObject(1)}>Next Day</span>
            </div>
          </Grid.Column>
        </Grid>

        <HourBlockListConnected dayMomentObject={dayMomentObject} />
      </Fragment>
    );
  }

  renderRightSection = () => {
    const { dayMomentObject } = this.state;

    return (
      <Grid style={{
        flexDirection: 'column'
      }}
      >
        <Grid.Row>
          <DailyRecordsChartConnected />
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Row
          data-role="hourblock-page"
          style={{
            height: '100%',
            // padding: 0
          }}
        >
          <Grid.Column
            width={2}
            className="left-aside"
            style={{
              overflow: 'auto'
            }}
          >
            <CategoryInsightsConnected />
            <WeeklyInsightsConnected />
          </Grid.Column>

          <Grid.Column
            width={10}
            style={{
              overflow: 'auto'
            }}
          >
            {this.renderHourBlockList()}
          </Grid.Column>

          <Grid.Column
            width={4}
            style={{
              overflow: 'auto'
            }}
          >
            {this.renderRightSection()}
          </Grid.Column>
        </Grid.Row>

        <FooterConnected />
      </React.Fragment>
    );
  }
}

HourBlockPage.defaultProps = {
};

HourBlockPage.propTypes = {

};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(HourBlockPage);
