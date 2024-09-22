import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../Dashboard/index';
import LoginPage from '../LoginPage';
import BookingPanel from '../BookingPanel';
function RoutesPage() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='dashboard' element={<DashBoard />}></Route>
                <Route path='bookings' element={<BookingPanel />}></Route>
                {/* <Route path='booking/:id' element={<} */}
            </Routes>
        </div>
    );
}

export default RoutesPage;
