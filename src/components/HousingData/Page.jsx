import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
// import { bindActionCreators } from 'redux';
// import { fromJS } from 'immutable';
import ReactTable from 'react-table';
import ListColumns from './ListColumns';

class HousingDataPage extends React.Component {
  render() {
    const { housingDatas } = this.props;

    // ['PRICE', 'GROSS', 'PLACE', 'LINE', 'BUILT_TIME', 'ROOM_SIZE', 'UNIT_NUMBER', 'LAND_SIZE', 'FLOOR', 'MATERIAL'].forEach((field) => {
    //   columns.push({
    //     Header: field,
    //     accessor: field,

    //   });
    // });

    // {
    //   id: 'friendName', // Required because our accessor is not a string
    //   Header: 'Friend Name',
    //   accessor: d => d.friend.name, // Custom value accessors!
    // }, {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age',
    // }
    // ];

    return (
      <Grid.Column style={{
        background: 'white',
        color: 'black',
        height: '100%',
      }}
      >
        {housingDatas.count() > 0 ? (
          <ReactTable
            data={housingDatas.valueSeq().toJS()}
            columns={ListColumns}
            defaultPageSize={30}
            filterable
            defaultSorted={[
              {
                id: 'itemType',
                desc: true
              },
              {
                id: 'price',
                desc: true
              }
            ]}
          />
        ) : (
          <span> Nothing yet...</span>
        )}
      </Grid.Column>
    );
  }
}

HousingDataPage.defaultProps = {
  housingDatas: []
};

HousingDataPage.propTypes = {
  housingDatas: PropTypes.any // Should be object, but default reduceCreate pass in Map() at the beginning
};

function mapStateToProps(state, ownProps) {
  return {
    housingDatas: state.housingDatas
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousingDataPage);
