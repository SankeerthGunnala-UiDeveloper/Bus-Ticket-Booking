import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuth0 } from '@auth0/auth0-react';

import '../../App.css';

function LoginPage() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    console.log(isAuthenticated, 'isAuthenticated');
    return (
        <div className='dF-aC-jc' style={{ backgroundColor: 'palevioletred', height: '100vh', width: '100%' }}>
            <div style={{ display: 'block', textAlign: 'center' }}>
                <LanguageIcon style={{ color: 'white', fontSize: '80px' }} />
                <Typography style={{ color: 'white' }}>Book Your Online Bus Tickets</Typography>
            </div>

            <div style={{ position: 'fixed', bottom: '10px', width: '100%' }}>
                {!isAuthenticated ? (
                    <Button variant='outlined' onClick={loginWithRedirect} style={{ width: '100%', margin: '0px 10px', backgroundColor: '#fff', color: '#dc3545', padding: '10px', border: 'none' }}>
                        Login
                    </Button>
                ) : (
                    <Button variant='outlined' onClick={() => navigate('/dashBoard')} style={{ width: '100%', margin: '0px 10px', backgroundColor: '#fff', color: '#dc3545', padding: '10px', border: 'none' }}>
                        GET STARTED
                    </Button>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
