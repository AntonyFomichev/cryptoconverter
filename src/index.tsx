import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import { configureStore } from 'redux/store';

import App from 'pages/app';
import Loader from 'components/loader';

import reportWebVitals from './reportWebVitals';

import './global-style.css';

const { persistor, store } = configureStore();

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
