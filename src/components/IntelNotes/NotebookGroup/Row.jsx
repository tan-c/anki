import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import toastr from 'toastr';

import InputUncontrolledConnected from 'utility-react-component/Form/Input/Uncontrolled';

import { NotebookActions } from 'utility-redux/anki/notebook';
import { NotebookGroupActions } from 'utility-redux/anki/notebookGroup';

export class NotebookGroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: 0,
    };
  }

  onKeyDown = (event) => {
    if (event.which === 13) {
      this.setState({
        editMode: 0,
      });
      this.props.NotebookGroupActions.update(this.state.notebookGroup);
    }
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: 1 - prevState.editMode,
    }));
  }

  createNotebook = (notebookGroup) => {
    this.props.NotebookActions.create({
      title: 'test-notebook',
      notebookGroup: notebookGroup.get('_id'),
    });
  }

  dragOver = (event) => {
    // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element. This is done by calling the event.preventDefault() method for the ondragover attribute.
    // https:// www.w3schools.com/tags/ev_ondragover.asp
    event.preventDefault();
  }

  drop = (event, notebookGroup) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('text'));
    if (data.source === 'notebook') {
      data.notebook.notebookGroup = notebookGroup.get('_id');
      this.props.NotebookActions.update(data.notebook);
    } else {
      toastr.error('', 'Source Must Be Notebook');
    }
  }

  deleteNotebookGroup = () => {
    if (confirm('Sure to delete this notebookGroup')) {
      this.props.NotebookGroupActions.deleteRecord(this.props.notebookGroup);
    }
  }

  render() {
    const { editMode } = this.state;
    const { notebookGroup, notebooks } = this.props;

    return (
      <div
        data-role="notebookgroup-row"
        onDragOver={this.dragOver}
        onDrop={event => this.drop(event, notebookGroup)}
        className="flex-container-row typical-setup overflow-hidden color-white-70 border-bottom-white-20 padding-horizontal-5"
      >
        {editMode === 0
        && (
          <React.Fragment>
            <span className="flex-3 text-left">
              {notebookGroup.get('title')}
            </span>
            <span role="button" tabIndex="-1" className="flex-1 text-right" onClick={_ => this.createNotebook(notebookGroup)}>+</span>
          </React.Fragment>
        )}

        {editMode === 1 && (
          <InputUncontrolledConnected
            inputName="title"
            record={notebookGroup}
            actions={this.props.NotebookGroupActions}
          />
        )}

        { notebooks.filter(notebook => notebook.getIn(['notebookGroup', '_id']) === notebookGroup.get('_id')).count() === 0
          && <i role="menuitem" tabIndex="-1" className="fa fa-fw fa-close font-14" onClick={this.deleteNotebookGroup} />
        }

        <i role="menuitem" tabIndex="-1" className="fa fa-fw fa-edit font-14" onClick={this.toggleEditMode} />
      </div>
    );
  }
}

NotebookGroupRow.defaultProps = {
  notebooks: Map(),
  notebookGroup: Map(),
};

NotebookGroupRow.propTypes = {
  notebooks: PropTypes.object,
  notebookGroup: PropTypes.object,

  NotebookActions: PropTypes.object.isRequired,
  NotebookGroupActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    notebooks: state.notebooks,
    notebookGroup: ownProps.notebookGroup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    NotebookActions: bindActionCreators(NotebookActions, dispatch),
    NotebookGroupActions: bindActionCreators(NotebookGroupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookGroupRow);
