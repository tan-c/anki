import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { Footer } from './Footer';

function setup() {
  const props = {
    thisWeekTotal: 0,
    lastWeekTotal: 0,

    calorieWeeklyMaintain: 0,
    calorieWeeklyWeightLoss: 0,
    thisWeekTotalCalorie: 0,
  };

  return shallow(<Footer {...props} />);
}

describe('Footer Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("footer[data-role='footer']")).toHaveLength(1);
    });
  });
});
