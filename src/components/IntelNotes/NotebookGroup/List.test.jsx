import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NotebookGroupList } from './List';

function setup() {
  const props = {
    notebookGroups: Map(),

    NotebookGroupActions: {},
  };

  return shallow(<NotebookGroupList {...props} />);
}

describe('NotebookGroupList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='notebookgroup-list']")).toHaveLength(1);
    });
  });
});
