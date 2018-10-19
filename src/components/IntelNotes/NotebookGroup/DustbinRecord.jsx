import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UiActions } from 'utility-redux/ui';
import { NoteActions } from 'utility-redux/note';

export class DustbinRecord extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      activeNotebookId, notes,
    } = this.props;

    return (
      <div
        data-role="dustbin-record"
        role="menuitem" tabIndex="-1" className={`flex-container-row typical-setup ${activeNotebookId === 'deleted' && 'bg-red'}`} onClick={(_) => { this.props.UiActions.updateIn(['himalayan', 'activeNotebookId'], 'deleted'); }}
      >
        <i className="fa fa-fw fa-trash-o wdith-20" />
        <div className="flex-1">Dustbin</div>
        <span>{notes.filter(note => note.get('isDeleted')).size}</span>
        <i
          className="fa fa-fw fa-trash-o wdith-20" role="button" tabIndex="-1" onClick={(event) => {
            if (confirm('Clear dustbin?')) {
              this.props.NoteActions.deleteRecords({ isDeleted: true });
            }
          }}
        />
      </div>
    );
  }
}

DustbinRecord.defaultProps = {
  activeNotebookId: '',
};

DustbinRecord.propTypes = {
  notes: PropTypes.object.isRequired,
  activeNotebookId: PropTypes.string,

  NoteActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    activeNotebookId: state.ui.getIn(['himalayan', 'activeNotebookId']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    NoteActions: bindActionCreators(NoteActions, dispatch),
    UiActions: bindActionCreators(UiActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DustbinRecord);
