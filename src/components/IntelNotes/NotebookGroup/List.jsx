import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { NotebookGroupActions } from 'utility-redux/notebookGroup';

import DustbinRecordConnected from './DustbinRecord';
import RecentNoteRowConnected from './RecentNoteRow';
import NotebookListConnected from '../Notebook/List';
import NotebookGroupListRowConnected from './Row';

export class NotebookGroupList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editMode: 0,
  //   };
  // }

  render() {
    const {
      notebookGroups,
    } = this.props;

    return (
      <div data-role="notebookgroup-list" id="notebook-list">
        <DustbinRecordConnected />
        <RecentNoteRowConnected />
        <div className="spacing-10" />

        {notebookGroups.valueSeq().sort((a, b) => (a.get('title') > b.get('title') ? 1 : -1)).map(notebookGroup => (
          <div className="margin-bottom-10" key={notebookGroup.get('_id')}>
            <NotebookGroupListRowConnected notebookGroup={notebookGroup} />
            <NotebookListConnected notebookGroupId={notebookGroup.get('_id')} />
          </div>))}

        <button
          id="new-notebook-group"
          className="bg-green"
          onClick={(_) => {
            this.props.NotebookGroupActions.create({
              title: 'test-notebook',
            });
          }}
        >
          + Notebook Group
        </button>
      </div>
    );
  }
}

NotebookGroupList.defaultProps = {
  notebookGroups: Map(),
};

NotebookGroupList.propTypes = {
  notebookGroups: PropTypes.object,

  NotebookGroupActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    notebookGroups: state.notebookGroups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    NotebookGroupActions: bindActionCreators(NotebookGroupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookGroupList);
