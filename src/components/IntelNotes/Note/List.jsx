import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { activeNotebookNotesSortedSelector } from 'utility-redux/note';

import NoteRowConnected from './Row';

export class NoteList extends React.Component {
  render() {
    const { notes } = this.props;

    return (
      <div data-role="note-list" id="note-list" className="bg-white-70 border-right-dark-blue">
        <div className="text-center border-bottom-black">
          <div className="font-400 flex-1">
Notes:
            {notes.size}
          </div>
        </div>

        {notes.valueSeq().map(note => (
          <NoteRowConnected key={note.get('_id')} note={note} />
        ))}
      </div>);
  }
}

NoteList.propTypes = {
  notes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    notes: activeNotebookNotesSortedSelector(state),
  };
}

export default connect(mapStateToProps)(NoteList);
