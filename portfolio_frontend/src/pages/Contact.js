import React from "react";
import PropTypes from "prop-types";
import ContactForm from "../components/ContactForm";
import { useSectionConfig } from "../SectionConfigContext";

/**
 * PUBLIC_INTERFACE
 * Contact page with contact info and modular ContactForm.
 * Reads config from context or props for title, infoLine, layout, visuals.
 */
function Contact(props) {
  const context = useSectionConfig("contact");

  const title = props.title || context.title || "Contact";
  const infoLine =
    props.infoLine ||
    context.infoLine ||
    "Want to get in touch? Fill out the form below or email me directly at ";
  const emailProp =
    props.email || context.email || "youremail@mail.com";
  const layout = props.layout || context.layout || { align: "center" };
  const style = {
    minHeight: "50vh",
    padding: "2.5rem 0",
    maxWidth: 680,
    margin: "0 auto",
    textAlign: layout.align || "center",
    ...(layout.style || {}),
  };

  return (
    <section className="content contact" style={style}>
      <h2 className="title">{title}</h2>
      <p className="contact-info">
        {infoLine}
        <a href={`mailto:${emailProp}`}>{emailProp}</a>.
      </p>
      <ContactForm
        submitLabel={context.submitLabel || "Send Message"}
        sectionTitle={context.formSectionTitle || null}
        layout={context.formLayout || "vertical"}
        style={context.formStyle || { margin: "0 auto" }}
        namePlaceholder={context.namePlaceholder || "Full Name"}
        emailPlaceholder={context.emailPlaceholder || "email@example.com"}
        messagePlaceholder={context.messagePlaceholder || "How can I help you?"}
        // You could pass extraFields from context/props as well
      />
    </section>
  );
}

Contact.propTypes = {
  title: PropTypes.string,
  infoLine: PropTypes.string,
  layout: PropTypes.object,
  email: PropTypes.string
};

export default Contact;
