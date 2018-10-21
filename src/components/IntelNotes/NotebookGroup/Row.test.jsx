import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NotebookGroupRow } from './Row';

function setup() {
  const props = {
    notebookGroup: Map(),

    NotebookActions: {},
    NotebookGroupActions: {},
  };

  return shallow(<NotebookGroupRow {...props} />);
}

describe('NotebookGroupRow Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='notebookgroup-row']")).toHaveLength(1);
    });
  });
});
