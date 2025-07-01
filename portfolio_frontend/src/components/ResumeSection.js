import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ResumeSection: Labeled section for resume blocks (Experience, Education, Skills).
 *
 * Props:
 * - title: Section heading (string)
 * - children: Section content (React node)
 */
function ResumeSection({ title, children }) {
  return (
    <section className="resume-section" style={{marginBottom: '2.1rem'}}>
      <h3 className="resume-section-title" style={{fontSize: '1.12rem', color: 'var(--text-secondary)', marginBottom: '.7rem', textTransform: "uppercase", letterSpacing: "0.08em"}}>
        {title}
      </h3>
      <div className="resume-section-content">
        {children}
      </div>
    </section>
  );
}

export default ResumeSection;
