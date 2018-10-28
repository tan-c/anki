import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { Header } from './Header';

function setup() {
  const props = {
    location: {
      pathname: '',
    },
    selectedProjectId: '',
    edittingTarget: '',

    updateWeather: () => { },
    UserActions: {},
    UiActions: {},
  };

  return shallow(<Header {...props} />);
}

describe('SubHeader Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      // const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("Menu[data-role='header']")).toHaveLength(0);
    });
  });
});
