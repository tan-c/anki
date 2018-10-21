import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';
import moment from 'moment-timezone';

import { RightAside } from './index';

function setup() {
  const props = {
  };

  return shallow(<RightAside {...props} />);
}

describe('RightAside Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    wrapper.setState({ todayMoment: moment.tz('2017-01-01', 'Asia/Tokyo') });

    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("aside[data-role='right-aside']")).toHaveLength(1);
    });
  });
});
