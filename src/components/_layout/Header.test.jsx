import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import moment from 'moment';

// import { Map } from 'immutable';

import { Header } from './Header';

function setup() {
  const props = {
    updateWeather: () => { },

    UiActions: {}
  };

  return shallow(<Header {...props} />);
}

describe('Header Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    wrapper.setState({ currentTime: moment('2017-01-01') });
    it('renders correctly', () => {
      // const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("Menu[data-role='header']")).toHaveLength(0);
    });
  });
});
