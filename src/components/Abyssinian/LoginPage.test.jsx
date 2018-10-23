import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { LoginPage } from './LoginPage';

function setup() {
  const props = {
    pageName: '',
    location: {},
    loggedIn: () => { },
    authLock: {
      show: () => { }
    },
    UserActions: {},
    UiActions: {},
  };

  return shallow(<LoginPage {...props} />);
}

describe('LoginPage Unit Tests', () => {
  // beforeAll(() => {
  //
  // });

  describe('', () => {
    const ls = require('../../../utility-test/setup/localStorage.js');
    ls.setLocalStorage();

    // const wrapper = setup();
    it('renders correctly', () => {
      // const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      // expect(wrapper.find("div[data-role='login-page']")).toHaveLength(1);
    });
  });
});
