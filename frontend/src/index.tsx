import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './interceptor/axios';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="30859682066-1qjpd979d69plts4qbmkbc58nblh75n2.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </GoogleOAuthProvider>,
);

reportWebVitals();
