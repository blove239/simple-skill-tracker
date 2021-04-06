import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const audience = process.env.REACT_APP_AUDIENCE;
const clientID = process.env.REACT_APP_AUTH0_CLIENTID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={clientID}
      redirectUri={window.location.origin}
      audience={audience}
    >
      <App />
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);
