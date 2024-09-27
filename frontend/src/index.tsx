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
import { podAPI } from './api/api';


const debounceNotify = _.debounce((notify: () => void) => notify())
const store = configureStore({
  reducer: {
    ...reducer,
    [podAPI.reducerPath]: podAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(podAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
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