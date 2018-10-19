// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import rootReducer from '../reducers';

// const dispatchSpy = jest.fn(() => ({}));
// const reducerSpy = (state, action) => dispatchSpy(action);
// const emptyStore = applyMiddleware(thunk)(createStore);

// module.exports = initialState => [emptyStore(combineReducers({
//   reducerSpy,
//   ...rootReducer,
// }), initialState), dispatchSpy];
