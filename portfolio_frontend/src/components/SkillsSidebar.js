import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * SkillsSidebar - Shows a glassmorphic sidebar with animated skill progress bars.
 * Props:
 *  - skills: Array of { name, icon, level, color }
 */
function SkillsSidebar({ skills = [] }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimated(true), 440);
  }, []);

  return (
    <aside className="skills-sidebar glass-card" tabIndex={-1}>
      <h3 className="subtitle" style={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: "1.19rem",
        color: "var(--accent2)", marginBottom: 12
      }}>
        Skills &amp; Tools
      </h3>
      <div>
        {skills.map((s, idx) => (
          <div
            className="skill-progress"
            data-animated={animated}
            key={s.name + idx}
            style={{ marginBottom: 23 }}
          >
            <div className="skill-label-bar">
              <span style={{
                color: s.color || "var(--accent)",
                fontSize: 22,
                display: "flex"
              }}>{typeof s.icon === "string" ? <span>{s.icon}</span> : s.icon}</span>
              <span>{s.name}</span>
              <span
                className="progress-tip"
                style={{
                  left: 'auto', right: 0, color: s.color || "var(--accent)"
                }}
              >
                {animated ? `${s.level}%` : ""}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-bar"
                style={{
                  width: animated ? `${s.level}%` : 0,
                  background: "linear-gradient(90deg, #00e0ff 0%, #4f46e5 70%)",
                  transition: "width 1.1s cubic-bezier(.4,.19,.49,1.08), background 0.4s",
                  borderRadius: 9,
                  boxShadow: "0 0 11px 0 #00e0ff55",
                  minHeight: 8
                }}
                tabIndex={0}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

SkillsSidebar.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.node,
    level: PropTypes.number,
    color: PropTypes.string,
  }))
};

export default SkillsSidebar;
