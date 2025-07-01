import React from 'react';
import ResumeSection from '../components/ResumeSection';

/**
 * PUBLIC_INTERFACE
 * Resume/CV page: displays experience, education, and skills.
 */
function Resume() {
  // Mock sample data. Replace with backend API data as needed.
  const experience = [
    {
      company: "TechCorp",
      role: "Frontend Developer",
      period: "2021–Present",
      description: "Developed modern, accessible UI for SaaS products."
    },
    {
      company: "WebSoft",
      role: "Full Stack Engineer",
      period: "2019–2021",
      description: "Built and maintained web apps using MERN stack."
    }
  ];
  const education = [
    {
      place: "State University",
      degree: "B.Sc. Computer Science",
      period: "2015–2019"
    }
  ];
  const skills = [
    "JavaScript", "React", "Node.js", "Express", "HTML", "CSS", "MongoDB", "REST APIs", "Git"
  ];

  return (
    <section className="content resume" style={{minHeight: '60vh', padding: '2.5rem 0'}}>
      <h2 className="title" style={{fontSize: '2.1rem', marginBottom: '1.25rem'}}>Resume</h2>
      <ResumeSection title="Experience">
        {experience.map((exp, idx) => (
          <div className="resume-item" key={idx} style={{marginBottom: '1.4rem'}}>
            <strong>{exp.company}</strong> — <span>{exp.role}</span>
            <div style={{fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .3rem 0'}}>{exp.period}</div>
            <div style={{fontSize: '1rem'}}>{exp.description}</div>
          </div>
        ))}
      </ResumeSection>
      <ResumeSection title="Education">
        {education.map((edu, idx) => (
          <div className="resume-item" key={idx} style={{marginBottom: '1.1rem'}}>
            <strong>{edu.place}</strong> — <span>{edu.degree}</span>
            <div style={{fontSize: '0.97rem', color: 'var(--text-secondary)', margin: '.2rem 0 .2rem 0'}}>{edu.period}</div>
          </div>
        ))}
      </ResumeSection>
      <ResumeSection title="Skills">
        <ul style={{display: 'flex', flexWrap: 'wrap', gap: '.8rem', paddingLeft: 0, listStyle: 'none'}}>
          {skills.map((skill, idx) => (
            <li key={idx} style={{background: "var(--bg-secondary)", color: "var(--text-primary)", borderRadius: "6px", padding: ".3rem 1rem", fontSize: ".98rem", border: "1px solid var(--border-color)"}}>
              {skill}
            </li>
          ))}
        </ul>
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
    </section>
  );
}

export default Resume;
