import React from "react";
import ICON_BY_KEY from "../../data/iconMap";
import { socialLinks } from "../../data/socialLinks";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <p className="footer-copy">© {currentYear} Boyd Roberts</p>
      <ul className="footer-links" aria-label="Social links">
        {socialLinks.map((profile) => {
          const Icon = ICON_BY_KEY[profile.key];
          return (
            <li key={profile.key}>
              <a
                className="footer-icon"
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.name}
              >
                {Icon ? <Icon /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

export default Footer;
