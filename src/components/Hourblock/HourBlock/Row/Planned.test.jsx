import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { HourBlockRowPlanned } from './Planned';

function setup() {
  const props = {
    allProjectTasksOrdered: Map(),
  };

  return shallow(<HourBlockRowPlanned {...props} />);
}

describe('HourBlockRowPlanned Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='hourblock-row-planned']")).toHaveLength(1);
    });
  });
});
