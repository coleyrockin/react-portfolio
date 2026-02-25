import React from "react";
import {
  aiExperienceCopy,
  capabilityPillars,
  certifications,
  languageGroups,
  languageSourceNote,
} from "../../data/languages";

function Resume() {
  return (
    <article className="knowledge-panel">
      <h2 className="panel-title">Engineering Knowledge</h2>
      <p className="knowledge-intro">
        Product-focused engineering across frontend, backend, and AI-accelerated delivery workflows.
      </p>

      <section className="language-map-panel">
        <h3>Language Map</h3>
        <p className="language-source-note">{languageSourceNote}</p>
        <div className="language-group-grid">
          {languageGroups.map((group) => (
            <article className="language-group-card" key={group.title}>
              <h4>{group.title}</h4>
              <div className="language-chip-wrap">
                {group.languages.map((language) => (
                  <span className="language-chip" key={`${group.title}-${language}`}>
                    {language}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capability-grid" aria-label="Engineering Capabilities">
        {capabilityPillars.map((pillar) => (
          <article className="capability-card" key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="certification-panel">
        <h3>Certifications</h3>
        <ul className="cert-list">
          {certifications.map((cert) => (
            <li key={cert.title} className="cert-item">
              <h4>{cert.title}</h4>
              <p>{cert.provider}</p>
              <small>{cert.detail}</small>
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                {cert.buttonText}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="ai-experience-panel">
        <h3>AI Experience</h3>
        {aiExperienceCopy.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </article>
  );
}

export default Resume;
