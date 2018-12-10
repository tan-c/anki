import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, List, fromJS } from 'immutable';

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
import { loadavg } from 'os';

export class AnkiTagsPage extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     notebookGroupIdFilter: '',
  //     tagFilter: '',
  //   };
  // }
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
          if (a.tag._id === val) {
            res = true;
          }
        }

        return res;
      });
    } else {
      filteredAnkis = ankis;
    }
  };

  render() {
    const {
      ankis,
      ankiTags,
      notebookGroups,
      selectedAnkiTagId
    } = this.props;

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
              },
              {
                Header: 'Tags',
                accessor: 'tag.name',
                width: 160,
                // sortMethod: numericSortSmallerFirst,
              },
              {
                Header: 'Add Tag',
                accessor: 'add Tags',
                width: 200,
                // sortMethod: numericSortSmallerFirst,
                Cell: row => (
                  <div>
                    <button
                      className="bg-green margin-right-10"
                      disabled={!selectedAnkiTagId.length}
                      onClick={(_) => {
                        const newAnki = fromJS(row.original).set('tag', selectedAnkiTagId);

                        console.log('🔥🔥🔥🔥🔥 newAnki.toJS() 🔥🔥🔥🔥🔥');
                        console.log(newAnki.toJS());
                        this.props.AnkiActions.update(
                          newAnki
                        );
                      }}
                    >
                      Add Tag
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
  selectedAnkiTagId: PropTypes.string.isRequired,

  AnkiActions: PropTypes.object.isRequired,
  AnkiTagActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    ankis: state.ankis,
    ankiTags: state.ankiTags,
    notebookGroups: state.notebookGroups,
    selectedAnkiTagId: state.ui.get('selectedAnkiTagId')
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
