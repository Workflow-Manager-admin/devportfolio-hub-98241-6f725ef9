import React from 'react';
import PropTypes from 'prop-types';
import { useSectionConfig } from '../SectionConfigContext';

/**
 * PUBLIC_INTERFACE
 * Home (Landing) page for the portfolio site.
 * 
 * Props are optional; falls back to SectionConfigContext or default values.
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

  return (
    <section
      className="content home"
      style={{
        minHeight: '60vh',
        padding: '3rem 0',
        textAlign: layout.align || 'center',
        ...layout.style,
      }}
    >
      <h1 className="title">{title}</h1>
      <p className="subtitle" style={{ maxWidth: 500, margin: '0 auto 2.2rem auto' }}>
        {subtitle}
      </p>
      {media && media.src && (
        <img
          src={media.src}
          alt={media.alt || 'section visual'}
          style={media.style || { maxWidth: 320, display: 'block', margin: '1.5rem auto 2.5rem auto' }}
        />
      )}
      <a className="btn btn-large" href="/projects">
        {ctaLabel}
      </a>
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
