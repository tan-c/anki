import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { UiActions } from 'utility-redux/ui';
import { currentUserRecentNoteIdSelector } from 'utility-redux/user';

export class RecentNoteRow extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      recentNote,
    } = this.props;

    return (
      <div
        data-role="recentnote-row"
        className="border-bottom-white flex-container-row typical-setup overflow-hidden"
      >
        <i className="fa fa-fw fa-eye wdith-20" />
        {recentNote.length > 0
          && <div className="flex-1" role="menuitem" tabIndex="-1" />
        }

        {recentNote.length === 0
          && <div className="flex-1"> No Recent</div>
        }
      </div>
    );
  }
}

RecentNoteRow.defaultProps = {
  recentNote: '',
};

RecentNoteRow.propTypes = {
  recentNote: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    recentNote: currentUserRecentNoteIdSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentNoteRow);
