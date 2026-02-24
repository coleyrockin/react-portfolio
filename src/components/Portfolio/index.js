import React, { useState } from "react";
import { projects } from "../../data/projects";

function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const coverTags = project.tags.slice(0, 3);

  return (
    <article className="project-card">
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image-link"
        aria-label={`${project.name} repository`}
      >
        {imageFailed ? (
          <div className="project-image-fallback" aria-label={`${project.name} preview fallback`}>
            <p className="project-image-kicker">Project Snapshot</p>
            <h4>{project.name}</h4>
            <div className="project-image-chip-wrap">
              {coverTags.map((tag) => (
                <span className="project-image-chip" key={`${project.name}-fallback-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt || `${project.name} project preview`}
            className="project-image"
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            onError={() => setImageFailed(true)}
          />
        )}
      </a>
      <div className="project-content">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p className="project-meta">{project.scope}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={`${project.name}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            View Repository
          </a>
        </div>
      </div>
    </article>
  );
}

function Portfolio() {
  return (
    <section className="portfolio-panel">
      <h2 className="panel-title">Selected Work</h2>
      <p className="project-note">
        Six advanced builds that best represent architecture depth, cross-language execution, and production-focused
        delivery.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.name} />
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
