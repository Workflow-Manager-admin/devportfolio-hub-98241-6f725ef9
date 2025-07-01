import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Home (Landing) page for the portfolio site.
 */
function Home() {
  return (
    <section className="content home" style={{ minHeight: '60vh', padding: '3rem 0' }}>
      <h1 className="title" style={{ fontSize: '2.7rem', fontWeight: 700, marginBottom: '1.1rem' }}>
        Hello, I'm Your Name
      </h1>
      <p className="subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 2.2rem auto' }}>
        I'm a software developer specializing in building exceptional, high-quality web applications. Welcome to my modern portfolio.
      </p>
      <a className="btn btn-large" href="/projects" style={{
        background: 'var(--button-bg)', color: 'var(--button-text)', padding: '0.9rem 2.3rem',
        fontWeight: 600, fontSize: '1.07rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '.01em'
      }}>
        View Projects
      </a>
    </section>
  );
}

export default Home;
