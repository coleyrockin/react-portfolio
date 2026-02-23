import React, { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const CONTACT_EMAIL = "boydcroberts@gmail.com";

function Contact() {
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@coleyrockin",
      href: "https://instagram.com/coleyrockin",
      Icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      handle: "boydcroberts",
      href: "https://www.linkedin.com/in/boydcroberts",
      Icon: FaLinkedin,
    },
    {
      name: "GitHub",
      handle: "coleyrockin",
      href: "https://github.com/coleyrockin",
      Icon: FaGithub,
    },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <article className="contact-panel">
      <h2 className="panel-title">Connect With Me</h2>
      <p className="contact-intro">
        The fastest way to reach me is through my social profiles or the form
        below.
      </p>

      <div className="social-grid" aria-label="Social Profiles">
        {socialLinks.map((profile) => (
          <a
            className="social-card"
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.name}
          >
            <div className="social-icon-wrap">
              <profile.Icon />
            </div>
            <div className="social-text">
              <h3>{profile.name}</h3>
              <p>{profile.handle}</p>
            </div>
          </a>
        ))}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3 className="contact-form-heading">Send a Message</h3>
        <div className="contact-form-row">
          <label className="contact-label" htmlFor="contact-name">
            Name
            <input
              className="contact-input"
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>
          <label className="contact-label" htmlFor="contact-email">
            Email
            <input
              className="contact-input"
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </label>
        </div>
        <label className="contact-label" htmlFor="contact-message">
          Message
          <textarea
            className="contact-input contact-textarea"
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows={5}
            required
          />
        </label>
        <button className="contact-submit" type="submit">
          Send Message
        </button>
      </form>
    </article>
  );
}

export default Contact;
