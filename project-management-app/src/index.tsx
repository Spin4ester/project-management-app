import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import { store } from 'redux/Store';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from 'redux/api/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <ApiProvider api={apiSlice}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </ApiProvider> */}
    </React.StrictMode>
  </BrowserRouter>
);
