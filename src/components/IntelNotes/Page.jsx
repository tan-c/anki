// // import {Link} from 'react-router';
// import { Map } from 'immutable';

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NoteEditorConnected from './NoteEditor/NoteEditor';
import NoteListConneted from './Note/List';
import NotebookGroupListConnected from './NotebookGroup/List';

export class IntelNotePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        {!window.isMobile
          && (
            <React.Fragment>
              <NotebookGroupListConnected />
              <NoteListConneted />
              <NoteEditorConnected />
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

IntelNotePage.defaultProps = {
};

IntelNotePage.propTypes = {
  // ui: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}


function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntelNotePage);
