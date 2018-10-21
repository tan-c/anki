import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { EventDetails } from './Details';

function setup() {
  const props = {
    EventRecordActions: {},
    UiActions: {},
  };

  return shallow(<EventDetails {...props} />);
}

describe('EventDetails Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='']")).toHaveLength(1);
    });
  });
});
