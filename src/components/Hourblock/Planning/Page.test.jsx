import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { PlanningPage } from './Page';

function setup() {
  const props = {
    plannedPomos: Map(),
    selectedProjectId: '',
    updatingRecurTask: false,

    UiActions: {},
    PlannedPomoActions: {},
  };

  return shallow(<PlanningPage {...props} />);
}

describe('PlanningPage Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='planning-page']")).toHaveLength(1);
    });
  });
});
