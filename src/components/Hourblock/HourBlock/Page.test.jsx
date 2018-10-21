import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';
import moment from 'moment-timezone';

import { HourBlockPage } from './Page';

function setup() {
  const props = {
  };

  return shallow(<HourBlockPage {...props} />);
}

describe('HourBlockPage Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    wrapper.setState({ dayMomentObject: moment.tz('2017-01-01', 'Asia/Tokyo') });
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='hourblock-page']")).toHaveLength(1);
    });
  });
});
