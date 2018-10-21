import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { PlanningItem } from './Item';

function setup() {
  const props = {
    plannedPomo: Map(),
    // selectedProjectId: '',
    // updatingRecurTask: false,
    //
    // PlannedPomoActions: {},
  };

  return shallow(<PlanningItem {...props} />);
}

describe('PlanningItem Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='planning-item']")).toHaveLength(1);
    });
  });
});
