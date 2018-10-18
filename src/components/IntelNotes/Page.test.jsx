import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { IntelNotePage } from './Page';

function setup() {
  const props = {
  };

  return shallow(<IntelNotePage {...props} />);
}

describe('IntelNotePage Unit Tests', () => {
  describe('', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='anki-page']")).toHaveLength(1);
    });
  });
});
