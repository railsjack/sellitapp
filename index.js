import React from 'react';

import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './app/store/reducers';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
