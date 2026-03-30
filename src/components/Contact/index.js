import React from "react";
import ICON_BY_KEY from "../../data/iconMap";
import { socialLinks } from "../../data/socialLinks";

function Contact() {
  return (
    <article className="contact-panel">
      <h2 className="panel-title">Connect With Me</h2>
      <p className="contact-intro">
        Reach me directly by email or through my social profiles.
      </p>

      <section className="social-grid" aria-label="Social Profiles">
        {socialLinks.map((profile) => {
          const Icon = ICON_BY_KEY[profile.key];
          return (
            <a
              className="social-card"
              key={profile.key}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profile.name}
            >
              <div className="social-icon-wrap">{Icon ? <Icon /> : null}</div>
              <div className="social-text">
                <span className="social-name">{profile.name}</span>
                <span className="social-handle">{profile.handle}</span>
              </div>
            </a>
          );
        })}
      </section>
    </article>
  );
}

export default Contact;
