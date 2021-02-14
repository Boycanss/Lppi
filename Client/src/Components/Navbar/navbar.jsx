import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CartNav from './cartNav';

const NavbarComponent = ({ user }) => {
    const history = useHistory();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        history.push('/');
        window.location.reload({ forceReload: false })
    }

    let menu = user.nama_member ? {
        explore: <Nav className="mr-auto">
            <NavLink to="/explore" className="navlink-link">
                Explore
        </NavLink>
        </Nav>,
        cartNav: <NavLink to="/cart" className="navlink-link">
            <CartNav />
        </NavLink>,
        navLogin: <NavLink to="/auth" className="navlink-link">
            Login
</NavLink>
    } : {
            explore: null,
            cartNav: null,
            navLogin: null
        }

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <Navbar bg="white" expand="lg">
                <Navbar.Brand>
                    <NavLink to="/" className="navlink-link">
                        <strong>
                            EVENTING
                        </strong>
                    </NavLink>

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {menu.explore}
                    <Nav>
                        {menu.cartNav}


                        {user.nama_member ?
                            <NavLink to="/auth" onClick={logOut} className="navlink-link">
                                Logout
                        </NavLink> :
                            menu.navLogin
                        }


                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
