import React, { useState } from "react";
import PropTypes from "prop-types";
import { sendContact } from "../api/api";

/**
 * PUBLIC_INTERFACE
 * ContactForm - A reusable, fully functional contact form component.
 * 
 * Props:
 *  - onSuccess (function): Callback invoked after successful form submit.
 *  - onError (function): Callback for error on submit.
 *  - namePlaceholder (string): Custom placeholder for name.
 *  - emailPlaceholder (string): Custom placeholder for email.
 *  - messagePlaceholder (string): Custom placeholder for message.
 *  - submitLabel (string): Label for submit button.
 *  - layout (string): Possible values - "vertical" (default), "horizontal".
 *  - className (string): Additional classes for outer wrapper.
 *  - style (object): Custom style for wrapper.
 *  - sectionTitle (string): Optional section heading to display.
 *  - extraFields (React node): Custom additional fields.
 */
function ContactForm({
  onSuccess,
  onError,
  namePlaceholder = "Your Name",
  emailPlaceholder = "you@example.com",
  messagePlaceholder = "Type your message here...",
  submitLabel = "Send Message",
  layout = "vertical",
  className = "",
  style = {},
  sectionTitle,
  extraFields,
}) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });

  // Validation logic for fields
  function validate(nextFields = fields) {
    const e = {};
    if (!nextFields.name?.trim()) e.name = "Name required";
    if (!nextFields.email?.trim()) {
      e.email = "Email required";
    } else if (!/^[\w.%+-]+@\w+\.\w{2,}$/.test(nextFields.email)) {
      e.email = "Enter a valid email address";
    }
    if (!nextFields.message?.trim()) e.message = "Message required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...fields, [name]: value };
    setFields(next);
    setErrors(validate(next));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(fields));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    setStatus({ type: null, message: null });

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: "Please correct the mistakes above." });
      return;
    }
    setSending(true);
    try {
      await sendContact({
        name: fields.name,
        email: fields.email,
        message: fields.message,
      });
      setStatus({ type: "success", message: "Message sent! Thank you for reaching out." });
      setFields({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err?.message || "Failed to send message. Try again later.";
      setStatus({ type: "error", message: msg });
      if (onError) onError(msg);
    } finally {
      setSending(false);
    }
  }

  // Styles for horizontal/vertical layouts
  const layoutStyles =
    layout === "horizontal"
      ? {
          wrapper: { display: "flex", gap: "2rem", flexWrap: "wrap", ...style },
          form: { flex: 1 },
        }
      : { wrapper: { ...style }, form: {} };

  return (
    <div
      className={`contact-form-container glass-card${className ? " " + className : ""}`}
      style={{
        ...layoutStyles.wrapper,
        maxWidth: 470,
        margin: "0 auto",
        background: "var(--glass-bg)",
        border: "1.3px solid var(--glass-border)",
        borderRadius: "1.33rem",
        boxShadow: "0 6px 32px 0 rgba(41,75,144,0.13), 0 1.5px 11px rgba(0,16,44,0.09)",
        position: "relative",
        padding: "2.1rem 1.9rem 2.2rem 1.9rem",
        zIndex: 12
      }}
    >
      {sectionTitle && (
        <h3 style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "1.2rem", letterSpacing: ".003em", fontSize: "1.15rem" }}>{sectionTitle}</h3>
      )}

      {status.type === "success" && <div className="contact-success" style={{
        borderRadius: 8,
        color: "#23e0cc",
        background: "rgba(55,103,116,0.11)",
        textAlign: "center",
        padding: "0.67rem 0.22rem",
        margin: "0 0 1.1rem 0",
        fontWeight: 600
      }}>{status.message}</div>}
      {status.type === "error" && <div className="contact-error" style={{
        borderRadius: 8,
        color: "#ff496a",
        background: "rgba(103,45,77,0.10)",
        textAlign: "center",
        padding: "0.67rem 0.22rem",
        margin: "0 0 1.1rem 0",
        fontWeight: 600
      }}>{status.message}</div>}
      {sending && <div className="contact-sending" style={{
        color: "var(--accent)",
        opacity: .94,
        textAlign: "center",
        marginBottom: 8
      }}>Sending message&hellip;</div>}
      <form
        onSubmit={handleSubmit}
        noValidate
        style={layoutStyles.form}
        aria-label="Contact form"
        autoComplete="off"
      >
        <div style={{ marginBottom: "1.18rem", position:"relative" }}>
          <label htmlFor="cf-name" style={{ fontWeight: 500, color: "var(--text-secondary)" }}>
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            placeholder={namePlaceholder}
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={sending}
            className="neon-glow-input"
            style={{
              width: "100%",
              padding: "0.66rem",
              marginTop: 3,
              borderRadius: 7,
              border: "1.2px solid var(--border-color)",
              background: "rgba(29,34,60,0.86)",
              color: "var(--text-main)",
              fontSize: "1.01rem",
              outline: errors.name && touched.name ? "1.66px solid #e53c3c" : "none",
              boxShadow: errors.name && touched.name
                ? "0 0 8px #ff496a33"
                : "0 0 10px 0 #00e0ff41",
              transition: "outline .22s, box-shadow .21s"
            }}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && touched.name && (
            <div id="name-error" style={{ color: "#ff496a", marginTop: "0.13rem", fontSize: "0.98rem", fontWeight: 500 }}>
              {errors.name}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1.15rem", position:"relative" }}>
          <label htmlFor="cf-email" style={{ fontWeight: 500, color: "var(--text-secondary)" }}>
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={sending}
            className="neon-glow-input"
            style={{
              width: "100%",
              padding: "0.66rem",
              marginTop: 3,
              borderRadius: 7,
              border: "1.2px solid var(--border-color)",
              background: "rgba(29,34,60,0.86)",
              color: "var(--text-main)",
              fontSize: "1.01rem",
              outline: errors.email && touched.email ? "1.66px solid #e53c3c" : "none",
              boxShadow: errors.email && touched.email
                ? "0 0 8px #ff496a33"
                : "0 0 10px 0 #00e0ff41",
              transition: "outline .22s, box-shadow .21s"
            }}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && touched.email && (
            <div id="email-error" style={{ color: "#ff496a", marginTop: "0.13rem", fontSize: "0.98rem", fontWeight: 500 }}>
              {errors.email}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1.29rem", position:"relative" }}>
          <label htmlFor="cf-message" style={{ fontWeight: 500, color: "var(--text-secondary)" }}>
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            placeholder={messagePlaceholder}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={sending}
            rows={5}
            className="neon-glow-input"
            style={{
              width: "100%",
              padding: "0.69rem",
              minHeight: 115,
              marginTop: 3,
              borderRadius: 10,
              border: "1.2px solid var(--border-color)",
              background: "rgba(29,34,60,0.86)",
              color: "var(--text-main)",
              fontSize: "1.08rem",
              resize: "vertical",
              outline: errors.message && touched.message ? "1.66px solid #e53c3c" : "none",
              boxShadow: errors.message && touched.message
                ? "0 0 8px #ff496a33"
                : "0 0 11px 0 #00e0ff41",
              transition: "outline .22s, box-shadow .21s"
            }}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && touched.message && (
            <div id="message-error" style={{ color: "#ff496a", marginTop: "0.13rem", fontSize: "0.98rem", fontWeight: 500 }}>
              {errors.message}
            </div>
          )}
        </div>
        {extraFields}
        <button
          type="submit"
          className="btn btn-large cta-glow"
          disabled={sending}
          style={{
            width: "100%",
            marginTop: 13,
            fontWeight: 700,
            fontSize: "1.17rem",
            letterSpacing: ".012em",
            background: "linear-gradient(97deg,#4f46e5 66%,#00e0ff 110%)",
            color: "#fff",
            boxShadow: "0 0 16px #00e0ff, 0 0 28px #4f46e5, 0 0 2px #fff",
            opacity: sending ? 0.65 : 1,
            animation: "cta-btn-pulse 3.3s infinite cubic-bezier(.75,.35,.38, 1.18) both alternate"
          }}
        >
          {sending ? "Sending..." : submitLabel}
        </button>
      </form>
      <style>
        {`
          .neon-glow-input:focus {
            box-shadow: 0 0 13px #00e0ff, 0 0 27px #4f46e5, 0 0 2px #fff;
            border: 1.4px solid var(--accent);
            outline: none !important;
            background: rgba(21, 29, 51, 0.98);
            color: #fff;
          }
          @media(max-width:640px){
            .contact-form-container {
              padding: 1.04rem 0.28rem 1.22rem 0.28rem !important;
              max-width: 99vw !important;
            }
          }
        `}
      </style>
    </div>
  );
}

ContactForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  namePlaceholder: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  messagePlaceholder: PropTypes.string,
  submitLabel: PropTypes.string,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
  style: PropTypes.object,
  sectionTitle: PropTypes.string,
  extraFields: PropTypes.node,
};

export default ContactForm;
