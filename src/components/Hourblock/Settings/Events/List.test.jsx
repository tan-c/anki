import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { EventsList } from './List';

function setup() {
  const props = {
    EventActions: {},
    UiActions: {},
  };

  return shallow(<EventsList {...props} />);
}

describe('EventsList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='events-list']")).toHaveLength(1);
    });
  });
});
