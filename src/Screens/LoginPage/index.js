/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LanguageIcon from '@mui/icons-material/Language';
import { useAuth0 } from '@auth0/auth0-react';

import '../../App.css';

const commonStyles = {
    width: '100%',
    margin: '10px 0px',
    backgroundColor: '#fff',
    color: '#dc3545',
    padding: '10px',
    border: 'none',
};

function LoginPage() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <div className='dF-aC-jc' style={{ backgroundColor: 'palevioletred', height: '100vh', width: '100%' }}>
            <div style={{ display: 'block', textAlign: 'center' }}>
                {!isAuthenticated ? <marquee>Login credentials --- username: avinash@gmail.com, password: secret</marquee> : null}
                <LanguageIcon style={{ color: 'white', fontSize: '80px' }} />
                <Typography style={{ color: 'white' }}>Book Your Online Bus Tickets</Typography>
                <div style={{ width: '150px', margin: '0px auto' }}>
                    {!isAuthenticated ? (
                        <Button variant='outlined' onClick={loginWithRedirect} style={{ ...commonStyles }}>
                            Login
                        </Button>
                    ) : (
                        <Button variant='outlined' onClick={() => navigate('/dashBoard')} style={{ ...commonStyles }}>
                            GET STARTED
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
