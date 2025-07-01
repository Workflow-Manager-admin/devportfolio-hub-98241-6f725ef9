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
      className={`contact-form-container${className ? " " + className : ""}`}
      style={{ ...layoutStyles.wrapper, boxShadow: "0 1px 10px rgba(0,0,0,0.04)", background: "var(--bg-secondary)", borderRadius: 9, maxWidth: 430, margin: "0 auto" }}
    >
      {sectionTitle && (
        <h3 style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>{sectionTitle}</h3>
      )}

      {status.type === "success" && <div className="contact-success">{status.message}</div>}
      {status.type === "error" && <div className="contact-error">{status.message}</div>}
      {sending && <div className="contact-sending">Sending message&hellip;</div>}
      <form
        onSubmit={handleSubmit}
        noValidate
        style={layoutStyles.form}
        aria-label="Contact form"
        autoComplete="off"
      >
        <div style={{ marginBottom: "1.15rem" }}>
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
            style={{
              width: "100%",
              padding: "0.66rem",
              marginTop: 3,
              borderRadius: 6,
              border: "1px solid var(--border-color)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "1rem",
              outline: errors.name && touched.name ? "1.5px solid #e53c3c" : "none",
              transition: "outline .22s",
            }}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && touched.name && (
            <div id="name-error" style={{ color: "#c00", marginTop: "0.14rem", fontSize: "0.98rem" }}>
              {errors.name}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1.15rem" }}>
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
            style={{
              width: "100%",
              padding: "0.66rem",
              marginTop: 3,
              borderRadius: 6,
              border: "1px solid var(--border-color)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "1rem",
              outline: errors.email && touched.email ? "1.5px solid #e53c3c" : "none",
              transition: "outline .22s",
            }}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && touched.email && (
            <div id="email-error" style={{ color: "#c00", marginTop: "0.14rem", fontSize: "0.98rem" }}>
              {errors.email}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
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
            style={{
              width: "100%",
              padding: "0.68rem",
              minHeight: 120,
              marginTop: 3,
              borderRadius: 8,
              border: "1px solid var(--border-color)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "1rem",
              resize: "vertical",
              outline: errors.message && touched.message ? "1.5px solid #e53c3c" : "none",
              transition: "outline .22s",
            }}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && touched.message && (
            <div id="message-error" style={{ color: "#c00", marginTop: "0.14rem", fontSize: "0.98rem" }}>
              {errors.message}
            </div>
          )}
        </div>
        {extraFields}
        <button
          type="submit"
          className="btn btn-large"
          disabled={sending}
          style={{
            width: "100%",
            marginTop: 8,
            fontWeight: 600,
            background: "var(--button-bg)",
            color: "var(--button-text)",
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? "Sending..." : submitLabel}
        </button>
      </form>
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
