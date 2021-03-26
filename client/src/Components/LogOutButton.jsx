import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout()}
      id="logOutButton"
      variant="danger"
      className="btn-margin"
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
