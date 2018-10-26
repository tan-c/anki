import React from 'react';
import PropTypes from 'prop-types';
// import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import toastr from 'toastr';

import { NoteActions } from 'utility-redux/note';
// import { UiActions } from 'utility-redux/ui';
import {
  UserActions,
  currentUserSelector,
  currentUserRecentNoteIdSelector,
  currentUserRecentNotebookIdSelector
} from 'utility-redux/user';

export class NoteRow extends React.Component {
  onDragOver = (event) => {
    // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element. This is done by calling the event.preventDefault() method for the ondragover attribute.

    // https:// www.w3schools.com/tags/ev_ondragover.asp
    event.preventDefault();
  }

  onDragStart = (event) => {
    const { note } = this.props;
    event.dataTransfer.setData('text', JSON.stringify({
      note,
      source: 'note',
    }));
  }

  onClickNote = () => {
    const { note, currentUser } = this.props;
    this.props.UserActions.update(currentUser.setIn(['config', 'hima', 'recentNote'], note.get('_id')));
  }

  updateDeletedFlagNote = (event) => {
    const { note } = this.props;
    event.stopPropagation();
    if (confirm('Really moving to dustbin?')) {
      this.props.NoteActions.update(note.set('isDeleted', true));
    }
  }

  deleteNote = (event) => {
    const { note } = this.props;
    event.stopPropagation();
    if (confirm('Really deleting?')) {
      this.props.NoteActions.deleteRecord(note);
    }
  }

  render() {
    const {
      note, activeNoteId, activeNotebookId,
    } = this.props;

    return (
      <div
        role="menuitem"
        tabIndex="-1"
        data-role="note-row"
        onDragOver={this.onDragOver}
        draggable="true"
        onDragStart={this.onDragStart}
        onClick={this.onClickNote}
        className={`flex-container-row typical-setup ${note.get('_id') === activeNoteId ? 'bg-red' : 'bg-orange-light'} 'border-right-orange-light-5px'`}
      >
        <span className="flex-1">
          {note.get('title')}
        </span>

        {activeNotebookId === 'deleted' && (
          <i
            role="button"
            tabIndex="-1"
            className="fa fa-fw fa-trash font-20"
            onClick={this.deleteNote}
          />
        )}

        {activeNotebookId !== 'deleted'
          && (
            <i
              role="button"
              tabIndex="-1"
              className="fa fa-fw fa-close font-20"
              onClick={this.updateDeletedFlagNote}
            />
          )}
      </div>
    );
  }
}

NoteRow.defaultProps = {
  activeNoteId: ''
};

NoteRow.propTypes = {
  currentUser: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  activeNoteId: PropTypes.string,
  activeNotebookId: PropTypes.string.isRequired,

  NoteActions: PropTypes.object.isRequired,
  UserActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    note: ownProps.note,
    currentUser: currentUserSelector(state),
    activeNoteId: currentUserRecentNoteIdSelector(state),
    activeNotebookId: currentUserRecentNotebookIdSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
    NoteActions: bindActionCreators(NoteActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteRow);
