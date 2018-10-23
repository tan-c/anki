import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { MonthlyTasksList } from './List';

function setup() {
  const props = {
    TaskActions: {},
  };

  return shallow(<MonthlyTasksList {...props} />);
}

describe('MonthlyTasksList Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("section[data-role='monthlytasks-list']")).toHaveLength(0);
    });
  });
});
