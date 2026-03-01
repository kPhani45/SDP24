import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [voter, setVoter] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    const validFormat = /^([A-Z]{3}\d{7})$/;
    if (!validFormat.test(voter)) {
      setError('Invalid Voter ID format. Use ABC1234567 format.');
      return;
    }

    if (password !== reenterPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        voterId: voter, 
        password,
      });
      alert(response.data.message); 
      navigate('/login');
    } catch (err) {

      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred during signup.');
      }
      console.log(err);
    }
  }

  return (
    <div className="signup-page-wrapper">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={submit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="voter">Voter ID:</label>
            <input
              type="text"
              id="voter"
              placeholder="e.g., ABC1234567"
              value={voter}
              onChange={(e) => setVoter(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reenterPassword">Re-enter Password:</label>
            <input
              type="password"
              id="reenterPassword"
              placeholder="Re-enter your Password"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      
    </div>
  );
}

export default Signup;