import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENTID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={client}
      redirectUri={window.location.origin}
      audience="localhost:8003/"
    >
      <App />
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);
