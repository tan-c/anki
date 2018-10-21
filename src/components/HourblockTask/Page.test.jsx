import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { TasksPage } from './Page';

function setup() {
  const props = {
    TaskActions: {},
    UiActions: {},
  };

  return shallow(<TasksPage {...props} />);
}

describe('TasksPage Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='task-page']")).toHaveLength(1);
    });
  });
});
