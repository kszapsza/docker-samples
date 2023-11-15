import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import axios from 'axios';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:8080/';
}

axios.defaults.timeout = 1500;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
