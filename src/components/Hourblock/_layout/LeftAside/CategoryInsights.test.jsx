import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { CategoryInsights } from './CategoryInsights';

function setup() {
  const props = {
  };

  return shallow(<CategoryInsights {...props} />);
}

describe('CategoryInsights Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='category-insights']")).toHaveLength(1);
    });
  });
});