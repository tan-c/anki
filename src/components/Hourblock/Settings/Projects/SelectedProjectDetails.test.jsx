import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { SelectedProjectDetails } from './SelectedProjectDetails';

function setup() {
  const props = {
    ProjectActions: {},
  };

  return shallow(<SelectedProjectDetails {...props} />);
}

describe('SelectedProjectDetails Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='']")).toHaveLength(1);
    });
  });
});
