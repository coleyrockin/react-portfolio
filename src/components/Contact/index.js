import React from "react";
import ICON_BY_KEY from "../../data/iconMap";
import { socialLinks } from "../../data/socialLinks";

function Contact() {
  return (
    <article className="contact-panel">
      <h2 className="panel-title">Connect With Me</h2>
      <p className="contact-intro">
        The fastest way to reach me is through my social profiles.
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
                <h3>{profile.name}</h3>
                <p>{profile.handle}</p>
              </div>
            </a>
          );
        })}
      </section>
    </article>
  );
}

export default Contact;
