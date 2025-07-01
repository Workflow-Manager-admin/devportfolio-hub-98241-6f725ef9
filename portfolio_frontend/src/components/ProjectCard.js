import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ProjectCard displays a project as a modern, minimal card.
 * 
 * Props:
 * - project: {title, description, tags, repo, demo}
 */
function ProjectCard({ project }) {
  return (
    <div className="project-card" style={{
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      boxShadow: '0 2px 18px 0 rgba(0,0,0,0.03)',
      borderRadius: '9px',
      padding: '2rem 1.4rem',
      minWidth: 280,
      maxWidth: 350,
      flex: '1 0 260px',
      border: '1px solid var(--border-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
    }}>
      <div style={{fontWeight: 700, fontSize: '1.21rem', marginBottom: '.4rem'}}>{project.title}</div>
      <div style={{fontSize: '1.01rem', marginBottom: '0.75rem'}}>{project.description}</div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.18rem'}}>
        {project.tags && project.tags.map((tag, idx) => (
          <span key={idx} style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-secondary)',
            borderRadius: '4px',
            padding: '.21rem .7rem',
            fontSize: '.89rem',
            border: '1px solid var(--border-color)',
            opacity: 0.93,
          }}>{tag}</span>
        ))}
      </div>
      <div style={{marginTop: 'auto', display: 'flex', gap: '1.1rem', width: '100%'}}>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="btn"
             style={{
               padding: '.4rem 1.1rem',
               background: 'var(--button-bg)', color: 'var(--button-text)',
               borderRadius: '5px', textDecoration: 'none', fontWeight: 500, fontSize: '.98rem'
             }}>
            Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
             className="btn"
             style={{
               padding: '.4rem 1.1rem',
               background: 'transparent', color: 'var(--text-secondary)',
               border: '1.4px solid var(--text-secondary)', borderRadius: '5px',
               textDecoration: 'none', fontWeight: 500, fontSize: '.98rem'
             }}>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
