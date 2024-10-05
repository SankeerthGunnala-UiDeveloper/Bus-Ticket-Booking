import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Typography, Button, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DestinationSearch from './components/DestinationSearch';
import Adversitements from './components/Adversitements';
import '../../App.css';

function DashBoard() {
    const { logout, user } = useAuth0();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className='destination'>
            <Typography sx={{ background: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', position: 'absolute', top: '30%', left: '40%', fontSize: '25px' }}>
                Online Bus Ticket Booking Site
            </Typography>
            <Button variant='contained' onClick={handleClick} sx={{ position: 'absolute', right: '10px' }}>
                <AccountCircleIcon sx={{ width: '50px', height: '50px' }} />
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Box sx={{ padding: '20px' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            {' '}
                            <Typography>{user?.name}</Typography>
                        </li>
                        <li>
                            <Button>My Profile</Button>
                        </li>
                        <li>
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
                        </li>
                    </ul>
                </Box>
            </Popover>

            <DestinationSearch />
            <Adversitements />
        </div>
    );
}

export default DashBoard;
