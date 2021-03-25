import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from './LogInButton'
import LogOutButton from './LogOutButton'
import LoginButton from './LogInButton';

const AuthNav = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Nav className='justify-content-end'>
            {isAuthenticated ? <LogOutButton /> : <LogInButton />}
        </Nav>
    )
}

const NavBar = () => {
    return (
        <Navbar bg='light'>
            <Container xs xl='6'>
                <Navbar.Brand href='/'>
                    Simple Skill Tracker
                    </Navbar.Brand>
                <AuthNav />
            </Container>
        </Navbar>
    )
}

export default NavBar;