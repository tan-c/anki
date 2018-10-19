import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { ProjectSelect } from './HourblockProjectSelect';

function setup() {
  const props = {
  };

  return shallow(<ProjectSelect {...props} />);
}

describe('ProjectSelect Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find('select')).toHaveLength(1);
    });
  });
});
