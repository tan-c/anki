import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';

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
    width: 80,
    sortMethod: numericSortSmallerFirst
  },
  {
    Header: 'Predicted (万円)',
    accessor: 'PredictedPrice',
    width: 80,
    sortMethod: numericSortSmallerFirst
  },
  {
    id: 'price',
    Header: 'Price (万円)',
    accessor: 'Price',
    width: 160,
    // sortMethod: numericSortSmallerFirst,
    Cell: row => (
      <div>
        {row.original.priceRecords.map(rec => (
          <Popup
            key={rec.link}
            trigger={(
              <a href={rec.link} className="">
                {`${rec.price}, `}
              </a>
            )}
            content={moment(rec.insertAt).format('YYYY-MM-DD hh:mm:ss')}
          />

        ))}
      </div>),
  },
  // {
  //   Header: 'Gross (%)',
  //   accessor: 'Gross',
  //   width: 40,
  //   sortMethod: numericSortSmallerFirst
  // },
  {
    id: 'itemType',
    Header: 'Type',
    accessor: 'itemType',
    width: 100
  },
  {
    Header: 'Location',
    accessor: 'location',
    minWidth: 120,
    sortable: false
  },
  {
    id: 'lineInfo',
    Header: 'Line',
    accessor: 'metroLine', // Can be anything
    Cell: row => (
      <div>
        {`${row.original.metroLine}-${row.original.station}-${row.original.stationDistance}`}
      </div>
    ),
    minWidth: 100,
    sortable: false
  },
  {
    Header: 'Built',
    accessor: 'builtYear',
    width: 100
  },
  {
    Header: 'House Size(㎡)',
    accessor: 'houseSize',
    width: 80,
    sortMethod: numericSortSmallerFirst,
    Cell: row => (
      <div>
        {`${row.value === undefined ? '' : row.value.toFixed(2)}`}
      </div>
    ),
  },
  {
    Header: 'Land Size(㎡)',
    accessor: 'landSize',
    width: 80,
    sortMethod: numericSortSmallerFirst,
    Cell: row => (
      <div>
        {`${row.value === undefined ? '' : row.value.toFixed(2)}`}
      </div>
    ),
  },
  // {
  //   Header: 'Units(戸)',
  //   accessor: 'UnitNumber',
  //   width: 80,
  //   sortMethod: numericSortSmallerFirst
  // },
  // {
  //   Header: 'Floor',
  //   accessor: 'Floor',
  //   width: 80,
  //   sortable: false
  // },
  {
    Header: 'Material',
    accessor: 'Material',
    width: 80
  }
];

ListColumns.propTypes = {
  value: PropTypes.string
};

export default ListColumns;
