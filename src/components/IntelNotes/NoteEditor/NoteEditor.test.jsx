import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { NoteEditor } from './NoteEditor';

function setup() {
  const props = {
    NoteActions: {},
    FileActions: {},
  };

  return shallow(<NoteEditor {...props} />);
}

describe('NoteEditor Unit Tests', () => {
  describe('', () => {
    // const wrapper = setup();
    // it('renders correctly', () => {
    //   const jsonOutput = toJson(wrapper);
    //   // expect(jsonOutput).toMatchSnapshot();
    //   expect(wrapper.find("div[data-role='note-editor']")).toHaveLength(0);
    // });
  });
});
