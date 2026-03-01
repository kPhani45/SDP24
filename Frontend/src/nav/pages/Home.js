import React from 'react';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleStartClick = () => navigate('/login');

  return (
    <div>
      <section className="hero">
        <h1>Secure & Simple Online Voting</h1>
        <p>Empower your organization with a modern, reliable, and accessible voting platform.</p>
        <button onClick={handleStartClick}>Get Started Now</button>
      </section>

      <div className="container">
        <h2>What is Online Voting?</h2>
        <p>Online voting is a secure and efficient way to conduct elections and polls using the internet. It allows voters to submit their ballots remotely and increases participation.</p>

        <h2>Key Features</h2>
        <p>Our platform offers different ballot methods, strong security protocols, and detailed audit trails for full transparency.</p>
      </div>
    </div>
  );
}

export default Home;
