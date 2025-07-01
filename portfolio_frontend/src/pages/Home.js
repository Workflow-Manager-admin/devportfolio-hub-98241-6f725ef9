import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSectionConfig } from '../SectionConfigContext';
import AnimatedIntro from '../components/AnimatedIntro';
import SkillsGrid from '../components/SkillsGrid';
import FeaturedProjectsSlider from '../components/FeaturedProjectsSlider';
import SocialIconsBar from '../components/SocialIconsBar';
import { fetchProjects } from '../api/api';

/**
 * PUBLIC_INTERFACE
 * Home (Landing) page for the portfolio site.
 * 
 * Rich, modern animated Home: Typewriter intro, fade entrances, skill icons, promo project slider, and socials.
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
  // Skills can be context-driven or hardcoded for demo
  const skills = context.skills || [
    { name: 'React', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="4.5" fill="#4f46e5" opacity="0.12"/><ellipse transform="rotate(60 12 12)" cx="12" cy="12" rx="10" ry="4.5" fill="#0891b2" opacity="0.13"/><ellipse transform="rotate(120 12 12)" cx="12" cy="12" rx="10" ry="4.5" fill="#14b8a6" opacity="0.12"/><circle cx="12" cy="12" r="2.4" fill="currentColor"/></g></svg>, level:88, color: "#4f46e5"},
    { name: 'JavaScript', icon: '🟨', level: 92, color: "#f5bc00" },
    { name: 'CSS3', icon: '🎨', level: 83, color: "#0891b2" },
    { name: 'NodeJS', icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g fill="#8cc84b"><path d="M12 2.256l9.214 5.319-.003 8.865-9.211 5.304-9.211-5.303.003-8.866L12 2.256zm0 1.517L3.778 7.509l.003 7.499L12 20.214l8.22-5.207V7.509L12 3.773zm.397 10.303c0 1.014-.604 1.329-1.53 1.329-.71 0-1.142-.037-1.467-.114v.778h.633v.568h-2.15v-.568h.633V9.501h1.308l.016.01c.442.026.92.044 1.254.114.526.111.902.512.902 1.018 0 .41-.222.793-.619.954.535.163.964.55.964 1.165zm-1.353-2.336c-.151-.009-.418-.016-.598-.016H8.7v2.487c.209.034.62.064 1.13.064.613 0 .99-.226.99-.735 0-.459-.3-.664-.776-.7l-.103-.004v-.01c.345-.02.685-.187.685-.62 0-.359-.281-.568-.683-.572zm2.822 2.418c.41 0 .746-.072.98-.257.187-.147.262-.353.262-.67V9.65c0-.406-.181-.603-.586-.632-.243-.017-.467-.018-.637-.018h-.907v.573h.745c.127 0 .208.008.271.023.124.023.162.094.162.249v.274c0 .145-.024.192-.174.217-.043.007-.124.013-.26.013h-.744v.59h.818c.14 0 .218.008.281.019.123.022.164.084.164.239v.345c0 .145-.024.192-.175.217-.043.007-.124.013-.261.013h-.826v.57h.92z"/></g></svg>, level:81, color: "#67be4b" },
    { name: 'Python', icon: '🐍', level: 83, color: "#306998" }
  ];

  // Featured projects mini-slider state
  const [projects, setProjects] = useState([]);
  const [sliderReady, setSliderReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    fetchProjects().then(res => {
      if (mounted) setProjects(Array.isArray(res) ? res : []);
      setSliderReady(true);
    }).catch(() => setSliderReady(true));
    return () => { mounted = false; };
  }, []);

  return (
    <section
      className="content home"
      style={{
        minHeight: '60vh',
        padding: '3.2rem 0 2.5rem 0',
        maxWidth: 892,
        textAlign: layout.align || 'center',
        ...layout.style,
      }}
    >
      <div
        className="home-intro-block"
        style={{
          margin: "0 auto",
          maxWidth: 630,
          borderRadius: 18,
          background: "linear-gradient(87deg,var(--bg-primary) 75%,var(--bg-secondary) 100%)",
          boxShadow: "0 4px 42px 0 rgba(40,128,255,0.055)",
          padding: "2.2rem 1.5rem 1.7rem 1.5rem",
          // animate provenance entrance
          animation: "fadeInUp 0.72s cubic-bezier(.44,.09,.64,1.03)",
        }}
      >
        <AnimatedIntro text={title} delay={45} style={{ fontSize: 34, fontWeight: 700, color: "var(--primary)", marginBottom: 8, lineHeight: 1.2, display: "block" }} />
        <p className="subtitle" style={{ maxWidth: 420, margin: '0.7rem auto 1.55rem auto', fontSize: 19, color: "var(--text-secondary)", opacity: 0.87, animation: "fadeIn 0.64s 0.3s both" }}>
          {subtitle}
        </p>
        {media && media.src && (
          <img
            src={media.src}
            alt={media.alt || 'section visual'}
            style={media.style || { maxWidth: 320, display: 'block', margin: '1.1rem auto 1.7rem auto', borderRadius: 11 }}
          />
        )}
        <a className="btn btn-large" href="/projects" style={{ margin: "0.5rem 0 0.2rem 0" }}>
          {ctaLabel}
        </a>
        <div style={{ marginTop: 18 }}>
          <SocialIconsBar />
        </div>
      </div>
      {/* Skills showcase */}
      <div
        className="home-skills-outer"
        style={{
          marginTop: 45,
          animation: "fadeIn 0.72s 0.24s both"
        }}
      >
        <h3 style={{ textAlign: "center", fontWeight: 600, fontSize: 19, letterSpacing: ".014em", color: "var(--text-secondary)", marginBottom: 18 }}>
          Skills &amp; Tools
        </h3>
        <SkillsGrid skills={skills} animated={true} />
      </div>
      {/* Featured project highlights slider */}
      <div
        className="home-feature-projects"
        style={{
          margin: "42px auto 0 auto",
          maxWidth: 420,
          animation: "fadeInUp 0.82s 0.35s both"
        }}
      >
        <h3 style={{
          textAlign: "center",
          color: "var(--primary)",
          fontWeight: 700,
          fontSize: 19,
          marginBottom: 14
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
      </div>
      {/* Animations */}
      <style>
        {`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .home-intro-block,.home-skills-outer,.home-feature-projects {
          will-change: opacity, transform;
        }
        `}
      </style>
    </section>
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
