import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import { SectionConfigProvider } from './SectionConfigContext';

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

  // Example: Customizable config per section
  const sectionConfig = {
    home: {
      // These could be made dynamic (from settings, API, etc.)
      title: "👋 Hello, I'm Your Name",
      subtitle:
        "I build modern, high-quality web applications. Welcome to my portfolio!",
      ctaLabel: "View My Projects",
      media: null, // e.g., {src: "/images/hero.png", alt: "..."}
      layout: { align: "center" },
    },
    projects: {
      title: "Projects",
      accentColor: "var(--primary)",
      // Could extend with grid/list or images, etc.
    },
    resume: {
      title: "Resume / CV",
    },
    contact: {
      title: "Contact",
      infoLine: "Want to get in touch? Fill out the form or email me.",
      backgroundImage: null,
      layout: "center",
    }
  };

  return (
    <Router>
      <SectionConfigProvider value={sectionConfig}>
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
      </SectionConfigProvider>
    </Router>
  );
}

export default App;
