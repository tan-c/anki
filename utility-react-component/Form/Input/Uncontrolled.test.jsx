import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { InputUncontrolled } from './Uncontrolled';

function setup() {
  const props = {
  };

  return shallow(<InputUncontrolled {...props} />);
}

describe('InputUncontrolled Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find('input')).toHaveLength(1);
    });
  });
});
