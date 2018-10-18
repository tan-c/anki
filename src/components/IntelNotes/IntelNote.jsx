
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IntelNotePage } from './Page';

import SearchModal from '../_layout/Modal/Search';
import FileModal from '../_layout/Modal/File';

import './intelnote.scss';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match

export class MainIntelNote extends React.Component {
  render() {
    const {
      showModal,
    } = this.props;

    return (
      <main id="intelnote" data-role="main-intelnote">
        {showModal === 'search' && <SearchModal />}
        {showModal === 'file' && <FileModal />}

        <IntelNotePage />
      </main>
    );
  }
}

MainIntelNote.defaultProps = {
  showModal: '',
};

MainIntelNote.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainIntelNote);
