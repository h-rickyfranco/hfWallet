import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) window.store = store;

export default store;
