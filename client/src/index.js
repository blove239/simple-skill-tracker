import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENTID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={client}
      redirectUri={window.location.origin}
      audience="https://dev-11l9mafb.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode >,
  document.getElementById('root')
);

