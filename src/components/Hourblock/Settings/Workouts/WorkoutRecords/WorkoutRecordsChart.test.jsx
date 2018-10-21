import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { WorkoutRecordsChart } from './WorkoutRecordsChart';

function setup() {
  const props = {
  };

  return shallow(<WorkoutRecordsChart {...props} />);
}

describe('WorkoutRecordsChart Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='workoutrecords-chart']")).toHaveLength(1);
    });
  });
});
