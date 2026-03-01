import React from 'react';
import '../css/UserVoting.css';

function Createdpoll() {
  const members = [
    { name: 'AP ELECTIONS', options: 'TDP', description: 'Telugu Desam Party - regional party in AP/Telangana' },
    { name: 'AP ELECTIONS', options: 'JSP', description: 'Jana Sena Party - social & political issues' },
    { name: 'AP ELECTIONS', options: 'YSRCP', description: 'Yuvajana Sramika Rythu Congress Party' },
    { name: 'AP ELECTIONS', options: 'CONGRESS PARTY', description: 'Indian National Congress' },
  ];

  return (
    <div className="container">
      <h2>Created A Voting</h2>
      <table className="voting-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Options</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.options}</td>
              <td>{member.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Createdpoll;
