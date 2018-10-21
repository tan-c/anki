import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NoteList } from './List';

function setup() {
  const props = {
    notes: Map(),
  };

  return shallow(<NoteList {...props} />);
}

describe('NoteList Unit Tests', () => {
  describe('when in a normal note', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='note-list']")).toHaveLength(0);
    });
  });
});
