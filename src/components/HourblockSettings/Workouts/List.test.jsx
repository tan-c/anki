import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { WorkoutList } from './List';

function setup() {
  const props = {
    UiActions: {},
    WorkoutActions: {},
  };

  return shallow(<WorkoutList {...props} />);
}

describe('WorkoutList Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='workout-list']")).toHaveLength(1);
    });
  });
});
