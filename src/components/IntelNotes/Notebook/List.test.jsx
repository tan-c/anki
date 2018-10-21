import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NotebookList } from './List';

function setup() {
  const props = {
    notebookGroupNotebooks: Map(),
  };

  return shallow(<NotebookList {...props} />);
}

describe('NotebookList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='notebook-list']")).toHaveLength(1);
    });
  });
});
