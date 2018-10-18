import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import moment from 'moment';
// import { Map } from 'immutable';

import { DailyMeasurements } from './Measurements';

function setup() {
  const props = {
    dayMomentObject: moment(),

    DailyMeasurementActions: {},
  };

  return shallow(<DailyMeasurements {...props} />);
}

describe('DailyMeasurements Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='daily-measurements']")).toHaveLength(1);
    });
  });
});
