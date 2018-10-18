import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Map } from 'immutable';

import { NotebookActions } from 'utility-redux/anki/notebook';
import { NoteActions } from 'utility-redux/anki/note';
import { UiActions } from 'utility-redux/common/ui';
import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';

export class NotebookRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.editMode !== nextState.editMode) {
      return true;
    }

    let shouldUpdate = false;
    Object.keys(nextProps).forEach((key) => {
      // If notes, update when created new notes or when deleting note
      if (key === 'notes') { // do not stringify as it is costly
        if (this.props[key].filter(note => note.get('isDeleted')).size === nextProps[key].filter(note => note.get('isDeleted')).size && this.props[key].count() !== nextProps[key].count()) {
          shouldUpdate = true;
        }
      } else if (JSON.stringify(this.props[key]) !== JSON.stringify(nextProps[key])) {
        // Note change should only trigger update if the number changed
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  toggleEditMode = (event) => {
    event.stopPropagation(); // Do not trigger the click event to set activeNotebook
    // event.nativeEvent.stopImmediatePropagation();
    this.setState(prevState => ({
      editMode: 1 - prevState.editMode,
    }));
  }

  deleteNotebook = () => {
    if (confirm('Sure to delete this notebook')) {
      this.props.NotebookActions.deleteRecord(this.props.notebook);
    }
  }

  dragStart = (event, notebook) => {
    event.dataTransfer.setData('text', JSON.stringify({
      notebook,
      source: 'notebook',
    }));
  }

  dragOver = (event) => {
    event.preventDefault();
  }

  drop = (event) => {
    const {
      notebook,
    } = this.props;
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData('text'));
    if (data.source === 'note') {
      data.note.notebook = notebook.get('_id');
      this.props.NoteActions.update(data.note);
    } else {
      toastr.error('', 'Source Must Be Note');
    }
  }

  render() {
    const {
      notebook, activeNotebookId, notes,
    } = this.props;

    const { editMode } = this.state;

    return (
      <div
        data-role="notebook-row"
        role="menuitem" tabIndex="-1" draggable="true" onDragStart={event => this.dragStart(event, notebook)} onDragOver={this.dragOver} onDrop={this.drop} className={`flex-container-row typical-setup ${notebook.get('_id') === activeNotebookId && 'bg-red'}`} onClick={() => {
          this.props.UiActions.updateIn(['himalayan', 'activeNotebookId'], notebook.get('_id'));
        }}
      >
        <span data-test="notebook-title" className="flex-3">
          {!editMode ? notebook.get('title') : (
            <InputUncontrolledConnected
              inputName="title"
              record={notebook}
              actions={this.props.NotebookActions}
            />
          )}
        </span>

        { notes.filter(note => note.getIn(['notebook', '_id']) === notebook.get('_id')).count() === 0
          && <i role="menuitem" tabIndex="-1" className="fa fa-fw fa-close font-14" onClick={this.deleteNotebook} />
        }

        <i role="menuitem" tabIndex="-1" className="fa fa-fw fa-edit font-14" onClick={this.toggleEditMode} />

        <div className="width-15 bg-white-20 text-center">
          {notes.filter(note => note.getIn(['notebook', '_id']) === notebook.get('_id') && !note.get('isDeleted')).size}
        </div>
      </div>
    );
  }
}

NotebookRow.defaultProps = {
  notes: Map(),
  notebook: Map(),
  activeNotebookId: '',

  NotebookActions: {},
  NoteActions: {},
  UiActions: {},
};

NotebookRow.propTypes = {
  notes: PropTypes.object,
  notebook: PropTypes.object,
  activeNotebookId: PropTypes.string,

  NotebookActions: PropTypes.object,
  NoteActions: PropTypes.object,
  UiActions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    notebook: ownProps.notebook,
    activeNotebookId: state.ui.getIn(['himalayan', 'activeNotebookId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    NotebookActions: bindActionCreators(NotebookActions, dispatch),
    NoteActions: bindActionCreators(NoteActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookRow);
