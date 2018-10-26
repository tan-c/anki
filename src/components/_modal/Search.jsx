import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import keydown from 'react-keydown';
import { Map } from 'immutable';

import { UiActions } from 'utility-redux/ui';
import { UserActions, currentUserSelector } from 'utility-redux/user';

import {
  Button, Header, Image, Modal
} from 'semantic-ui-react';

export class ModalSearch extends React.Component {
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

  selectNote = (note) => {
    const noteId = note.get('_id');
    const notebookId = note.getIn(['notebook', '_id']);

    const { currentUser } = this.props;
    this.props.UiActions.updateIn(['himalayan', 'showModal'], '');
    this.props.UserActions.update(currentUser.setIn(['config', 'hima', 'recentNote'], noteId));
    this.props.UserActions.update(currentUser.setIn(['config', 'hima', 'recentNotebook'], notebookId));
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
      if (note.hasIn(['notebook', 'title']) && note.getIn(['notebook', 'title']).toLowerCase().indexOf(c) > -1) {
        isResult = true;
      }

      if (note.get('subtitles').toString().toLowerCase().indexOf(c) > -1) {
        isResult = true;
      }
    });
    return isResult;
  }

  render() {
    const {
      searchContent,
    } = this.state;
    const { notes } = this.props;

    return (
      <React.Fragment>
        <Modal.Header>
          <input
            id="search-content"
            type="text"
            ref={(ref) => { this.searchContentInput = ref; }}
            className="color-black"
            value={searchContent}
            onChange={this.updateSearch}
            onKeyDown={this.searchInputKeydown}
          />
        </Modal.Header>
        <Modal.Content style={{
          maxHeight: 300,
          overflow: 'auto'
        }}
        >
          <Modal.Description
            style={{
              color: 'black'
            }}
          >
            {/* <Header>Default Profile Image</Header> */}
            {notes.size === 0 && <div>Loading Notes ...</div>}

            {notes.size > 0 && searchContent.length > 0 && notes.valueSeq().filter(note => this.isSearchResult(note, searchContent)).map((note, index) => (
              <div
                key={note.get('_id')}
                role="button"
                tabIndex="-1"
                className="search-results-record border-bottom-black-70 margin-0 flex-container-row typical-setup"
                onClick={() => this.selectNote(note)}
              >
                <span className="padding-horizontal-5 flex-1 border-right-black-20 bg-grey">{note.getIn(['notebook', 'notebookGroup', 'title'])}</span>
                <span className={`padding-horizontal-5 flex-2 border-right-black-20 ${note.get('title').toLowerCase().indexOf(searchContent) > -1 ? 'color-orange font-600' : ''}`}>{note.get('title')}</span>
                <span
                  className={`padding-horizontal-5 flex-2 border-right-black-20 ${note.getIn(['notebook', 'title']).toLowerCase().indexOf(searchContent) > -1 ? 'color-orange font-600' : ''}`}
                >
                  {note.getIn(['notebook', 'title'])}
                </span>
                <span
                  className={`padding-horizontal-5 flex-5 ${note.get('subtitles').toString().toLowerCase().indexOf(searchContent) > -1 ? 'color-orange font-600' : ''}`}
                >
                  {note.get('subtitles').map(subtitle => (
                    <span key={subtitle}>
                      {subtitle}
                      ,
                      {' '}
                    </span>
                  ))}
                </span>
              </div>))
            }
          </Modal.Description>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

ModalSearch.defaultProps = {
  notes: Map(),
  currentUser: Map(),
};

ModalSearch.propTypes = {
  notes: PropTypes.object,
  currentUser: PropTypes.object,

  UserActions: PropTypes.object.isRequired,
  UiActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    currentUser: currentUserSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UiActions: bindActionCreators(UiActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearch);
