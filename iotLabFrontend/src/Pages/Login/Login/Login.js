import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import Navigation from '../../Shared/Navigation/Navigation';
import axios from 'axios';
import { addToken } from '../../../utilities/localStorageUtility';


const Login = () => {
    const [loginData, setLoginData] = useState({});

    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const history = useHistory();

    
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);

        const userData = {email:email,password:password}
        axios.post('http://localhost:4000/api/v1/user/login', userData)
        .then(response => {
            const token = response.data.token;
            addToken(token);
            setUser(userData);
            const destination = location?.state?.from || '/';
            history.replace(destination);
            setAuthError('');
        })
        .catch(error => {
        
            setAuthError("Your id is under review or you have given wrong input");
            console.error('There was an error!', error);
        })
        .finally(() => setIsLoading(false));

    }


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

  
    return (
        <div>
        <Navigation/>
        
        <Container>     
                <Grid sx={{ mt: 8 }} xs={12} md={12}>
                    <Typography variant="body1" gutterBottom>Login</Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '60%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">Sign Up</Button>
                        </NavLink>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                </Grid>

            
        </Container>
        <div style={{padding:"200px"}}></div>
        </div>
    );
};

export default Login;