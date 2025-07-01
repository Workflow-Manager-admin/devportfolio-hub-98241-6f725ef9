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
    <section className="resume-section">
      <h3 className="resume-section-title">{title}</h3>
      <div className="resume-section-content">
        {children}
      </div>
    </section>
  );
}

export default ResumeSection;
