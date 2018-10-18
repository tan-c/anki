import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import keydown from 'react-keydown';
import { Map } from 'immutable';

import { UiActions } from 'utility-redux/common/ui';
import { UserActions, currentUserSelector } from 'utility-redux/common/user';

export class ModalFile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // selectedSearchResultIndex: 0,
      searchContent: '',
    };
  }

  componentDidMount() {
    if (this.searchContentInput !== undefined) { // For Test
      this.searchContentInput.focus();
    }
  }

  // @keydown('up', 'down') // up is 38 down is 40
  // nagivateSearchResult(event) {
  //   const { notes } = this.props;
  //   const { searchContent } = this.state;
  //
  //   const len = notes.valueSeq().filter(note => this.isSearchResult(note, searchContent)).count();
  //   const change = event.which - 39;
  //   let { selectedSearchResultIndex } = this.state;
  //   if (len > 0) {
  //     selectedSearchResultIndex = (selectedSearchResultIndex + change + len) % len;
  //     this.setState({
  //       selectedSearchResultIndex,
  //     });
  //   }
  // }
  //
  // @keydown('enter') // up is 38 down is 40
  // enterSearchResult(event) {
  //   const { notes } = this.props;
  //   const { selectedSearchResultIndex, searchContent } = this.state;
  //   const searchResults = notes.valueSeq().filter(note => this.isSearchResult(note, searchContent));
  //   if (searchContent.length && searchResults.count()) {
  //     this.selectNote(searchResults.get(selectedSearchResultIndex.toString()));
  //   }
  // }

  searchInputKeydown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.nagivateSearchResult(event);
    }

    if (event.key === 'Enter') {
      this.enterSearchResult(event);
    }
  }

  selectFile = (note) => {
    // const noteId = note.get('_id');
    // const notebookId = note.getIn(['notebook', '_id']);
    // this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
    //
    // const { currentUser } = this.props;
    // this.props.UiActions.updateIn(['himalayan', 'activeNoteId'], noteId);
    // this.props.UiActions.updateIn(['himalayan', 'activeNotebookId'], notebookId);
    // this.props.UserActions.update(currentUser.setIn(['config', 'hima', 'recentNote'], noteId));
  }

  updateSearch = (event) => {
    const searchContent = event.target.value.toLowerCase();
    this.setState({
      searchContent,
    });
  }

  isSearchResult = (note, content) => {
    const contents = content.split(' ');
    let isResult = false;
    contents.forEach((c) => {
      if (note.get('title').toLowerCase().indexOf(c) > -1) {
        isResult = true;
      }
      if (note.getIn(['notebook', 'title']).toLowerCase().indexOf(c) > -1) {
        isResult = true;
      }
      if (note.get('subtitles').toString().toLowerCase().indexOf(c) > -1) {
        isResult = true;
      }
    });
    return isResult;
  }

  // .filter(note => this.isSearchResult(note, searchContent))

  render() {
    const {
      searchContent,
    } = this.state;
    const { files } = this.props;

    return (
      <div id="modal" data-role="modal-search">
        <div id="canvas" />

        <div id="search-box">
          <input
            id="search-content"
            type="text"
            ref={(ref) => { this.searchContentInput = ref; }}
            className="color-black"
            value={searchContent}
            onChange={this.updateSearch}
            onKeyDown={this.searchInputKeydown}
          />

          <div id="search-results">
            { files.size === 0 && <div>Loading files ...</div> }
            { files.size > 0 && files.valueSeq().map((file, index) => (
              <div
                key={file.get('id')}
                role="button"
                tabIndex="-1"
                className="search-results-record border-bottom-black-70 margin-0 flex-container-row typical-setup"
                onClick={() => this.selectFile(file)}
              >
                <span className="padding-horizontal-5 flex-1 border-right-black-20 bg-grey">
                  {file.getIn(['.tag'])}
                </span>

                <span className={`padding-horizontal-5 flex-2 border-right-black-20 ${file.get('name').indexOf(searchContent) > -1 ? 'color-orange font-600' : ''}`}>
                  {file.get('name')}
                </span>

                <span className={`padding-horizontal-5 flex-2 border-right-black-20 ${file.getIn(['path_display']).indexOf(searchContent) > -1 ? 'color-orange font-600' : ''}`}>
                  {file.getIn(['path_display'])}
                </span>
              </div>))
            }
          </div>
        </div>
      </div>
    );
  }
}

ModalFile.defaultProps = {
  files: Map(),
  // currentUser: Map(),
};

ModalFile.propTypes = {
  files: PropTypes.object,
  // currentUser: PropTypes.object,

  // UserActions: PropTypes.object.isRequired,
  // UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    files: state.files,
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFile);
