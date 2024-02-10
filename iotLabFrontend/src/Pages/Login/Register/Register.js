import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from './../../hooks/useAuth.js';
import Navigation from '../../Shared/Navigation/Navigation.js';
import axios from 'axios';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    // const { user, registerUser, isLoading, authError } = useAuth();
    // const {isLoading } = useAuth();
    
    
    const registerUser = (email, password, history) => {
     
       setIsLoading(true);
       const userData = {email :email , password:password }
       console.log(userData)
       axios.post('http://localhost:4000/api/v1/user/register', userData)
       .then(response => {
           setUser(userData);
           history.replace('/home');
       })
       .catch(error => {
        
           console.error('There was an error!', error);
       })
       .finally(() => setIsLoading(false));

    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {

        if (loginData.password !== loginData.rePassword) {
            alert('Your password did not match');
            return
        }
        
        registerUser(loginData.email, loginData.password, history);
   
       

         e.preventDefault();
    }
 
    return (
        <div>
            <Navigation/>
      
        <Container>
           
                <Grid  sx={{ mt: 8 }} xs={12} md={12}>
                    <Typography variant="body1" gutterBottom>Register</Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        {/* <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="User Name"
                            name="name"
                            onBlur={handleOnBlur}
                            variant="standard" /> */}
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Email"
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic1"
                            label="Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic2"
                            label="Re Enter Password"
                            type="password"
                            name="rePassword"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '60%', m: 1 }} type="submit" variant="contained">Register</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/login">
                            <Button variant="text">Login</Button>
                        </NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Request successfully Submitted for review!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
          
        </Container>
        <div style={{padding:"200px"}}></div>
        </div>
    );
};

export default Register;