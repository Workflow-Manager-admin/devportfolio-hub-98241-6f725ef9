import React from 'react';
import ProjectCard from '../components/ProjectCard';

/**
 * PUBLIC_INTERFACE
 * Projects page: lists featured/case-study projects from backend or sample data.
 */
function Projects() {
  // For now, using static sample data. Replace with real API call.
  const projects = [
    {
      id: 1,
      title: "Modern Portfolio Site",
      description: "A fullstack portfolio template with React and Express.",
      tags: ["React", "Express", "Responsive"],
      repo: "https://github.com/yourname/modern-portfolio",
      demo: "https://yourportfolio.site"
    },
    {
      id: 2,
      title: "Blog Platform",
      description: "Personal blogging platform featuring rich content editing.",
      tags: ["Node.js", "MongoDB", "EditorJS"],
      repo: "https://github.com/yourname/blog-platform"
    }
  ];

  return (
    <section className="content projects" style={{minHeight: '60vh', padding: '2.5rem 0'}}>
      <h2 className="title" style={{fontSize: '2.1rem', marginBottom: '1rem'}}>Projects</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '2.2rem', justifyContent: 'center'}}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
