import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Contact page with contact info and message form placeholder.
 */
function Contact() {
  return (
    <section className="content contact" style={{minHeight: '50vh', padding: '2.5rem 0', maxWidth: 680, margin: '0 auto'}}>
      <h2 className="title" style={{fontSize: '2rem'}}>Contact</h2>
      <p style={{fontSize: '1.08rem', color: 'var(--text-secondary)', marginBottom: '1.7rem'}}>
        Want to get in touch? Fill out the form below or email me directly at <a href="mailto:youremail@mail.com" style={{color:'var(--text-secondary)', textDecoration:'underline'}}>youremail@mail.com</a>.
      </p>
      <div style={{background: 'var(--bg-secondary)', borderRadius: 8, padding: '2rem 1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.03)'}}>
        <span style={{color: 'var(--text-primary)', fontWeight: 600}}>
          (Contact form coming soon. Direct email is currently best.)
        </span>
      </div>
    </section>
  );
}

export default Contact;
