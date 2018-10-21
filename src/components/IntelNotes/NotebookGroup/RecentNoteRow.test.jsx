import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { RecentNoteRow } from './RecentNoteRow';

function setup() {
  const props = {
    recentNote: Map(),

    UiActions: {},
  };

  return shallow(<RecentNoteRow {...props} />);
}

describe('RecentNoteRow Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='recentnote-row']")).toHaveLength(1);
    });
  });
});
