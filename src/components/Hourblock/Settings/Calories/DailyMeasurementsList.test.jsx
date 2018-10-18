import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';
import moment from 'moment-timezone';

import { DailyMeasurementsList } from './DailyMeasurementsList';

function setup() {
  const props = {
    dailyMeasurements: Map(),
    todayDate: moment.tz('2017-01-01', 'Asia/Tokyo'),

    DailyMeasurementActions: {},
  };

  return shallow(<DailyMeasurementsList {...props} />);
}

describe('DailyMeasurementsList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='dailymeasurements-list']")).toHaveLength(1);
    });
  });
});
