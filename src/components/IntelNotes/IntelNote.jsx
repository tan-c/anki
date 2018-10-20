
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { IntelNotePage } from './Page';

import SearchModal from '../_layout/Modal/Search';
import FileModal from '../_layout/Modal/File';

export class MainIntelNote extends React.Component {
  render() {
    const {
      showModal,
    } = this.props;

    return (
      <main id="intelnote">
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
