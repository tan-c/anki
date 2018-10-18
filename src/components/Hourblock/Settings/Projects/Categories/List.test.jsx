import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { CategoriesList } from './List';

function setup() {
  const props = {
    CategoryActions: {},
    ProjectActions: {},
    UiActions: {},
  };

  return shallow(<CategoriesList {...props} />);
}

describe('CategoriesList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='categories-list']")).toHaveLength(1);
    });
  });
});
