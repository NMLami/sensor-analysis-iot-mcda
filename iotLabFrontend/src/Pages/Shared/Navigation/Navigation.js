import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { userLoggedIn,logout } from '../../../utilities/localStorageUtility';
import ApiIcon from '@mui/icons-material/Api';

const Navigation = () => {
    const user = userLoggedIn();

    const logoutClick = e => {
        logout()
        e.preventDefault();
    }
    return (
        <div>
        <Navbar bg="dark" sticky="top" variant="black"  collapseOnSelect expand="lg" >
                <Container>
                    <Navbar.Brand as={Link}  style={{color:'white'}}  to='/home#home'><ApiIcon/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-begin" >
                        <Nav>
                        <Nav.Link as={HashLink} style={{color:'white'}} to="/custome">Preference</Nav.Link>
                        {/* <Nav.Link as={Link}  style={{color:'white'}}  to="/products">Prediction</Nav.Link> */}

                        <Nav.Link as={Link}  style={{color:'white'}}  to={{pathname: "https://documenter.getpostman.com/view/15942482/2s8Z76w9Ef"}} target="_blank"> Documentation</Nav.Link>
                        {user?.userType == "admin" ? 
                        <Nav.Link as={Link} style={{color:'white'}} to="/admin">Admin</Nav.Link> : <div></div>
                        }
                        </Nav>
                        {/* { user?.email?
                        
                              <Nav.Link as={Link}  style={{color:'white'}}  to="/dashboard">Dashboard</Nav.Link>
                              :
                              ''
                            } */}
                            {/* <div className="ms-auto">
                         
                        </div> */}
                        <div className="ms-auto">
                        {user?.email?
                            <Button className='mx-2' onClick={logoutClick} variant="danger">Logout</Button>
                            :
                            <Nav.Link as={Link} style={{color:'white'}} to="/login">Login</Nav.Link>}
                        <Navbar.Text style={{color:'white'}} >
                          {user?.email} 
                        </Navbar.Text>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
        </div>
    );
};

export default Navigation;