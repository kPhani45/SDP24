import React, { useEffect } from 'react';

function About() {

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section container">

      <div className="page-header reveal">
        <h1>About VoteForChange</h1>
        <p>
          A modern digital voting platform built for transparency,
          security, and trust.
        </p>
      </div>

      <div className="glass-card reveal">
        <h3>Our Mission</h3>
        <p>
          We aim to transform traditional voting systems into secure,
          digital-first platforms that increase participation while
          maintaining complete integrity.
        </p>
      </div>

      <div className="glass-card reveal mt-3">
        <h3>Our Vision</h3>
        <p>
          To become a trusted digital voting infrastructure that ensures
          fairness, security, and accessibility across institutions
          worldwide.
        </p>
      </div>

    </div>
  );
}

export default About;