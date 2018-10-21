import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { DustbinRecord } from './DustbinRecord';

function setup() {
  const props = {
    notes: Map(),
    activeNotebookId: '',

    NoteActions: {},
    UiActions: {},
  };

  return shallow(<DustbinRecord {...props} />);
}

describe('DustbinRecord Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='dustbin-record']")).toHaveLength(1);
    });
  });
});
