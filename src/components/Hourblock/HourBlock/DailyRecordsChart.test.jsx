import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { DailyRecordsChart } from './DailyRecordsChart';

function setup() {
  const props = {
  };

  return shallow(<DailyRecordsChart {...props} />);
}

describe('DailyRecordsChart Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='dailyrecords-chart']")).toHaveLength(1);
    });
  });
});
