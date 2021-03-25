import React from 'react'
import { Nav } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <Nav>
            <Nav.Item>
                <Nav.Link href='localhost:3000'>Home</Nav.Link>
            </Nav.Item>
            {isAuthenticated ? <></> :
                <Nav.Item>
                    <Nav.Link
                        onClick={() => loginWithRedirect()}
                        eventKey='login'
                    >
                        Login
                    </Nav.Link>
                </Nav.Item>
            }
            {isAuthenticated ?
                <Nav.Item>
                    <Nav.Link
                        onClick={() => logout({ returnTo: window.location.origin })}
                        eventKey='link-2'
                    >
                        Logout
                    </Nav.Link>
                </Nav.Item>
                : <></>}
            {isAuthenticated ?
            <Nav.Item>
                <Nav.Link>
                    {user.name}
                </Nav.Link>
            </Nav.Item> 
            : <></> }
        </Nav>
    )
}

export default Header;