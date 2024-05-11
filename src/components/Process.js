// src/Process.js
import useFetch from './useFetch';
import { useState, useEffect } from 'react';

const Process = () => {
    const { data: users, isPending, error } = useFetch('http://localhost:8989/users');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // Menambahkan state untuk userId

    useEffect(() => {
        const sessionUserId = sessionStorage.getItem('userId');
        if (sessionUserId) {
            setIsLoggedIn(true);
            setUserId(sessionUserId); // Set user ID dari session
        }
    }, []);

    const login = (username, password) => {
        if (isPending || error) {
            console.error("User data is not loaded or there's an error");
            return;
        }

        const user = users.find(user => (user.username === username || user.email === username) && user.password === password);
        if (user) {
            sessionStorage.setItem('userId', user.id);
            setIsLoggedIn(true);
            setUserId(user.id); // Simpan user ID
            console.log('Login successful');
        } else {
            console.log('Login failed: User not found or password does not match');
        }
    };

    const logout = () => {
        sessionStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserId(null); // Kosongkan user ID
        console.log('Logged out successfully');
    };

    return { login, logout, isLoggedIn, userId };
};

export default Process;
