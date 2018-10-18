import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { MenuList } from './MenuList';

function setup() {
  const props = {
    location: {},
  };

  return shallow(<MenuList {...props} />);
}

describe('MenuList Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("nav[data-role='menu-list']")).toHaveLength(1);
    });
  });
});
