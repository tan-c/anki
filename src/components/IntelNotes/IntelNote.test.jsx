import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { MainIntelNote } from './IntelNote';

function setup() {
  const props = {
  };

  return shallow(<MainIntelNote {...props} />);
}

describe('MainIntelNote Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("main[data-role='main-intelnote']")).toHaveLength(1);
    });
  });
});
