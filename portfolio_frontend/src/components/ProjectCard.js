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
    <div className="project-card">
      <div className="project-title">{project.title}</div>
      <div className="project-description">{project.description}</div>
      <div className="project-tags">
        {project.tags && project.tags.map((tag, idx) => (
          <span key={idx} className="project-tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="btn code">
            Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
             className="btn demo">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
