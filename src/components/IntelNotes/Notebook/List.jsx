import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// import { bindActionCreators } from 'redux';

import { notebookGroupNotebooksSortedSelector } from 'utility-redux/notebook';
import NotebookListRowConnected from './Row';

export class NotebookList extends React.Component {
  // constructor(props, context) {
  //  super(props, context);
  // }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //   });
  // }

  render() {
    const {
      notebookGroupNotebooks,
    } = this.props;

    return (
      <React.Fragment>
        {notebookGroupNotebooks.valueSeq().map(
          notebook => (
            <NotebookListRowConnected
              key={notebook.get('_id')}
              notebook={notebook}
            />
          )
        )
        }
      </React.Fragment>
    );
  }
}

NotebookList.defaultProps = {
  notebookGroupNotebooks: Map(),
};

NotebookList.propTypes = {
  notebookGroupNotebooks: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    notebookGroupNotebooks: notebookGroupNotebooksSortedSelector(state, ownProps.notebookGroupId),
  };
}

export default connect(mapStateToProps)(NotebookList);
