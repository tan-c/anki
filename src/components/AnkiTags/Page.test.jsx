import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { AnkiTagsPage } from './Page';

function setup() {
  const props = {
    notebookGroups: Map(),
    selectedAnkiTagId: '',

    AnkiActions: {},
    AnkiTagActions: {},
  };

  return shallow(<AnkiTagsPage {...props} />);
}

describe('AnkiTagsPage Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='']")).toHaveLength(1);
    });
  });
});
