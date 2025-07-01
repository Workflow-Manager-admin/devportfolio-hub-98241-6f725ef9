import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../api/api';

/**
 * PUBLIC_INTERFACE
 * Projects page: lists featured/case-study projects from backend data.
 */
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

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
    <section className="content projects" style={{minHeight: '60vh', padding: '2.5rem 0'}}>
      <h2 className="title" style={{fontSize: '2.1rem', marginBottom: '1rem'}}>Projects</h2>
      {loading && <div style={{color: 'var(--text-secondary)', margin: "2.5rem 0"}}>Loading projects&hellip;</div>}
      {error && <div style={{color: '#c00', margin: '1rem 0'}}>{error}</div>}
      {!loading && !error && (
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '2.2rem', justifyContent: 'center'}}>
        {projects.length === 0 && (
          <span style={{color: 'var(--text-secondary)'}}>No projects to display.</span>
        )}
        {projects.map(project => (
          <ProjectCard key={project.id || project._id || Math.random()} project={project} />
        ))}
      </div>
      )}
    </section>
  );
}

export default Projects;
