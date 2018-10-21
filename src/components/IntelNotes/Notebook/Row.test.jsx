import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NotebookRow } from './Row';

function setup() {
  const props = {
    notebookGroups: Map(),
    NotebookGroupActions: {},
  };

  return shallow(<NotebookRow {...props} />);
}

describe('NotebookRow Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='notebook-row']")).toHaveLength(1);
    });
  });
});
