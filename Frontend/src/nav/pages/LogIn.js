import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../css/LogIn.css';

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isMfaStep, setIsMfaStep] = useState(false); 

  const from = location.state?.from?.pathname || null;
  async function handleCredentialSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/login-request', {
        voterId,
        password,
      });

      setIsMfaStep(true);
      setMessage('A verification code has been sent to your registered email.');

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  }
  async function handleMfaSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/login-verify', {
        voterId,
        mfaCode,
      });

     
      login(response.data);

      const userRole = response.data.user.role;

      if (from) {
        navigate(from, { replace: true });
      } else if (userRole === 'admin') {
        navigate('/onlinevoting');
      } else {
        navigate('/voting');
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Invalid or expired code.');
      }
    }
  }

  function handleVoterIdChange(e) {
    const newValue = e.target.value.toUpperCase();
    setVoterId(newValue);
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
      

        {!isMfaStep ? (
         
          <>
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleCredentialSubmit}>
              {error && <p className="error-message">{error}</p>}
              
              <div className="form-group">
                <label htmlFor="voterId">Voter ID:</label>
                <input
                  type="text"
                  id="voterId"
                  value={voterId}
                  onChange={handleVoterIdChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="ac">
                <button type="submit" className="login-button">Sign In</button>
              </div>
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </>
        ) : (
       
          <>
            <h1 className="login-title">Enter Verification Code</h1>
            <form onSubmit={handleMfaSubmit}>
              {message && <p className="info-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
              
              <div className="form-group">
                <label htmlFor="mfaCode">Authentication Code:</label>
                <input
                  type="text"
                  id="mfaCode"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="Check your email"
                  required
                />
              </div>

              <div className="ac">
                <button type="submit" className="login-button">Verify & Log In</button>
              </div>
            </form>
            <p>
              <button className="login-button" onClick={() => setIsMfaStep(false)}>
                Back to login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LogIn;