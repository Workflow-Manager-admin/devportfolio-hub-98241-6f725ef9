import React from "react";
import ContactForm from "../components/ContactForm";

/**
 * PUBLIC_INTERFACE
 * Contact page with contact info and modular ContactForm.
 */
function Contact() {
  return (
    <section
      className="content contact"
      style={{
        minHeight: "50vh",
        padding: "2.5rem 0",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <h2 className="title">Contact</h2>
      <p className="contact-info">
        Want to get in touch? Fill out the form below or email me directly at{" "}
        <a href="mailto:youremail@mail.com">youremail@mail.com</a>.
      </p>
      <ContactForm
        submitLabel="Send Message"
        sectionTitle={null}
        layout="vertical"
        style={{ margin: "0 auto" }}
        namePlaceholder="Full Name"
        emailPlaceholder="email@example.com"
        messagePlaceholder="How can I help you?"
      />
    </section>
  );
}

export default Contact;
