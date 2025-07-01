import React from "react";

/**
 * PUBLIC_INTERFACE
 * SkillsGrid - Show a responsive grid of dev skills.
 * Props:
 *  - skills: Array of {name, icon, level (0-100), color}
 *  - animated (bool): animate bars/rings on mount
 */
function SkillsGrid({ skills = [], animated = true }) {
  return (
    <div className="skills-grid">
      {skills.map((skill, idx) => (
        <div className="skill-block" key={idx}>
          <div
            className="skill-icon"
            style={{
              color: skill.color || "var(--primary)",
              background: "#f1f5f9",
              borderRadius: "50%",
              width: 46,
              height: 46,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              margin: "0 auto",
              boxShadow: "0 2px 8px rgba(18,24,40,0.06)",
              marginBottom: 6,
            }}
          >
            {typeof skill.icon === "string" ? (
              <span>{skill.icon}</span>
            ) : (
              skill.icon
            )}
          </div>
          <div className="skill-label" style={{ fontWeight: 500, fontSize: 15, margin: "2px 0", color: "var(--text-primary)", textAlign: "center" }}>
            {skill.name}
          </div>
          <div
            className="skill-bar-bg"
            style={{
              width: 74,
              height: 8,
              borderRadius: 7,
              background: "var(--border-color)",
              margin: "6px auto 0 auto",
            }}
          >
            <div
              className="skill-bar-fill"
              style={{
                width: animated ? `${skill.level}%` : 0,
                height: 8,
                borderRadius: 7,
                background: skill.barColor || skill.color || "var(--primary)",
                boxShadow: "0 1.5px 6px rgba(0,0,0,0.07)",
                transition: "width 1.3s cubic-bezier(.5,.11,.77,1.02)",
              }}
            />
          </div>
        </div>
      ))}
      <style>{`
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2.2rem 2.2rem;
          justify-content: center;
          margin: 0 -0.2rem;
          margin-bottom: 1.8rem;
        }
        .skill-block {
          min-width: 106px;
          max-width: 130px;
          padding: 12px 6px 6px 6px;
          background: var(--bg-secondary);
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 12px 0 rgba(24,27,44,0.03);
          margin: 0 0.2rem;
        }
        @media (max-width:600px) {
          .skills-grid {
            gap: 1.05rem 1.02rem;
          }
          .skill-block {
            min-width: 94px;
            max-width: 116px;
            padding: 8px 2px 5px 2px;
          }
        }
      `}</style>
    </div>
  );
}

export default SkillsGrid;
