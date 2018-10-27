import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import toJson from 'enzyme-to-json';

import { Map } from 'immutable';

import { NoteRow } from './Row';

function setup(activeNotebookId = '1', activeNoteId = '') {
  const props = {
    note: Map({
      _id: '1',
      title: 'test note',
    }),
    activeNoteId,
    activeNotebookId,
    currentUser: {},

    UiActions: {},
    UserActions: {},
    NoteActions: {},
  };

  return shallow(<NoteRow {...props} />);
}

describe('NoteRow Unit Tests', () => {
  describe('when in a normal notebook', () => {
    const wrapper = setup();
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
      expect(wrapper.find("div[data-role='note-row']")).toHaveLength(1);
    });

    it('should not be highlighted before clicking', () => {
      expect(wrapper.find('.bg-red')).toHaveLength(0);
      expect(wrapper.find('.bg-orange-light')).toHaveLength(0);
    });

    it('should display the right title for the note', () => {
      expect(wrapper.find('.flex-1').text()).toEqual('test note');
    });

    it('should display a close button', () => {
      expect(wrapper.find('.fa-close')).toHaveLength(1);
    });
  });

  describe('when in the dustbin', () => {
    const wrapper = setup('deleted');
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
    });

    it('should display a trash button', () => {
      expect(wrapper.find('.fa-close')).toHaveLength(0);
      expect(wrapper.find('.fa-trash')).toHaveLength(1);
    });
  });

  describe('when is the activeNote', () => {
    const wrapper = setup('1', '1');
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
    });

    it('should be in bg red', () => {
      expect(wrapper.find('.bg-red')).toHaveLength(1);
    });
  });

  describe('when is not the activeNote', () => {
    const wrapper = setup('1', '2');
    it('renders correctly', () => {
      const jsonOutput = toJson(wrapper);
      // expect(jsonOutput).toMatchSnapshot();
    });

    it('should not be in bg red', () => {
      expect(wrapper.find('.bg-red')).toHaveLength(0);
      expect(wrapper.find('.bg-orange-light')).toHaveLength(0);
    });
  });
});
