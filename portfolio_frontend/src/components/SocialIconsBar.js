import React from "react";

/**
 * PUBLIC_INTERFACE
 * SocialIconsBar - Row of round, animated social/profile icons.
 * Props:
 *  - links: Array of {href, label, icon (React node/string), color}
 *  - style: Style object for wrapper
 *  - className: Custom classes
 * If no links prop, shows github/linkedin/email defaults.
 */
function SocialIconsBar({
  links = [
    {
      href: "https://github.com/",
      label: "GitHub",
      icon: (
        <svg height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.5.5 0 6 0 12.4c0 5.2 3.4 9.6 8.2 10.8.6.1.8-.2.8-.6v-2c-3.3.7-4-1.5-4-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.9 1.6-.9.8-1.2 2.1-.9 2.6-.7.1-.6.3-1 .5-1.2-2.7-.3-5.5-1.4-5.5-6.1C3.5 7 4 6 4.7 5.1c-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.2 1.2a10.2 10.2 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.3 2.9.1 3.2.8.8 1.2 1.8 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.3.2.6.9.6 1.8v2.8c0 .4.2.7.8.6C20.6 22 24 17.6 24 12.4 24 6 18.5.5 12 .5"/>
        </svg>
      ),
      color: "#24292e"
    },
    {
      href: "mailto:youremail@mail.com",
      label: "Email",
      icon: (
        <svg height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      ),
      color: "#4f46e5"
    },
    {
      href: "https://linkedin.com/",
      label: "LinkedIn",
      icon: (
        <svg height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.8 19.1h-2.38v-8.72h2.38v8.72zm-1.19-9.88c-.76 0-1.38-.62-1.38-1.38a1.38 1.38 0 1 1 2.76 0c0 .76-.62 1.38-1.38 1.38zm14.14 9.88h-2.38v-4.73c0-1.13-.02-2.58-1.58-2.58-1.58 0-1.83 1.24-1.83 2.51v4.8h-2.37v-8.71h2.29v1.19h.03c.32-.6 1.08-1.23 2.23-1.23 2.38 0 2.82 1.56 2.82 3.58v5.16z"/></svg>
      ),
      color: "#0077b6"
    }
  ],
  style = {},
  className = "",
}) {
  return (
    <div className={`social-icons-bar ${className}`} style={{ display: "flex", gap: "1.3rem", justifyContent: "center", ...style }}>
      {links.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          aria-label={social.label}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            background: "#eff5fa",
            color: social.color || "var(--primary)",
            borderRadius: "50%",
            boxShadow: "0 2px 10px rgba(17,19,36,0.07)",
            fontSize: 20,
            transition: "background 0.16s, color 0.16s, transform 0.19s",
            outline: "none"
          }}
          onMouseOver={e => (e.currentTarget.style.background = social.color || "#c7dbf2", e.currentTarget.style.color = "#fff")}
          onMouseOut={e => (e.currentTarget.style.background = "#eff5fa", e.currentTarget.style.color = social.color || "var(--primary)")}
          tabIndex={0}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialIconsBar;
