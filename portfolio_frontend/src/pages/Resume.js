import React, { useState, useEffect } from 'react';
import ResumeSection from '../components/ResumeSection';
import { fetchResume } from '../api/api';

/**
 * PUBLIC_INTERFACE
 * Resume/CV page: displays experience, education, and skills from backend.
 */
function Resume() {
  const [data, setData] = useState({
    experience: [],
    education: [],
    skills: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchResume()
      .then(response => {
        if (mounted) {
          setData({
            experience: response.experience || [],
            education: response.education || [],
            skills: response.skills || []
          });
          setError(undefined);
        }
      })
      .catch(e => {
        if (mounted) setError(e.message || "Failed to load resume.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section className="content resume" style={{minHeight: '60vh', padding: '2.5rem 0'}}>
      <h2 className="title" style={{fontSize: '2.1rem', marginBottom: '1.25rem'}}>Resume</h2>
      {loading && <div style={{color: 'var(--text-secondary)', margin: "2rem 0"}}>Loading resume&hellip;</div>}
      {error && <div style={{color: '#c00', margin: '1.2rem 0'}}>{error}</div>}
      {!loading && !error && (
        <>
          <ResumeSection title="Experience">
            {data.experience.length === 0 && <div style={{color: 'var(--text-secondary)'}}>No experience listed.</div>}
            {data.experience.map((exp, idx) => (
              <div className="resume-item" key={idx} style={{marginBottom: '1.4rem'}}>
                <strong>{exp.company}</strong> — <span>{exp.role}</span>
                <div style={{fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .3rem 0'}}>{exp.period}</div>
                <div style={{fontSize: '1rem'}}>{exp.description}</div>
              </div>
            ))}
          </ResumeSection>
          <ResumeSection title="Education">
            {data.education.length === 0 && <div style={{color: 'var(--text-secondary)'}}>No education listed.</div>}
            {data.education.map((edu, idx) => (
              <div className="resume-item" key={idx} style={{marginBottom: '1.1rem'}}>
                <strong>{edu.place}</strong> — <span>{edu.degree}</span>
                <div style={{fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .2rem 0'}}>{edu.period}</div>
              </div>
            ))}
          </ResumeSection>
          <ResumeSection title="Skills">
            {data.skills.length === 0 ? (
              <div style={{color: 'var(--text-secondary)'}}>No skills listed.</div>
            ) : (
              <ul style={{display: 'flex', flexWrap: 'wrap', gap: '.8rem', paddingLeft: 0, listStyle: 'none'}}>
                {data.skills.map((skill, idx) => (
                  <li key={idx} style={{background: "var(--bg-secondary)", color: "var(--text-primary)", borderRadius: "6px", padding: ".3rem 1rem", fontSize: ".98rem", border: "1px solid var(--border-color)"}}>
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </ResumeSection>
          <div style={{marginTop: "2.2rem"}}>
            <a
              className="btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--button-bg)', color: 'var(--button-text)', fontWeight: 600,
                padding: '.8rem 1.9rem', borderRadius: '5px', textDecoration: 'none'
              }}>
              Download PDF
            </a>
          </div>
        </>
      )}
    </section>
  );
}

export default Resume;
