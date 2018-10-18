import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { MonthlyTasksRow } from './Row';

function setup() {
  const props = {
    task: Map(),

    TaskActions: {},
  };

  return shallow(<MonthlyTasksRow {...props} />);
}

describe('MonthlyTasksRow Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='monthlytasks-row']")).toHaveLength(1);
    });
  });
});
