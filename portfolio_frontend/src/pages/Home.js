import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSectionConfig } from '../SectionConfigContext';
import AnimatedIntro from '../components/AnimatedIntro';
import FeaturedProjectsSlider from '../components/FeaturedProjectsSlider';
import SocialIconsBar from '../components/SocialIconsBar';
import { fetchProjects } from '../api/api';
import { motion } from "framer-motion";

/**
 * PUBLIC_INTERFACE
 * Home (Landing) page for the portfolio site.
 * Two-column glassmorphic layout: glowing avatar+animated intro, CTA, social; sidebar with skills progress bars; projects slider; all micro-interactive.
 */
function Home(props) {
  const context = useSectionConfig('home');
  const title = props.title || context.title || "Hello, I'm Your Name";
  const subtitle =
    props.subtitle ||
    context.subtitle ||
    "I'm a software developer specializing in building exceptional, high-quality web applications. Welcome to my modern portfolio.";
  const ctaLabel = props.ctaLabel || context.ctaLabel || "View Projects";
  const media = props.media || context.media || null;
  const layout = props.layout || context.layout || { align: "center" };

  // Avatar
  const avatarUrl =
    (context.avatar && context.avatar.src) ||
    "https://avatars.githubusercontent.com/u/9919?s=200&v=4";
  const avatarAlt =
    (context.avatar && context.avatar.alt) || "Profile avatar";

  // Skills
  const skills = context.skills || [
    {
      name: 'React',
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="4.5" fill="#4f46e5" opacity="0.12"/><ellipse transform="rotate(60 12 12)" cx="12" cy="12" rx="10" ry="4.5" fill="#0891b2" opacity="0.13"/><ellipse transform="rotate(120 12 12)" cx="12" cy="12" rx="10" ry="4.5" fill="#14b8a6" opacity="0.12"/><circle cx="12" cy="12" r="2.4" fill="currentColor"/></g></svg>,
      level: 90,
      color: "#00e0ff"
    },
    { name: 'JavaScript', icon: '🟨', level: 95, color: "#f5bc00" },
    { name: 'CSS3', icon: '🎨', level: 82, color: "#0891b2" },
    {
      name: 'NodeJS',
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g fill="#8cc84b"><path d="M12 2.256l9.214 5.319-.003 8.865-9.211 5.304-9.211-5.303.003-8.866L12 2.256zm0 1.517L3.778 7.509l.003 7.499L12 20.214l8.22-5.207V7.509L12 3.773zm.397 10.303c0 1.014-.604 1.329-1.53 1.329-.71 0-1.142-.037-1.467-.114v.778h.633v.568h-2.15v-.568h.633V9.501h1.308l.016.01c.442.026.92.044 1.254.114.526.111.902.512.902 1.018 0 .41-.222.793-.619.954.535.163.964.55.964 1.165zm-1.353-2.336c-.151-.009-.418-.016-.598-.016H8.7v2.487c.209.034.62.064 1.13.064.613 0 .99-.226.99-.735 0-.459-.3-.664-.776-.7l-.103-.004v-.01c.345-.02.685-.187.685-.62 0-.359-.281-.568-.683-.572zm2.822 2.418c.41 0 .746-.072.98-.257.187-.147.262-.353.262-.67V9.65c0-.406-.181-.603-.586-.632-.243-.017-.467-.018-.637-.018h-.907v.573h.745c.127 0 .208.008.271.023.124.023.162.094.162.249v.274c0 .145-.024.192-.174.217-.043.007-.124.013-.26.013h-.744v.59h.818c.14 0 .218.008.281.019.123.022.164.084.164.239v.345c0 .145-.024.192-.175.217-.043.007-.124.013-.261.013h-.826v.57h.92z"/></g></svg>,
      level: 83,
      color: "#5adc5a"
    },
    { name: 'Python', icon: '🐍', level: 78, color: "#306998" }
  ];

  // Sidebar skills - for unique progress bar display, convert to sidebar with micro-interaction
  function SkillsSidebar({ skills }) {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
      setTimeout(() => setAnimated(true), 700);
    }, []);
    return (
      <aside className="skills-sidebar glass-card" tabIndex={-1}>
        <h3 className="subtitle" style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.23rem",
          color: "var(--accent2)", marginBottom: 10
        }}>
          Skills &amp; Tools
        </h3>
        <div>
          {skills.map((s, idx) => (
            <div
              className="skill-progress"
              data-animated={animated}
              key={s.name + idx}
              style={{ marginBottom: 22 }}
            >
              <div className="skill-label-bar">
                <span style={{
                  color: s.color || "var(--accent)", fontSize: 21, display: "flex"
                }}>{typeof s.icon === "string" ? <span>{s.icon}</span> : s.icon}</span>
                <span>{s.name}</span>
                <span
                  className="progress-tip"
                  style={{ left: 'auto', right: 0, color: s.color || "var(--accent)" }}
                >
                  {animated ? `${s.level}%` : ""}
                </span>
              </div>
              <div className="progress-track" style={{ background: "var(--progress-track)", borderRadius: 9 }}>
                <div
                  className="progress-bar"
                  style={{
                    background: "linear-gradient(90deg, #00e0ff 0%, #4f46e5 70%)",
                    width: animated ? `${s.level}%` : 0,
                    transition: "width 1.1s cubic-bezier(.4,.19,.49,1.08), background 0.4s",
                    borderRadius: 9,
                    boxShadow: "0 0 9px 0 #00e0ff44"
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

  // Projects
  const [projects, setProjects] = useState([]);
  const [sliderReady, setSliderReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then(res => {
        if (mounted) setProjects(Array.isArray(res) ? res : []);
        setSliderReady(true);
      })
      .catch(() => setSliderReady(true));
    return () => { mounted = false; };
  }, []);

  // Animation
  const containerVariant = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.18, delayChildren: 0.03 }
    }
  };
  const fadeVariant = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="content home"
      style={{
        minHeight: '70vh',
        padding: '3.3rem 0 2.7rem 0',
        maxWidth: 1180,
        ...layout.style,
      }}
      variants={containerVariant}
      initial="hidden"
      animate="show"
    >
      {/* Two-column glass grid: left main, right sidebar */}
      <div className="home-glass-grid">
        {/* Main column */}
        <div className="main-col">
          <motion.div
            className="glowing-avatar-wrap"
            variants={fadeVariant}
            style={{
              marginBottom: 0,
            }}
          >
            <span className="glowing-avatar" tabIndex={0} aria-label="Profile photo">
              <img src={avatarUrl} alt={avatarAlt} />
              {/* SVG glow ring effect */}
              <svg width="148" height="148" viewBox="0 0 148 148" style={{ position: "absolute", top: "-18px", left: "-18px", pointerEvents: "none" }}>
                <defs>
                  <radialGradient id="glowGrad" cx="50%" cy="50%" r="85%">
                    <stop offset="0%" stopColor="#00e0ff" stopOpacity="0.30" />
                    <stop offset="70%" stopColor="#4f46e5" stopOpacity="0.19" />
                    <stop offset="100%" stopColor="#1b376b" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="74" cy="74" r="68"
                  fill="none" stroke="url(#glowGrad)" strokeWidth="7.3" />
              </svg>
            </span>
          </motion.div>
          <motion.div className="glass-card" variants={fadeVariant} style={{
            margin: "0 auto 2.2rem auto",
            padding: "2.0rem 2.05rem 2.24rem 2.05rem",
            maxWidth: 600,
            textAlign: "center",
            background: "var(--glass-bg,rgba(21,28,54,0.70))",
            boxShadow: "0 6px 48px 0 rgba(49,84,188,0.13)",
            overflow: "visible"
          }}>
            <AnimatedIntro
              text={title}
              delay={33}
              style={{
                fontSize: "2.49rem",
                fontWeight: 900,
                marginBottom: 8,
                lineHeight: 1.25,
                letterSpacing: ".01em"
              }}
            />
            <motion.p
              className="subtitle"
              style={{
                maxWidth: 450,
                margin: '0.7rem auto 1.38rem auto',
                fontSize: 19,
                color: "var(--text-secondary)",
                opacity: 0.91,
                fontWeight: 500
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17, duration: 0.59, type: "tween" }}
            >
              {subtitle}
            </motion.p>
            {media && media.src && (
              <motion.img
                src={media.src}
                alt={media.alt || 'section visual'}
                style={
                  media.style || {
                    maxWidth: 320,
                    display: 'block',
                    margin: '1.1rem auto 1.7rem auto',
                    borderRadius: 11,
                  }
                }
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.30, duration: 0.6, type: "tween" }}
              />
            )}
            <motion.a
              className="btn btn-large cta-glow"
              href="/projects"
              style={{ margin: "0.6rem 0 0.18rem 0", display: "inline-block" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17, duration: 0.45 }}
            >
              {ctaLabel}
            </motion.a>
            {/* Social icons bar under CTA with cool hover anim */}
            <motion.div
              style={{ marginTop: 26 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.37 }}
            >
              <SocialIconsBar />
            </motion.div>
          </motion.div>
          {/* Featured project highlights slider */}
          <motion.div
            className="home-feature-projects glass-card"
            variants={fadeVariant}
            style={{
              margin: "2.5rem auto 0 auto",
              maxWidth: 430,
              padding: "1.5rem 1.1rem 1.5rem 1.1rem"
            }}
          >
            <h3 style={{
              textAlign: "center",
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: 19,
              marginBottom: 14,
              letterSpacing: ".02em"
            }}>Featured Projects</h3>
            {sliderReady ? (
              projects.length > 0 ? (
                <FeaturedProjectsSlider projects={projects} maxSlides={4} />
              ) : (
                <div style={{ color: 'var(--muted-text)', textAlign: "center" }}>No featured projects yet.</div>
              )
            ) : (
              <div style={{ color: "var(--muted-text)", textAlign: "center" }}>Loading highlights…</div>
            )}
          </motion.div>
        </div>
        {/* Sidebar skills progress */}
        <div className="sidebar-col">
          <SkillsSidebar skills={skills} />
        </div>
      </div>
    </motion.section>
  );
}

Home.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  ctaLabel: PropTypes.string,
  media: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
  }),
  layout: PropTypes.shape({
    align: PropTypes.oneOf(['left', 'center', 'right']),
    style: PropTypes.object
  })
};

export default Home;
