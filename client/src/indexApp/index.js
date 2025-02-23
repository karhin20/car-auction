import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from '../reportWebVitals';
import store from '../redux/store';
import { Provider } from 'react-redux';
import "remixicon/fonts/remixicon.css";
///import {Analytics} from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     {/*<Analytics />*/}
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
