import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { ModalSearch } from './Search';

function setup() {
  const props = {
    UserActions: {},
    UiActions: {},
    NoteActions: {},
  };

  return shallow(<ModalSearch {...props} />);
}

describe('ModalSearch Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='modal-search']")).toHaveLength(1);
    });
  });
});
