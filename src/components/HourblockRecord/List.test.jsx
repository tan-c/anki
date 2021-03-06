import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';

import { HourBlockList } from './List';

function setup() {
  const props = {
    location: {},
    history: {},
    isoWeekDay: 1,

    currentSectionOfDay: 0,

    PlannedPomoActions: {},
    UiActions: {},
    DailyRecordActions: {},
  };

  return shallow(<HourBlockList {...props} />);
}

describe('HourBlockList Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='hourblock-list']")).toHaveLength(1);
    });
  });
});
