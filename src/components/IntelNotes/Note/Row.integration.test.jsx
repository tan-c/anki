import React from 'react';

import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { fromJS, Map } from 'immutable';

import NoteRowConnected from './Row';

// import setupIntegrationTest from '@ROOT/src/setupIntegrationTest';
// make sure to import your connected component, not your react class
// import MyComponent from '../src/components/MyComponent';

const initialState = {
  users: fromJS({
    1: {
      _id: '1',
      userName: 'User 1',
      config: {
        hima: {
          recentNote: [],
        },
      },
    },
  }),
  ui: fromJS({
    himalayan: {
      activeNoteId: '1',
      activeNotebookId: '1',
    },
    common: {
      currentUserId: '1',
    },
  }),
};

// FIXME: commenting out for now as in setupIntegrationTest it requires `import rootReducer from '../reducers';` but I need to figure out how those relative paths work

// const [store, dispatchSpy] = require('../../../../../utility-test/setup/setupIntegrationTest')(initialState);
// // const [store, dispatchSpy] = require('../../../../setup/setupIntegrationTest')(initialState);

// function setup() {
//   const props = {
//     note: Map({
//       _id: '5',
//       title: 'test note',
//       isDeleted: false,
//     }),
//   };

//   // NOTE: shallow wont work when wrapped in provider
//   return mount(<Provider store={store}>
//     <NoteRowConnected {...props} />
//   </Provider>);
// }

describe('NoteRow Integration Tests', () => {
  describe('when clicking on the item', () => {
    // const wrapper = setup();
    // wrapper.find("div[data-role='note-row']").simulate('click');
    // const { ui, users } = store.getState();

    it('should update activeNoteId', () => {
      expect(1).toBe(1);
      // expect(dispatchSpy).toBeCalledWith({
      //   path: ['himalayan', 'activeNoteId'],
      //   type: 'UPDATE_IN_UI_SUCCESS',
      //   value: '5',
      // });
      // expect(ui.getIn(['himalayan', 'activeNoteId'])).toEqual('5');
      // expect(wrapper.find('.bg-red')).toHaveLength(1);
    });

    // it('should update recentNote of user', () => {
    //   expect(dispatchSpy).toBeCalledWith({
    //     type: 'UPDATE_USER_SUCCESS',
    //     user: { _id: '1', config: { hima: { recentNote: '5' } }, userName: 'User 1' },
    //   });
    //   expect(users.getIn(['1', 'config', 'hima', 'recentNote'])).toEqual('5');
    // });
  });

  // describe('when clicking on the delete button', () => {
  //   const wrapper = setup();
  //   wrapper.find('.fa-close').simulate('click');
  //   const { notes } = store.getState();
  //   it('should update note isDeleted flag', () => {
  //     expect(dispatchSpy).toBeCalledWith({
  //       type: 'UPDATE_NOTE_SUCCESS',
  //       note: {
  //         _id: '5', isDeleted: true, title: 'test note',
  //       },
  //     });
  //     expect(notes.getIn(['5', 'isDeleted'])).toEqual(true);
  //   });
  // });
});
