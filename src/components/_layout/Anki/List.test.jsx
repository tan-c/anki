import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { AnkiList } from './List';

function setup() {
  const props = {
    activeAnki: Map(),
    activeNote: Map(),
    ankis: Map(),
    filteredAnkis: Map(),

    AnkiActions: {},
    UiActions: {
      updateIn: () => {},
    },
  };

  return shallow(<AnkiList {...props} />);
}

describe('AnkiList Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='anki-list']")).toHaveLength(1);
    });
  });
});
