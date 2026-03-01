import React from 'react';

function Service() {
  return (
    <div className="section container">

      <div className="page-header">
        <h1>Features</h1>
        <p>Secure – Swift – Simple</p>
      </div>

      <div className="feature-grid">

        <div className="glass-card">
          <h3>End-to-End Encryption</h3>
          <p>
            Advanced encryption ensures every vote remains confidential
            and tamper-proof from submission to counting.
          </p>
        </div>

        <div className="glass-card">
          <h3>Real-Time Results</h3>
          <p>
            Instant vote tallying with transparent reporting and
            secure audit logs for verification.
          </p>
        </div>

        <div className="glass-card">
          <h3>Role-Based Access</h3>
          <p>
            Admin and voter roles with strict permission control
            to maintain election integrity.
          </p>
        </div>

        <div className="glass-card">
          <h3>Secure Authentication</h3>
          <p>
            Multi-factor authentication ensures only authorized
            voters can access the platform.
          </p>
        </div>

        <div className="glass-card">
          <h3>Scalable Infrastructure</h3>
          <p>
            Designed to handle both small organizational elections
            and large-scale voting events.
          </p>
        </div>

        <div className="glass-card">
          <h3>Transparent Audit Trails</h3>
          <p>
            Detailed logs provide complete transparency and
            accountability for every action.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Service;