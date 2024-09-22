import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Screens/Routes';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
function App() {
    return (
        <div className='Login'>
            <Auth0Provider domain={'busbooking.us.auth0.com'} clientId={'vXUMaCP9CZHZQQ0BhPa1BlSN8kBPiGpi'} authorizationParams={{ redirect_uri: window.location.origin }}>
                <Router>
                    <Routes />
                </Router>
            </Auth0Provider>
        </div>
    );
}

export default App;
