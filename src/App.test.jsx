import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { App } from './App';

// jest.mock('@PATH_STYLE/wankee.scss');

function setup() {
  const props = {
    NoteActions: {},
    UiActions: {},
    isAnkiOn: false,
  };

  return shallow(<App {...props} />);
}

describe('App Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='app']")).toHaveLength(1);
    });
  });
});
