import React from "react";

function Navigation({ sections, currentSection, setCurrentSection }) {
  return (
    <header className="top-nav">
      <div className="brand-block">
        <p className="brand-kicker">Software Engineer</p>
        <h1 className="brand-name">Boyd Roberts</h1>
      </div>
      <nav className="section-nav" aria-label="Primary Sections">
        {sections.map(({ name, comp }) => {
          const isActive = name === currentSection.name;

          return (
            <button
              type="button"
              className={`section-link ${isActive ? "is-active" : ""}`}
              key={name}
              onClick={() => setCurrentSection({ name, comp })}
              aria-current={isActive ? "page" : undefined}
            >
              {name}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Navigation;
