import React from 'react';
import { shallow } from 'enzyme';
// import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';
import moment from 'moment';

import { DailyWorkoutRecordsDetails } from './Page';

function setup() {
  const props = {
    dayMomentObject: moment(),
    WorkoutRecordActions: {},
  };

  return shallow(<DailyWorkoutRecordsDetails {...props} />);
}

describe('DailyWorkoutRecordsDetails Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='']")).toHaveLength(1);
    });
  });
});