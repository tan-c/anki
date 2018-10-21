import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import SearchModal from '../_modal/Search';
import FileModal from '../_modal/File';

import NoteEditorConnected from './NoteEditor/NoteEditor';
import NoteListConneted from './Note/List';
import NotebookGroupListConnected from './NotebookGroup/List';

export class IntelNotePage extends React.Component {
  render() {
    const { showModal } = this.props;

    return (
      <React.Fragment>
        {showModal === 'search' && <SearchModal />}
        {showModal === 'file' && <FileModal />}

        <Grid.Row
          id="intelnote" style={{
            height: '100%'
          }}
        >
          <Grid.Column
            width={3}
            className="left-aside"
            style={{
              overflow: 'auto'
            }}
          >
            <NotebookGroupListConnected />
          </Grid.Column>

          <Grid.Column
            width={3}
            className="left-aside"
            style={{
              overflow: 'auto'
            }}
          >
            <NoteListConneted />
          </Grid.Column>

          <Grid.Column
            width={10}
            className="left-aside"
            style={{
              overflow: 'auto',
              background: 'white',
              border: '1px solid red'
            }}
          >
            <NoteEditorConnected />
          </Grid.Column>
        </Grid.Row>

      </React.Fragment>
    );
  }
}

IntelNotePage.defaultProps = {
  showModal: '',
};

IntelNotePage.propTypes = {
  showModal: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    showModal: state.ui.getIn(['himalayan', 'showModal']),
  };
}


function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntelNotePage);
