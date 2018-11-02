import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Tab,
  Label, Menu
} from 'semantic-ui-react';
// import { bindActionCreators } from 'redux';
// import { fromJS } from 'immutable';
import ReactTable from 'react-table';
import { housingDataByTypeIntoJSListSelector } from 'utility-redux/housingData';
import ListColumns from './ListColumns';


class HousingDataPage extends React.Component {
  getPaneData = data => (
    <ReactTable
      data={data}
      columns={ListColumns}
      style={{
        height: 'calc(100vh - 150px)',
        overflow: 'auto'
      }}
      // defaultPageSize={30}
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
  )


  render() {
    const {
      houseList,
      landList,
      mansionList
    } = this.props;

    const panes = [
      {
        menuItem: (
          <Menu.Item key="House">
            House
            <Label>
              {houseList.length}
            </Label>
          </Menu.Item>),
        render: () => (
          <Tab.Pane
            attached={false}
          >
            {this.getPaneData(houseList)}
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item key="Land">
            Land
            <Label>
              {landList.length}
            </Label>
          </Menu.Item>),
        render: () => (
          <Tab.Pane
            attached={false}
          >
            {this.getPaneData(landList)}
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item key="Mansion">
            Mansion
            <Label>
              {mansionList.length}
            </Label>
          </Menu.Item>),
        render: () => (
          <Tab.Pane
            attached={false}
          >
            {this.getPaneData(mansionList)}
          </Tab.Pane>
        )
      }
    ];


    return (
      <Grid.Column style={{
        background: 'white',
        color: 'black',
        height: '100%',
      }}
      >
        {houseList.length > 0 ? (
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        ) : (
          <span> Nothing yet...</span>
        )}
      </Grid.Column>
    );
  }
}

HousingDataPage.defaultProps = {
  houseList: [],
  landList: [],
  mansionList: []
};

HousingDataPage.propTypes = {
  houseList: PropTypes.array,
  landList: PropTypes.array,
  mansionList: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  return {
    houseList: housingDataByTypeIntoJSListSelector(state, 'house'),
    landList: housingDataByTypeIntoJSListSelector(state, 'land'),
    mansionList: housingDataByTypeIntoJSListSelector(state, 'mansion'),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousingDataPage);
