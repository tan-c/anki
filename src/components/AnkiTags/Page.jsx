import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, List } from 'immutable';

import { AnkiActions } from 'utility-redux/anki';
import { AnkiTagActions } from 'utility-redux/ankiTag';
// import { UiActions } from 'utility-redux/ui';
import ReactTable from 'react-table';

import {
  Form, TextArea, Grid, Segment,
  Menu,
  Icon,
  Header
} from 'semantic-ui-react';

export class AnkiTagsPage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     notebookGroupIdFilter: '',
  //     tagFilter: '',
  //   };
  // }

  state = {
    selectedAnkiTagId: '',
  }

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
    const { selectedAnkiTagId } = this.state;

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
      ankis, ankiTags, notebookGroups
    } = this.props;

    const { selectedAnkiTagId } = this.state;

    return (
      <Grid.Row>
        <Grid.Column width={2}>
          <Header as="h3" inverted>
            Tags
          </Header>

          <Menu.Menu>
            {ankiTags.valueSeq().map(tag => (
              <Menu.Item
                key={tag.get('_id')}
              >
                {tag.get('name')}
                <Icon
                  name="close"
                  onClick={(_) => {
                    this.props.AnkiTagActions.deleteRecord(tag);
                  }}
                />
              </Menu.Item>
            ))}
          </Menu.Menu>
          <input
            type="text"
            className="border-green margin-top-10"
            onKeyDown={this.createAnkiTagKeydown}
            placeholder="new anki"
          />
        </Grid.Column>

        <Grid.Column width={12}>
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

          <ReactTable
            data={ankis.valueSeq().toJS()}
            style={{
              height: 'calc(100vh - 150px)',
              overflow: 'auto',
              background: 'white',
              color: 'black'
            }}
            columns={[
              {
                Header: 'Type',
                accessor: 'type',
                width: 80
              },
              {
                Header: 'Created',
                accessor: 'createdAt',
                width: 150
              },
              {
                Header: 'Question',
                accessor: 'question',
                width: 120
              }, {
                Header: 'Tags',
                accessor: 'tags',
                width: 80,
                // sortMethod: numericSortSmallerFirst,
                Cell: row => (
                  <div>
                    {row.tags && row.tags.map(tag => (
                      <span
                        key={tag.get('_id')}
                        className="bg-green color-white margin-right-5 padding-vertical-5"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )
              },
              {
                Header: 'Add Tag',
                accessor: 'add Tags',
                width: 80,
                // sortMethod: numericSortSmallerFirst,
                Cell: row => (
                  <div>
                    {selectedAnkiTagId.length > 0 && (
                      <button
                        className="bg-green margin-right-10"
                      // FIXME: actions not right
                      // onClick={(_) => {
                      //   this.addTagToAnki(row);
                      // }}
                      >
                        Add Tag
                      </button>
                    )}

                    <button
                      className="bg-red"
                    // FIXME: actions not right
                    // onClick={(_) => {
                    //   this.props.AnkiActions.update(row.set('tags', List()));
                    // }}
                    >
                      Clear Tag
                    </button>
                  </div>
                ),
              } // {
              //   Header: 'Answer',
              //   accessor: 'answer',
              //   width: 120
              // }
            ]}

            // defaultPageSize={30}
            filterable
            defaultSorted={[
              // {
              //   id: 'itemType',
              //   desc: true
              // },
              // {
              //   id: 'price',
              //   desc: true
              // }
            ]}
          />

          {/* {ankis.valueSeq().map(anki => (
            <div
              key={anki.get('_id')}
              className="flex-container-row border-bottom-black"
            >
              <span className="flex-1 border-right-black-20">

              </span>
              <span className="flex-1">

              </span>
            </div>
          ))} */}
        </Grid.Column>
      </Grid.Row>
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
  // selectedAnkiTagId: PropTypes.string.isRequired,

  AnkiActions: PropTypes.object.isRequired,
  AnkiTagActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    ankis: state.ankis,
    ankiTags: state.ankiTags,
    notebookGroups: state.notebookGroups,
    // selectedAnkiTagId: state.ui.getIn(['selectedAnkiTagId'])
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
