import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { DailyCalorieDetails } from './CalorieDetails';

function setup() {
  const props = {
    DailyRecordActions: {},
  };

  return shallow(<DailyCalorieDetails {...props} />);
}

describe('DailyCalorieDetails Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='']")).toHaveLength(1);
    });
  });
});
