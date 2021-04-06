import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav className="justify-content-end">
      {isAuthenticated ? <LogOutButton /> : <LogInButton />}
    </Nav>
  );
};

const NavBar = () => (
  <Navbar className="py-3" bg="dark">
    <Container xs="6" xl="6">
      <Navbar.Brand className="text-white bg-dark" href="/">
        Simple Skill Tracker
      </Navbar.Brand>
      <AuthNav />
    </Container>
  </Navbar>
);

export default NavBar;
