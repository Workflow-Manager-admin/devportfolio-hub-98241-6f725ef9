import React, { useEffect, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * AnimatedIntro - Shows animated intro text using a typewriter and fade-in effect.
 * Props:
 *  - text: The text to animate (string or node)
 *  - delay: Delay between each character (ms)
 *  - className: Custom class
 *  - style: Style object
 */
function AnimatedIntro({
  text = "Hello, I'm Your Name",
  delay = 50,
  className = "",
  style = {},
}) {
  // Supports string or JSX element
  const stringText =
    typeof text === "string"
      ? text
      : (text && text.props && text.props.children) || "";

  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setVisible(false);
    idxRef.current = 0;
    const timeoutId = setTimeout(() => setVisible(true), 200);
    let intervalId;
    if (visible) {
      intervalId = setInterval(() => {
        setDisplayed((current) => {
          if (idxRef.current >= stringText.length) {
            clearInterval(intervalId);
            return current;
          }
          const next = current + stringText[idxRef.current];
          idxRef.current += 1;
          return next;
        });
      }, delay);
    }
    return () => {
      clearInterval(intervalId);
    };
    // Only trigger when text changes or animation restarts
    // eslint-disable-next-line
  }, [text, delay, visible]);

  // Slight fade-in at start
  return (
    <span
      className={`animated-intro ${className}`}
      style={{
        display: "inline-block",
        minHeight: 46,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
        ...style,
      }}
      aria-label={stringText}
    >
      <span style={{ whiteSpace: "pre-line", borderRight: "1.5px solid var(--accent)", animation: "blink-cursor 1s infinite steps(1,end)" }}>
        {displayed}
      </span>
      <style>{`
        @keyframes blink-cursor {
          from, to { border-color: transparent }
          50% { border-color: var(--accent) }
        }
      `}</style>
    </span>
  );
}

export default AnimatedIntro;
