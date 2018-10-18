import React from 'react';
import PropTypes from 'prop-types';

const isValidField = field => field !== null && field !== undefined; // Default all invalid data will be null, but predictedPrice might be undefined (no data)
const numericSortSmallerFirst = (a, b) => a - b;
const ListColumns = [
  {
    Header: 'delta %',
    id: 'diffPerc', // Needed as using customized accessor
    accessor: (colData) => {
      if (
        !isValidField(colData.PredictedPrice)
        || !isValidField(colData.Price)
      ) {
        return null;
      }

      // if (colData.Price < 100) return null; // Some Data are Corrupted
      const { Price, PredictedPrice } = colData;
      const diffPerc = (PredictedPrice - Price) / Price;
      return (diffPerc * 100).toFixed(2);
    },
    getProps: (state, rowInfo, column) => {
      if (rowInfo === undefined || !isValidField(rowInfo.row.diffPerc)) {
        return {};
      }

      const alphaValue = 0.5 + Math.abs(rowInfo.row.diffPerc) / 2 / 100; // Base as 0.5
      return {
        style: {
          color: 'white',
          background:
            rowInfo.row.diffPerc > 0
              ? `rgba(46, 204, 113, ${alphaValue})`
              : `rgba(231, 76, 60, ${alphaValue})`
        }
      };
    },
    width: 120,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Predicted (万円)',
    accessor: 'PredictedPrice',
    width: 120,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Price (万円)',
    accessor: 'Price',
    width: 100,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Gross (%)',
    accessor: 'Gross',
    width: 80,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Place',
    accessor: 'Place',
    minWidth: 300,
    sortable: false
  },
  {
    Header: 'Line',
    accessor: 'Line',
    minWidth: 300,
    sortable: false
  },
  {
    Header: 'Built',
    accessor: 'BuiltTime',
    width: 100
  },
  {
    Header: 'Room Size(㎡)',
    accessor: 'RoomSize',
    width: 80,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Units(戸)',
    accessor: 'UnitNumber',
    width: 80,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Floor',
    accessor: 'Floor',
    width: 80,
    sortable: false
  },
  {
    Header: 'Material',
    accessor: 'Material',
    width: 80
  },
  {
    Header: 'Type',
    accessor: 'Type',
    width: 120
  },
  {
    Header: 'Link',
    accessor: 'Link',
    Cell: props => (
      <a href={props.value} className="">
        LINK
      </a>
    ),
    width: 80
  }
];

ListColumns.propTypes = {
  value: PropTypes.string
};

export default ListColumns;
