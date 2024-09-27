import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.css';
import MainLayout from './lib/layouts/MainLayout';

const preloadedState = {
  common: {
    value: 10
  }
};

const debounceNotify = _.debounce((notify: () => void) => notify())
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
});

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <MainLayout />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals