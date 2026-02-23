import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <p className="footer-copy">© {currentYear} Boyd Roberts</p>
      <ul className="footer-links">
        <li>
          <a
            className="footer-icon"
            href="https://instagram.com/coleyrockin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            className="footer-icon"
            href="https://www.linkedin.com/in/boydcroberts"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            className="footer-icon"
            href="https://github.com/coleyrockin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
