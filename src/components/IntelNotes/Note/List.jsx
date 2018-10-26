import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import {
  activeNotebookNotesSortedSelector
} from 'utility-redux/note';

import NoteRowConnected from './Row';

export class NoteList extends React.Component {
  render() {
    const { notes } = this.props;

    return (
      <React.Fragment>
        <div className="text-center border-bottom-black">
          Notes:
          {' '}
          {notes.size}
        </div>

        {notes.valueSeq().map(note => (
          <NoteRowConnected
            key={note.get('_id')}
            note={note}
          />
        ))}
      </React.Fragment>);
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
