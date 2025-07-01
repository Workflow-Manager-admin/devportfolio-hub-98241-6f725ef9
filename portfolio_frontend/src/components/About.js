import React from "react";
import PropTypes from "prop-types";
import AnimatedIntro from "./AnimatedIntro";
import SocialIconsBar from "./SocialIconsBar";

/**
 * PUBLIC_INTERFACE
 * About - visually prominent card for intro/profile, glassmorphic background, glowing avatar/effects. 
 * Props:
 *  - avatar: { src, alt } image
 *  - title: heading text
 *  - subtitle: description/mission
 *  - ctas: Array of { label, href }
 *  - socials: Array for SocialIconsBar
 */
function About({
  avatar = { src: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", alt: "Profile avatar" },
  title = "👋 Hi, I'm Your Name!",
  subtitle = "Modern full-stack developer. Crafting next-gen web experiences.",
  ctas = [
    { label: "View Projects", href: "/projects" },
    { label: "Contact Me", href: "/contact" },
  ],
  socials,
  bioLines = [
    "🌟 Experienced in React, Node.js, and cloud.",
    "💡 Passionate about UI animation, APIs, and scalable software.",
    "🚀 Ready to build your next project!"
  ]
}) {
  return (
    <section
      className="glass-card about-section"
      style={{
        maxWidth: 590,
        margin: "2rem auto",
        padding: "2.6rem 2.2rem 2.6rem 2.2rem",
        position: "relative",
        boxShadow: "var(--box-shadow-high), 0 0 11px 0 #00e0ff44",
        textAlign: "center",
        backdropFilter: "blur(var(--glass-blur))",
        overflow: "visible"
      }}
      aria-label="About me"
    >
      <div className="glowing-avatar-wrap">
        <span className="glowing-avatar" tabIndex={0} aria-label="Profile photo">
          <img src={avatar.src} alt={avatar.alt} />
          {/* Neon SVG ring accent */}
          <svg width="140" height="140" style={{ position: "absolute", top: "-14px", left: "-14px", pointerEvents: "none" }}>
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="85%">
                <stop offset="0%" stopColor="#00e0ff" stopOpacity="0.22" />
                <stop offset="82%" stopColor="#4f46e5" stopOpacity="0.11" />
                <stop offset="100%" stopColor="#15151b" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="70" cy="70" r="63.5"
              fill="none" stroke="url(#glowGradient)" strokeWidth="7" />
          </svg>
        </span>
      </div>
      {/* Animated Title */}
      <AnimatedIntro
        text={title}
        delay={30}
        style={{
          fontWeight: 900,
          fontSize: "2.28rem",
          background: "linear-gradient(120deg,var(--accent),var(--accent2) 62%,var(--primary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 14px var(--accent2),0 0 2px #fff"
        }}
      />
      <div
        className="about-subtitle"
        style={{
          fontSize: "1.13rem",
          color: "var(--text-secondary)",
          fontWeight: 500,
          marginTop: 12,
          marginBottom: 19
        }}
      >
        {subtitle}
      </div>
      {/* Modern animated/fade-in bio */}
      <div
        className="about-bio"
        style={{
          margin: "0 auto 1.2rem auto",
          color: "var(--muted-text)",
          fontWeight: 400,
          fontSize: 17,
          minHeight: 38 * bioLines.length,
          lineHeight: 1.62,
          letterSpacing: ".01em",
          opacity: 0.97,
          textAlign: "center",
          maxWidth: 420,
          animation: "bioSlideFade 0.9s cubic-bezier(.48,1.16,.42,1.06) both"
        }}
      >
        {bioLines.map((line, i) => (
          <span
            key={i}
            style={{
              display: "block",
              opacity: 0.86,
              animation: `bioLineFadeIn .63s ${0.16 + 0.12 * i}s both`
            }}
          >
            {line}
          </span>
        ))}
        <style>
          {`
            @keyframes bioSlideFade { from { opacity:0; transform: translateY(24px);} to {opacity:1; transform: none;} }
            @keyframes bioLineFadeIn { from { opacity:0; transform: translateY(24px);} to {opacity:1; transform: none;} }
          `}
        </style>
      </div>
      {/* CTA Buttons */}
      <div
        className="about-ctas"
        style={{ marginTop: 18, display:"flex", gap:"1.2rem", justifyContent:"center", flexWrap: "wrap" }}
      >
        {ctas.map((cta, idx) => (
          <a
            key={idx}
            className="btn btn-large cta-glow"
            href={cta.href}
            tabIndex={0}
            style={{
              minWidth: 145,
              fontWeight: 700,
              textShadow: "0 0 4px #00e0ff,0 2px 18px #4f46e5a2",
              ...(
                idx === 1
                  ? { background: "linear-gradient(100deg,#00e0ff 25%,#4f46e5 93%)" }
                  : {}
              )
            }}
          >
            {cta.label}
          </a>
        ))}
      </div>
      {/* Social icons bar under CTA */}
      <div style={{ marginTop: 25 }}>
        <SocialIconsBar links={socials} />
      </div>
    </section>
  );
}

About.propTypes = {
  avatar: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }),
  title: PropTypes.node,
  subtitle: PropTypes.node,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.node, href: PropTypes.string })
  ),
  socials: PropTypes.array,
  bioLines: PropTypes.arrayOf(PropTypes.string)
};

export default About;
