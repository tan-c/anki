import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { MainHourBlock } from './Main';

function setup() {
  const props = {
  };

  return shallow(<MainHourBlock {...props} />);
}

describe('MainHourBlock Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("main[data-role='main-hourblock']")).toHaveLength(1);
    });
  });
});
