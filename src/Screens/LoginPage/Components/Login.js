import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {isAuthenticated ? (
                <Button variant='outlined' onClick={() => loginWithRedirect()}>
                    Login
                </Button>
            ) : (
                <Button
                    variant='contained'
                    onClick={() => {
                        logout({
                            logoutParams: {
                                returnTo: window.location.origin,
                            },
                        });
                    }}>
                    LogOut
                </Button>
            )}
        </div>
    );
}

export default Login;
