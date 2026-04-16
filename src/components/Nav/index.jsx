import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function Navigation({ sections, currentSection, setCurrentSection, theme, toggleTheme }) {
  return (
    <header className="top-nav">
      <div className="brand-block">
        <p className="brand-kicker">Software Engineer</p>
        <h1 className="brand-name">Boyd Roberts</h1>
      </div>
      <div className="nav-row">
        <nav className="section-nav" aria-label="Primary Sections">
          {sections.map((section) => {
            const isActive = section.slug === currentSection.slug;

            return (
              <button
                type="button"
                className={`section-link ${isActive ? "is-active" : ""}`}
                key={section.slug}
                onClick={() => setCurrentSection(section)}
                aria-current={isActive ? "page" : undefined}
              >
                {section.name}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}

export default Navigation;
