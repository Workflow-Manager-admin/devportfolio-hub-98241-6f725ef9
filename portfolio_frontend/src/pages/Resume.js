import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ResumeSection from '../components/ResumeSection';
import { fetchResume } from '../api/api';
import { useSectionConfig } from '../SectionConfigContext';

/**
 * PUBLIC_INTERFACE
 * Resume/CV page: displays experience, education, and skills from backend.
 * 
 * Accepts props or context for section config and theme/layout.
 */
function Resume(props) {
  const context = useSectionConfig('resume');
  const [data, setData] = useState({
    experience: [],
    education: [],
    skills: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const title = props.title || context.title || "Resume";
  const accentColor = props.accentColor || context.accentColor || "var(--text-secondary)";
  const layout = props.layout || context.layout || {};

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
    <section className="content resume" style={{ minHeight: '60vh', padding: '2.5rem 0', ...layout.style }}>
      <h2 className="title" style={{ fontSize: '2.1rem', marginBottom: '1.25rem', color: accentColor }}>
        {title}
      </h2>
      {loading && <div style={{ color: 'var(--text-secondary)', margin: "2rem 0" }}>Loading resume&hellip;</div>}
      {error && <div style={{ color: '#c00', margin: '1.2rem 0' }}>{error}</div>}
      {!loading && !error && (
        <>
          <ResumeSection title="Experience">
            {data.experience.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No experience listed.</div>}
            {data.experience.map((exp, idx) => (
              <div className="resume-item" key={idx} style={{ marginBottom: '1.4rem' }}>
                <strong>{exp.company}</strong> — <span>{exp.role}</span>
                <div style={{ fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .3rem 0' }}>{exp.period}</div>
                <div style={{ fontSize: '1rem' }}>{exp.description}</div>
              </div>
            ))}
          </ResumeSection>
          <ResumeSection title="Education">
            {data.education.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No education listed.</div>}
            {data.education.map((edu, idx) => (
              <div className="resume-item" key={idx} style={{ marginBottom: '1.1rem' }}>
                <strong>{edu.place}</strong> — <span>{edu.degree}</span>
                <div style={{ fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .2rem 0' }}>{edu.period}</div>
              </div>
            ))}
          </ResumeSection>
          <ResumeSection title="Skills">
            {data.skills.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)' }}>No skills listed.</div>
            ) : (
              <ul className="skills-list">
                {data.skills.map((skill, idx) => (
                  <li key={idx} className="skill">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </ResumeSection>
          <a
            className="btn download-resume-btn"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </>
      )}
    </section>
  );
}

Resume.propTypes = {
  title: PropTypes.string,
  accentColor: PropTypes.string,
  layout: PropTypes.object
};

export default Resume;
