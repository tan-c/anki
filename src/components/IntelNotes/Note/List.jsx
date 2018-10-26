import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';

import {
  NoteActions,
  activeNotebookIdSelector,
  activeNotebookNotesSortedSelector
} from 'utility-redux/note';

import NoteRowConnected from './Row';

export class NoteList extends React.Component {
  render() {
    const {
      activeNotebookNotes,
      activeNotebookId
    } = this.props;

    return (
      <React.Fragment>
        <div className="text-center border-bottom-black">
          {`Notes: ${activeNotebookNotes.size} - - `}

          {activeNotebookId.length && (
            <Button
              size="tiny"
              onClick={(_) => {
                this.props.NoteActions.create({
                  notebook: activeNotebookId,
                  title: 'new note'
                });
              }}
            >
              Create New
            </Button>
          )}
        </div>

        {
          activeNotebookNotes.valueSeq().map(note => (
            <NoteRowConnected
              key={note.get('_id')}
              note={note}
            />
          ))
        }
      </React.Fragment>);
  }
}

NoteList.defaultProps = {
  activeNotebookId: '',
};

NoteList.propTypes = {
  activeNotebookId: PropTypes.string,
  activeNotebookNotes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    activeNotebookId: activeNotebookIdSelector(state),
    activeNotebookNotes: activeNotebookNotesSortedSelector(state),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    NoteActions: bindActionCreators(NoteActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
