import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

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

  return (
    <article className="contact-panel">
      <h2 className="panel-title">Connect With Me</h2>
      <p className="contact-intro">
        The fastest way to reach me is through my social profiles.
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
    </article>
  );
}

export default Contact;
