import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, List } from 'immutable';

import { AnkiActions } from 'utility-redux/anki';
import { AnkiTagActions } from 'utility-redux/ankiTag';
// import { UiActions } from 'utility-redux/ui';

export class AnkiTagsPage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     notebookGroupIdFilter: '',
  //     tagFilter: '',
  //   };
  // }

  componentWillReceiveProps = (nextProps) => {
    // if (nextProps.ankis.length) {
    //   const { notebookGroupIdFilter, tagFilter } = this.state;
    //
    //   let filteredAnkis = nextProps.ankis;
    //   if (notebookGroupIdFilter !== '') {
    //     filteredAnkis = filteredAnkis.filter(a =>
    //       a.note.notebook.notebookGroup._id === notebookGroupIdFilter);
    //   }
    //
    //   if (tagFilter !== '') {
    //     filtered Ankis = filteredAnkis.filter((a) => {
    //       let res = false;
    //       a.tags.forEach((tag) => {
    //         if (tag._id === tagFilter) {
    //           res = true;
    //         }
    //       });
    //       return res;
    //     });
    //   }
    //   filteredAnkis.sort((a, b) => (a._id >= b._id ? 1 : -1));
    //
    //   this.setState({
    //     filteredAnkis,
    //   });
    // }
  };

  createAnkiTagKeydown = (event) => {
    if (event.which === 13) {
      this.props.AnkiTagActions.create({
        name: event.target.value
      });
    }
  };

  filterAnki = (event, field) => {
    const val = event.target.value;
    const { ankis } = this.props;
    let filteredAnkis = [];
    if (val.length) {
      filteredAnkis = ankis.filter((a) => {
        let res = false;
        if (field === 'notebookGroups') {
          // this.setState({
          //   notebookGroupIdFilter: val,
          // });
          return a.note.notebook.notebookGroup._id === val;
        }

        if (field === 'tag') {
          // this.setState({
          //   tagFilter: val,
          // });
          a.tags.forEach((tag) => {
            if (tag._id === val) {
              res = true;
            }
          });
        }

        return res;
      });
    } else {
      filteredAnkis = ankis;
    }
  };

  addTagToAnki = (anki) => {
    const { selectedAnkiTagId } = this.props;

    if (
      anki.has('tags')
      && anki.get('tags').find(a => a.get('_id') === selectedAnkiTagId)
        === undefined
    ) {
      this.props.AnkiActions.update(
        anki.update('tags', tags => tags.push(selectedAnkiTagId))
      );
    }
  };

  render() {
    const {
      ankis, ankiTags, notebookGroups, selectedAnkiTagId
    } = this.props;

    return (
      <div className="flex-horizontal-center ">
        <div className="flex-1 border-right-black">
          <span>Tags</span>
          <hr />
          {ankiTags.valueSeq().map(tag => (
            <span
              className="label bg-bright-green flex-container-row"
              key={tag.get('_id')}
            >
              {tag.get('name')}
            </span>
          ))}
          <hr />
          <input
            type="text"
            className="border-green margin-top-10"
            onKeyDown={this.createAnkiTagKeydown}
            placeholder="new anki"
          />
        </div>

        <div className="flex-6" style={{ overflow: 'auto' }}>
          <div className="flex-horizontal-center border-bottom-black-30 height-30">
            <div className="flex-1">
              <select
                onChange={event => this.filterAnki(event, 'notebookGroups')}
                className="form-control"
              >
                <option key="" value="">
                  Select Notebook
                </option>
                {notebookGroups.valueSeq().map(nbg => (
                  <option key={nbg.get('_id')} value={nbg.get('_id')}>
                    {nbg.get('title')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1" />
            <div className="flex-6" />
          </div>

          {ankis.valueSeq().map(anki => (
            <div
              key={anki.get('_id')}
              className="flex-container-row border-bottom-black"
            >
              <span className="flex-1 border-right-black-20">
                {anki.getIn(['note', 'notebook', 'title'])}
              </span>
              <span className="flex-1 border-right-black-20">
                {anki.get('type')}
              </span>
              <span className="flex-1 border-right-black-20">
                {anki.get('createdAt')}
              </span>
              <span className="flex-1 border-right-black-20">
                {anki.get('question')}
              </span>
              <span className="flex-1 border-right-black-20">
                {anki.has('tags')
                  && anki.get('tags').map(tag => (
                    <span
                      key={tag.get('_id')}
                      className="bg-green color-white margin-right-5 padding-vertical-5"
                    >
                      {tag.get('name')}
                    </span>
                  ))}
              </span>
              <span className="flex-1">
                {selectedAnkiTagId.length > 0 && (
                  <button
                    className="bg-green margin-right-10"
                    onClick={(_) => {
                      this.addTagToAnki(anki);
                    }}
                  >
                    Add Tag
                  </button>
                )}

                <button
                  className="bg-red"
                  onClick={(_) => {
                    this.props.AnkiActions.update(anki.set('tags', List()));
                  }}
                >
                  Clear Tag
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AnkiTagsPage.defaultProps = {
  ankis: Map(),
  ankiTags: Map()
};

AnkiTagsPage.propTypes = {
  ankis: PropTypes.object,
  ankiTags: PropTypes.object,
  notebookGroups: PropTypes.object.isRequired,
  selectedAnkiTagId: PropTypes.string.isRequired,

  AnkiActions: PropTypes.object.isRequired,
  AnkiTagActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    ankis: state.ankis,
    ankiTags: state.ankiTags,
    notebookGroups: state.notebookGroups,
    selectedAnkiTagId: state.ui.getIn(['selectedAnkiTagId'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AnkiActions: bindActionCreators(AnkiActions, dispatch),
    AnkiTagActions: bindActionCreators(AnkiTagActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnkiTagsPage);
