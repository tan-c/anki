import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { EventRecordsList } from './List';

function setup() {
  const props = {
    EventRecordActions: {},
  };

  return shallow(<EventRecordsList {...props} />);
}

describe('EventRecordsList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='eventrecords-list']")).toHaveLength(1);
    });
  });
});
