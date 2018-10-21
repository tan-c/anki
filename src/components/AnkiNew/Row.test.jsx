import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { AnkiRow } from './Row';

function setup() {
  const props = {
    AnkiActions: {},
    UiActions: {},
  };

  return shallow(<AnkiRow {...props} />);
}

describe('AnkiRow Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("GridRow[data-role='anki-row']")).toHaveLength(1);
    });
  });
});
