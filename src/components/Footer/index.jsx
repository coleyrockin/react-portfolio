import { memo } from "react";
import ICON_BY_KEY from "../../data/iconMap";
import { socialLinks } from "../../data/socialLinks";

// Captured once at module init; portfolio footer is static enough that we
// accept the tab-open-across-New-Year staleness in exchange for skipping
// per-mount Date allocation.
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer-shell">
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
      <p className="footer-copy">
        © {currentYear} Boyd Roberts · Built in React + Vite · Central Texas
      </p>
    </footer>
  );
}

// Footer receives no changing props but App re-renders on every section change.
// memo() short-circuits those re-renders.
export default memo(Footer);
