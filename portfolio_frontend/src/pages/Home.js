import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Home (Landing) page for the portfolio site.
 */
function Home() {
  return (
    <section className="content home" style={{ minHeight: '60vh', padding: '3rem 0' }}>
      <h1 className="title">
        Hello, I'm Your Name
      </h1>
      <p className="subtitle" style={{ maxWidth: 500, margin: '0 auto 2.2rem auto' }}>
        I'm a software developer specializing in building exceptional, high-quality web applications. Welcome to my modern portfolio.
      </p>
      <a className="btn btn-large" href="/projects">
        View Projects
      </a>
    </section>
  );
}

export default Home;
