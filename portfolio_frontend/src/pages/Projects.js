import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../api/api';
import { useSectionConfig } from '../SectionConfigContext';

/**
 * PUBLIC_INTERFACE
 * Projects page: lists featured/case-study projects from backend data.
 * 
 * Accepts props (title, accentColor, layout, etc.), or uses SectionConfigContext.
 */
function Projects(props) {
  const context = useSectionConfig('projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const title = props.title || context.title || "Projects";
  const accentColor = props.accentColor || context.accentColor || "var(--primary)";
  const layout = props.layout || context.layout || { type: "grid" };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProjects()
      .then(data => {
        if (mounted) {
          setProjects(Array.isArray(data) ? data : []);
          setError(undefined);
        }
      })
      .catch(e => {
        if (mounted) setError(e.message || "Failed to load projects.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section
      className="content projects"
      style={{
        minHeight: '60vh',
        padding: '2.5rem 0',
        ...layout.style
      }}
    >
      <h2
        className="title"
        style={{
          fontSize: '2.1rem',
          marginBottom: '1rem',
          color: accentColor
        }}
      >
        {title}
      </h2>
      {loading && <div style={{ color: 'var(--text-secondary)', margin: "2.5rem 0" }}>Loading projects&hellip;</div>}
      {error && <div style={{ color: '#c00', margin: '1rem 0' }}>{error}</div>}
      {!loading && !error && (
        <div className="projects-list" style={layout.listStyle}>
          {projects.length === 0 && (
            <span style={{ color: 'var(--text-secondary)' }}>No projects to display.</span>
          )}
          {projects.map(project => (
            <ProjectCard
              key={project.id || project._id || Math.random()}
              project={project}
              // Pass along section accent color/media/config if desired
            />
          ))}
        </div>
      )}
    </section>
  );
}

Projects.propTypes = {
  title: PropTypes.string,
  accentColor: PropTypes.string,
  layout: PropTypes.object
};

export default Projects;
