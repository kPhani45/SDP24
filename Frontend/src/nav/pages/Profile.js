import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../css/profile.css';

function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading profile...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="container">
      <h1>{user.name}'s Profile</h1>
      <p><strong>Voter ID:</strong> {user.voterId}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Voting Status:</strong> {user.hasVoted ? 'Already Voted' : 'Not Voted Yet'}</p>
      {user.role === 'admin' ? (
        <Link to="/onlinevoting">Go to Admin Panel</Link>
      ) : (
        <Link to="/voting">Go to Voting Page</Link>
      )}
    </div>
  );
}

export default Profile;
