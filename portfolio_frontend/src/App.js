import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';

// Placeholder page components
function Home() {
  return (
    <section className="content">
      <h1 className="title">Welcome to My Portfolio</h1>
      <p className="subtitle">A modern, minimal software developer portfolio site.</p>
    </section>
  );
}

function Projects() {
  return (
    <section className="content">
      <h2 className="title">Projects</h2>
      <p>Explore my coding projects and case studies here. (Content coming soon!)</p>
    </section>
  );
}

function Resume() {
  return (
    <section className="content">
      <h2 className="title">Resume</h2>
      <p>Download or view my resume and work experience. (Content coming soon!)</p>
    </section>
  );
}

function Contact() {
  return (
    <section className="content">
      <h2 className="title">Contact</h2>
      <p>Let's connect! (Content and contact form coming soon.)</p>
    </section>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
