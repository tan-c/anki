import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { Link, withRouter } from 'react-router-dom';

export class MenuList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const { location } = this.props;

    return (
      <nav id="menu" data-role="menu-list">
        <ul>
          <li className={location.pathname === '/hourblock' ? 'bg-green' : ''}>
            <Link to="/hourblock">
              <i className="fa fa-fw fa-dashboard" />
            </Link>
          </li>
          <li className={location.pathname === '/hourblock/planning' ? 'bg-green' : ''}>
            <Link to="/hourblock/planning">
              <i className="fa fa-fw fa-calendar" />
            </Link>
          </li>
          <li className={location.pathname === '/hourblock/tasks' ? 'bg-green' : ''}>
            <Link to="/hourblock/tasks">
              <i className="fa fa-fw fa-list" />
            </Link>
          </li>
          <li className={location.pathname === '/hourblock/settings' ? 'bg-green' : ''}>
            <Link to="/hourblock/settings">
              <i className="fa fa-fw fa-cog" />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

MenuList.propTypes = {
  location: PropTypes.object.isRequired,
};

// function mapStateToProps(state, ownProps) {
//   return {
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

export default withRouter(MenuList);
