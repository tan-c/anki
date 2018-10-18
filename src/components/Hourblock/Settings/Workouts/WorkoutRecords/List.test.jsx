import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { WorkoutRecordsList } from './List';

function setup() {
  const props = {
    WorkoutRecordActions: {},
  };

  return shallow(<WorkoutRecordsList {...props} />);
}

describe('WorkoutRecordsList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='workoutrecords-list']")).toHaveLength(1);
    });
  });
});
