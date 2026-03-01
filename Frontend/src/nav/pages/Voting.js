import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/voting.css';

const Voting = () => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollOptions = async () => {
      if (!token) {
        setError('You must be logged in to vote.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/poll/options', {
          headers: { 'x-auth-token': token },
        });
        setPollData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load poll data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPollOptions();
  }, [token]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      setError('Please select an option to vote.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/vote',
        { optionId: selectedOption },
        { headers: { 'x-auth-token': token } }
      );
      navigate('/result');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit vote.');
    }
  };

  if (isLoading) return <div className="loading-container">Loading voting options...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (user?.hasVoted) return <div className="voting-container"><h2>You have already voted.</h2></div>;
  if (!pollData) return <div className="voting-container"><h2>No poll is currently active.</h2></div>;

  return (
    <div className="voting-container">
      <h2 className="ct-headline">{pollData.title}</h2>
      <form onSubmit={handleVote}>
        <table className="voting-table">
          <thead>
            <tr>
              <th className="table-header">Party</th>
              <th className="table-header">Select</th>
            </tr>
          </thead>
          <tbody>
            {pollData.options.map((option) => (
              <tr key={option._id}>
                <td className="table-data">{option.name}</td>
                <td className="table-data">
                  <input
                    type="radio"
                    name="voteOption"
                    value={option._id}
                    checked={selectedOption === option._id}
                    onChange={() => setSelectedOption(option._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" disabled={!selectedOption}>
          Submit Vote
        </button>
      </form>
    </div>
  );
};

export default Voting;
