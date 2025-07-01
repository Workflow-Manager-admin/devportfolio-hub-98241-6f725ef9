import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

/**
 * PUBLIC_INTERFACE
 * FeaturedProjectsSlider: Auto-advancing highlight slider for up to N projects.
 * Props:
 *  - projects: Array of project objects
 *  - interval: time in ms between slides
 *  - maxSlides: Max slides to show if projects > N
 *  - cardProps: Extra props for <ProjectCard>
 */
function FeaturedProjectsSlider({
  projects = [],
  interval = 2700,
  maxSlides = 5,
  cardProps = {},
}) {
  const featured = projects.slice(0, maxSlides);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const t = setTimeout(() => setIdx(prev => (prev + 1) % featured.length), interval);
    return () => clearTimeout(t);
  }, [idx, featured.length, interval]);

  if (featured.length === 0) return null;
  if (featured.length === 1)
    return <ProjectCard project={featured[0]} {...cardProps} />;

  return (
    <div className="featured-slider" style={{ position: 'relative', width: "100%", maxWidth: 365, margin: "0 auto" }}>
      {featured.map((proj, i) => (
        <div
          key={proj.id || proj._id || i}
          className="slider-item"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateY(0)" : "translateY(36px) scale(0.95)",
            transition: "opacity 0.62s cubic-bezier(.62,.19,.62,1.03), transform 0.69s cubic-bezier(.57,.05,.59,.98)",
            position: idx === i ? 'static' : 'absolute',
            left: 0, right: 0, top: 0, zIndex: idx === i ? 2 : 1,
            pointerEvents: idx === i ? "auto" : "none"
          }}
        >
          <ProjectCard project={proj} {...cardProps} />
        </div>
      ))}
      <div className="slider-dots" style={{ display: 'flex', justifyContent: 'center', marginTop: 10, gap: 6 }}>
        {featured.map((_, dotIdx) => (
          <button
            key={dotIdx}
            aria-label={`Go to project ${dotIdx + 1}`}
            onClick={() => setIdx(dotIdx)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background: idx === dotIdx ? "var(--primary)" : "var(--border-color)",
              cursor: "pointer",
              opacity: idx === dotIdx ? 1 : 0.56,
              transition: "background 0.23s"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProjectsSlider;
