import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import MenuListConnected from './MenuList';
import CategoryInsightsConnected from './CategoryInsights';
import WeeklyInsightsConnected from './WeeklyInsights';

export class LeftAside extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dailyRecords.size) {
  //     const { dailyRecords } = nextProps;
  //   }
  // }

  render() {
    return (
      <aside id="left-menu" className={`${window.isMobile && 'mobile'}`}>
        <MenuListConnected />
        {!window.isMobile
        && (
          <React.Fragment>
            <div className="spacing-20" />
            <CategoryInsightsConnected />
            <div className="spacing-20" />
            <WeeklyInsightsConnected />
          </React.Fragment>
        )
        }

      </aside>
    );
  }
}

export default LeftAside;
