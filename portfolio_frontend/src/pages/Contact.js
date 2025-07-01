import React, { useState } from 'react';
// import { sendContact } from '../api/api';

/**
 * PUBLIC_INTERFACE
 * Contact page with contact info and message form placeholder.
 * 
 * (When form is implemented, will submit via sendContact from api.js and
 * display loading/error states.)
 */
function Contact() {
  // Placeholder for future contact logic
  const [sending, setSending] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  // Placeholder: to use when the contact form is implemented
  /*
  const handleSubmit = (formData) => {
    setSending(true);
    sendContact(formData)
      .then(result => {
        setSuccess("Message sent!");
        setError(undefined);
      })
      .catch(e => {
        setError(e.message || "Failed to send message.");
        setSuccess(undefined);
      })
      .finally(() => setSending(false));
  };
  */

  return (
    <section className="content contact" style={{minHeight: '50vh', padding: '2.5rem 0', maxWidth: 680, margin: '0 auto'}}>
      <h2 className="title">Contact</h2>
      <p className="contact-info">
        Want to get in touch? Fill out the form below or email me directly at <a href="mailto:youremail@mail.com">youremail@mail.com</a>.
      </p>
      <div className="contact-form-container">
        {sending && <div className="contact-sending">Sending message&hellip;</div>}
        {error && <div className="contact-error">{error}</div>}
        {success && <div className="contact-success">{success}</div>}
        <span style={{color: 'var(--text-primary)', fontWeight: 600}}>
          (Contact form coming soon. Direct email is currently best.)
        </span>
      </div>
    </section>
  );
}

export default Contact;
