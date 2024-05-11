import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Process from './Process';

function NavbarContent() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = Process(); // Use Process function for state management

    // Function to handle the logout process
    const handleLogout = (event) => {
        event.preventDefault(); // Prevent default link behavior
        logout();
        navigate('/'); // Navigate back to Home after logout
    };

    return (
        <div className="dropdown-content">
            {isLoggedIn ? (
                <>
                    <Link to="/bookings">Kamar Dipesan</Link>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </div>
    );
}

export default NavbarContent;
