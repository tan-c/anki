import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fromJS } from 'immutable';
import ReactTable from 'react-table';
import ListColumns from './ListColumns';

class HousingPricesPage extends React.Component {
  render() {
    const { housingPrices } = this.props;

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
      <React.Fragment>
        {housingPrices.count() > 0 ? (
          <ReactTable
            data={housingPrices.valueSeq().toJS()}
            columns={ListColumns}
            defaultPageSize={100}
            filterable
            defaultSorted={[
              {
                id: 'diffPerc',
                desc: true
              }
            ]}
          />
        ) : (
          <div> Nothing yet...</div>
        )}
      </React.Fragment>
    );
  }
}

HousingPricesPage.defaultProps = {
  housingPrices: []
};

HousingPricesPage.propTypes = {
  housingPrices: PropTypes.any // Should be object, but default reduceCreate pass in Map() at the beginning
};

function mapStateToProps(state, ownProps) {
  return {
    housingPrices: state.housingPrices
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousingPricesPage);
