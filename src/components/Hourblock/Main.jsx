import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from 'react-router-dom';
import HourblockPageConnected from './HourBlock/Page';

import FooterConnected from './_layout/Footer';
import LeftAsideConnected from './_layout/LeftAside';
import RightAsideConnected from './_layout/RightAside';

export class MainHourBlock extends React.Component {
  render() {
    const { showMonthlyCalendar } = this.props;

    return (
      <main id="hourblock" data-role="main-hourblock" className={`${window.isMobile && 'mobile'} ${showMonthlyCalendar && 'with-right-calendar'}`}>
        {!window.isMobile
          && (
            <React.Fragment>
              <FooterConnected />
              <LeftAsideConnected />
              {showMonthlyCalendar && <RightAsideConnected />}
            </React.Fragment>
          )
        }

        <Switch>
          <Route exact path="/hourblock" component={HourblockPageConnected} />
        </Switch>
      </main>);
  }
}

MainHourBlock.defaultProps = {
  showMonthlyCalendar: false,
};

MainHourBlock.propTypes = {
  showMonthlyCalendar: PropTypes.bool,
};


function mapStateToProps(state, ownProps) {
  return {
    showMonthlyCalendar: state.ui.getIn(['hourblock', 'hourblockPage', 'showMonthlyCalendar']),
  };
}

export default connect(mapStateToProps)(MainHourBlock);
