import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

// import { Map } from 'immutable';
import moment from 'moment-timezone';

import { DailyTasksList } from './List';

function setup() {
  const props = {
    dayVal: {
      dayMomentObject: moment.tz('2017-01-01', 'Asia/Tokyo'),
    },

    TaskActions: {},
  };

  return shallow(<DailyTasksList {...props} />);
}

describe('DailyTasksList Unit Tests', () => {
  describe('when normally set up', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='dailytasks-list']")).toHaveLength(1);
    });
  });
});
