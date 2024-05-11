import React, { useState, useEffect } from 'react';
import Process from '../components/Process';
import { useNavigate, Link } from 'react-router-dom';
import "../css/loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = Process();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Redirecting to home page after successful login...");
      navigate("/");
      navigate(0);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password); 
    } catch (loginError) {
      setError('Login failed: Invalid username or password');
    }
  };

  return (
    <div>
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
        <div className="register-link">
          Tidak punya akun? <Link to="/register">Buat Akun Baru!</Link>
        </div>
      </form>
    </div>
    <div className="mt-5 mb-0"
        style={{height: "12vh"}}
    ></div>
    </div>
  );
};

export default LoginPage;
