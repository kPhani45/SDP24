import React from 'react';
import '../css/Contact.css';

function Contact() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p>Have questions or need assistance? Fill out the form below and we'll get back to you.</p>
      <form
        autoComplete="off"
        id="contact_form"
        className="contact_form"
        action="https://formsubmit.co/phani@gmail.com"
        method="POST"
      >
        <label htmlFor="person_name">Name *</label>
        <input
          type="text"
          name="name"
          id="person_name"
          required
          placeholder="Your Name"
          maxLength="50"
        />

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Your Email Address"
          maxLength="50"
        />

        <label htmlFor="subject">Subject *</label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          placeholder="What is this about?"
          maxLength="160"
        />

        <label htmlFor="message_txt">Message *</label>
        <textarea
          name="message"
          id="message_txt"
          rows="5"
          maxLength="5000"
          required
          placeholder="Please describe your issue..."
        ></textarea>

        <input type="hidden" name="_next" value={window.location.href} />
        <input type="hidden" name="_captcha" value="false" />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
